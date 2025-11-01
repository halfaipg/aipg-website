/**
 * GRANT REWARD_DISTRIBUTOR_ROLE (LEDGER)
 * 
 * Grants yourself the REWARD_DISTRIBUTOR_ROLE so you can call notifyRewardAmount()
 */

const { ethers } = require('ethers');
const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid').default;
const AppEth = require('@ledgerhq/hw-app-eth').default;

const CONFIG = {
  RPC_URL: 'https://mainnet.base.org',
  STAKING_VAULT: '0x3ED14A6D5A48614D77f313389611410d38fd8277',
  LEDGER_PATH: "m/44'/60'/1'/0/0", // Admin Ledger address (the one that deployed the contract)
};

const STAKING_VAULT_ABI = [
  "function grantRole(bytes32 role, address account) external",
  "function hasRole(bytes32 role, address account) external view returns (bool)",
  "function DEFAULT_ADMIN_ROLE() external view returns (bytes32)"
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
  console.log('🔐 GRANT REWARD_DISTRIBUTOR_ROLE');
  console.log('═══════════════════════════════════════════════════════\n');
  
  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
  const signer = new LedgerSigner(provider, CONFIG.LEDGER_PATH);
  const adminAddress = await signer.getAddress();
  
  // Also get the treasury address to grant it the role
  const treasurySigner = new LedgerSigner(provider, "m/44'/60'/0'/0/0");
  const treasuryAddress = await treasurySigner.getAddress();
  
  console.log('📊 Configuration:');
  console.log('   Admin Address:', adminAddress);
  console.log('   Treasury Address:', treasuryAddress);
  console.log('   StakingVault:', CONFIG.STAKING_VAULT);
  console.log('');
  
  const vault = new ethers.Contract(CONFIG.STAKING_VAULT, STAKING_VAULT_ABI, signer);
  
  // Check admin role
  const DEFAULT_ADMIN_ROLE = await vault.DEFAULT_ADMIN_ROLE();
  const isAdmin = await vault.hasRole(DEFAULT_ADMIN_ROLE, adminAddress);
  
  console.log('🔐 Current Permissions:');
  console.log('   Admin has DEFAULT_ADMIN_ROLE:', isAdmin ? '✅' : '❌');
  
  if (!isAdmin) {
    throw new Error('❌ You do not have admin role on this contract!');
  }
  
  // Check if treasury already has the role
  const treasuryHasRole = await vault.hasRole(REWARD_DISTRIBUTOR_ROLE, treasuryAddress);
  console.log('   Treasury has REWARD_DISTRIBUTOR_ROLE:', treasuryHasRole ? '✅ (already granted)' : '❌');
  console.log('');
  
  if (treasuryHasRole) {
    console.log('✅ Treasury already has REWARD_DISTRIBUTOR_ROLE!');
    console.log('');
    console.log('💡 Next Step:');
    console.log('   Run: node start-rewards-ledger.js');
    return;
  }
  
  // Get gas estimate
  const feeData = await provider.getFeeData();
  console.log('⛽ Gas Price:', ethers.formatUnits(feeData.maxFeePerGas, 'gwei'), 'gwei');
  console.log('');
  
  console.log('🔐 Please confirm on your Ledger:');
  console.log('   - Granting REWARD_DISTRIBUTOR_ROLE to treasury');
  console.log('');
  
  // Populate transaction
  const tx = await vault.grantRole.populateTransaction(REWARD_DISTRIBUTOR_ROLE, treasuryAddress);
  tx.from = adminAddress;
  tx.chainId = 8453; // Base
  tx.type = 2;
  tx.maxFeePerGas = feeData.maxFeePerGas;
  tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
  tx.nonce = await provider.getTransactionCount(adminAddress);
  tx.gasLimit = await provider.estimateGas(tx);
  
  console.log('📤 Sending transaction...');
  const signedTx = await signer.signTransaction(tx);
  const txResponse = await provider.broadcastTransaction(signedTx);
  
  console.log('   Transaction:', txResponse.hash);
  console.log('   Waiting for confirmation...');
  
  await txResponse.wait();
  
  console.log('✅ Role granted!');
  console.log('');
  console.log('💡 Next Step:');
  console.log('   Run: node start-rewards-ledger.js');
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});

