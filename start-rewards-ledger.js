/**
 * START STAKING REWARDS (LEDGER)
 * 
 * Calls notifyRewardAmount() to begin distributing the 3M AIPG over 7 days
 */

const { ethers } = require('ethers');
const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid').default;
const AppEth = require('@ledgerhq/hw-app-eth').default;

const CONFIG = {
  RPC_URL: 'https://mainnet.base.org',
  STAKING_VAULT: '0x3ED14A6D5A48614D77f313389611410d38fd8277',
  LEDGER_PATH: "m/44'/60'/0'/0/0", // Admin address path
  REWARD_AMOUNT: '3000000', // 3M AIPG to distribute
  DURATION_DAYS: 7 // Distribution period
};

const STAKING_VAULT_ABI = [
  "function notifyRewardAmount(uint256 reward) external",
  "function rewardRate() external view returns (uint256)",
  "function rewardsDuration() external view returns (uint256)",
  "function periodFinish() external view returns (uint256)",
  "function hasRole(bytes32 role, address account) external view returns (bool)"
];

const REWARD_DISTRIBUTOR_ROLE = ethers.keccak256(ethers.toUtf8Bytes("REWARD_DISTRIBUTOR_ROLE"));

class LedgerSigner extends ethers.AbstractSigner {
  constructor(provider, path = "m/44'/60'/0'/0/0") {
    super(provider);
    this.path = path;
    this._address = null;
  }

  async getAddress() {
    if (this._address) {
      return this._address;
    }
    const transport = await TransportNodeHid.create();
    const eth = new AppEth(transport);
    const result = await eth.getAddress(this.path);
    await transport.close();
    this._address = result.address;
    return this._address;
  }

  async signTransaction(transaction) {
    const transport = await TransportNodeHid.create();
    const eth = new AppEth(transport);

    const resolvedTx = await ethers.resolveProperties(transaction);
    
    const populatedTx = {
      to: resolvedTx.to,
      value: resolvedTx.value || 0n,
      data: resolvedTx.data || '0x',
      nonce: resolvedTx.nonce,
      chainId: resolvedTx.chainId,
      type: resolvedTx.type || 2,
      maxFeePerGas: resolvedTx.maxFeePerGas,
      maxPriorityFeePerGas: resolvedTx.maxPriorityFeePerGas,
      gasLimit: resolvedTx.gasLimit
    };

    const unsignedTx = ethers.Transaction.from(populatedTx);
    const serializedTx = unsignedTx.unsignedSerialized;

    const resolution = await eth.signTransaction(
      this.path,
      serializedTx.substring(2)
    );

    await transport.close();

    const signature = {
      r: '0x' + resolution.r,
      s: '0x' + resolution.s,
      v: parseInt(resolution.v, 16)
    };

    return ethers.Transaction.from({
      ...populatedTx,
      signature
    }).serialized;
  }

  connect(provider) {
    return new LedgerSigner(provider, this.path);
  }
}

