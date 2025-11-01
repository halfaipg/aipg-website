/**
 * FUND STAKING VAULT WITH 3M AIPG (LEDGER)
 * 
 * Transfers 3M AIPG from your treasury to the StakingVault for rewards
 */

const { ethers } = require('ethers');
const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid').default;
const AppEth = require('@ledgerhq/hw-app-eth').default;

const CONFIG = {
  RPC_URL: 'https://mainnet.base.org',
  AIPG_TOKEN: '0xa1c0deCaFE3E9Bf06A5F29B7015CD373a9854608',
  STAKING_VAULT: '0x3ED14A6D5A48614D77f313389611410d38fd8277',
  LEDGER_PATH: "m/44'/60'/0'/0/0", // Treasury address path
  AMOUNT: '3000000' // 3M AIPG
};

const ERC20_ABI = [
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)"
];

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
  console.log('💰 FUND STAKING VAULT WITH 3M AIPG');
  console.log('═══════════════════════════════════════════════════════\n');
  
  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
  const signer = new LedgerSigner(provider, CONFIG.LEDGER_PATH);
  const address = await signer.getAddress();
  
  console.log('📊 Configuration:');
  console.log('   Your Address:', address);
  console.log('   StakingVault:', CONFIG.STAKING_VAULT);
  console.log('   Amount:', CONFIG.AMOUNT, 'AIPG');
  console.log('');
  
  const aipg = new ethers.Contract(CONFIG.AIPG_TOKEN, ERC20_ABI, signer);
  
  // Check balances
  const yourBalance = await aipg.balanceOf(address);
  const vaultBalance = await aipg.balanceOf(CONFIG.STAKING_VAULT);
  
  console.log('💼 Current Balances:');
  console.log('   Your Balance:', ethers.formatEther(yourBalance), 'AIPG');
  console.log('   Vault Balance:', ethers.formatEther(vaultBalance), 'AIPG');
  console.log('');
  
  const amount = ethers.parseEther(CONFIG.AMOUNT);
  
  if (amount > yourBalance) {
    throw new Error(`❌ Insufficient balance. Need ${ethers.formatEther(amount)}, have ${ethers.formatEther(yourBalance)}`);
  }
  
  // Get gas estimate
  const feeData = await provider.getFeeData();
  console.log('⛽ Gas Price:', ethers.formatUnits(feeData.maxFeePerGas, 'gwei'), 'gwei');
  console.log('');
  
  console.log('🔐 Please confirm on your Ledger:');
  console.log('   - Check the recipient address matches StakingVault');
  console.log('   - Check the amount is 3,000,000 AIPG');
  console.log('');
  
  // Populate transaction
  const tx = await aipg.transfer.populateTransaction(CONFIG.STAKING_VAULT, amount);
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
  
  console.log('✅ Transfer complete!');
  console.log('');
  
  const newVaultBalance = await aipg.balanceOf(CONFIG.STAKING_VAULT);
  console.log('📦 New Vault Balance:', ethers.formatEther(newVaultBalance), 'AIPG');
  console.log('');
  console.log('💡 Next Step:');
  console.log('   Run: node start-rewards-ledger.js to begin reward distribution');
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});