async function main() {
  console.log('🎁 START STAKING REWARDS');
  console.log('═══════════════════════════════════════════════════════\n');
  
  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
  const signer = new LedgerSigner(provider, CONFIG.LEDGER_PATH);
  const address = await signer.getAddress();
  
  console.log('📊 Configuration:');
  console.log('   Admin Address:', address);
  console.log('   StakingVault:', CONFIG.STAKING_VAULT);
  console.log('   Reward Amount:', CONFIG.REWARD_AMOUNT, 'AIPG');
  console.log('   Duration:', CONFIG.DURATION_DAYS, 'days');
  console.log('');
  
  const vault = new ethers.Contract(CONFIG.STAKING_VAULT, STAKING_VAULT_ABI, signer);
  
  // Check if admin has REWARD_DISTRIBUTOR_ROLE
  const hasRole = await vault.hasRole(REWARD_DISTRIBUTOR_ROLE, address);
  console.log('🔐 Permissions:');
  console.log('   Has REWARD_DISTRIBUTOR_ROLE:', hasRole ? '✅' : '❌');
  
  if (!hasRole) {
    throw new Error('❌ Your address does not have REWARD_DISTRIBUTOR_ROLE. Run grant-reward-distributor.js first.');
  }
  console.log('');
  
  // Check current state
  const currentRate = await vault.rewardRate();
  const duration = await vault.rewardsDuration();
  const periodFinish = await vault.periodFinish();
  
  console.log('📈 Current State:');
  console.log('   Current Reward Rate:', ethers.formatEther(currentRate), 'AIPG/second');
  console.log('   Rewards Duration:', Number(duration) / 86400, 'days');
  
  if (periodFinish > 0n) {
    const finishDate = new Date(Number(periodFinish) * 1000);
    const now = new Date();
    if (finishDate > now) {
      console.log('   Period Finish:', finishDate.toLocaleString(), '(active)');
    } else {
      console.log('   Period Finish:', finishDate.toLocaleString(), '(expired)');
    }
  } else {
    console.log('   Period Finish: Not started');
  }
  console.log('');
  
  const rewardAmount = ethers.parseEther(CONFIG.REWARD_AMOUNT);
  const rewardPerSecond = rewardAmount / BigInt(Number(duration));
  const dailyReward = rewardPerSecond * 86400n;
  
  console.log('💰 New Reward Schedule:');
  console.log('   Total Rewards:', CONFIG.REWARD_AMOUNT, 'AIPG');
  console.log('   Per Second:', ethers.formatEther(rewardPerSecond), 'AIPG');
  console.log('   Per Day:', ethers.formatEther(dailyReward), 'AIPG');
  console.log('   Duration:', Number(duration) / 86400, 'days');
  console.log('');
  
  // Calculate estimated APY (assuming 500 AIPG staked as example)
  const exampleStaked = ethers.parseEther('500');
  const annualRewards = rewardPerSecond * 31536000n; // seconds in a year
  const exampleAPY = (Number(annualRewards) / Number(exampleStaked)) * 100;
  
  console.log('📊 Estimated APY (with 500 AIPG staked):');
  console.log('   APY:', exampleAPY.toFixed(2) + '%');
  console.log('');
  
  // Get gas estimate
  const feeData = await provider.getFeeData();
  console.log('⛽ Gas Price:', ethers.formatUnits(feeData.maxFeePerGas, 'gwei'), 'gwei');
  console.log('');
  
  console.log('🔐 Please confirm on your Ledger:');
  console.log('   - Function: notifyRewardAmount');
  console.log('   - Amount: 3,000,000 AIPG');
  console.log('');
  
  // Populate transaction
  const tx = await vault.notifyRewardAmount.populateTransaction(rewardAmount);
  tx.from = address;
  tx.chainId = 8453; // Base
  tx.type = 2;
  tx.maxFeePerGas = feeData.maxFeePerGas;
  tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
  tx.nonce = await provider.getTransactionCount(address);
  tx.gasLimit = await provider.estimateGas(tx);
  
  console.log('📤 Sending transaction...');
  const signedTx = await signer.signTransaction(tx);
  const txResponse = await provider.broadcastTransaction(signedTx);
  
  console.log('   Transaction:', txResponse.hash);
  console.log('   Waiting for confirmation...');
  
  await txResponse.wait();
  
  console.log('✅ Rewards started!');
  console.log('');
  
  // Check new state
  const newRate = await vault.rewardRate();
  const newPeriodFinish = await vault.periodFinish();
  
  console.log('📈 New State:');
  console.log('   Reward Rate:', ethers.formatEther(newRate), 'AIPG/second');
  console.log('   Period Finish:', new Date(Number(newPeriodFinish) * 1000).toLocaleString());
  console.log('');
  console.log('🎉 Staking is now LIVE! Users can stake and earn rewards.');
  console.log('');
  console.log('💡 Check your staking page to see the APY update!');
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});

