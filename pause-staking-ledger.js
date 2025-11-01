const ethers = require('ethers');
const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid').default;
const AppEth = require('@ledgerhq/hw-app-eth').default;

const CONFIG = {
  RPC_URL: 'https://mainnet.base.org',
  STAKING_VAULT: '0x3ED14A6D5A48614D77f313389611410d38fd8277',
  LEDGER_PATH: "m/44'/60'/1'/0/0", // Admin address
};

const STAKING_ABI = [
  'function pause() external',
  'function paused() view returns (bool)'
];

class LedgerSigner extends ethers.Signer {
  constructor(provider, path) {
    super();
    this.provider = provider;
    this.path = path;
    ethers.defineProperties(this, { provider });
  }

  async getAddress() {
    const transport = await TransportNodeHid.create();
    const eth = new AppEth(transport);
    const { address } = await eth.getAddress(this.path);
    await transport.close();
    return ethers.getAddress(address);
  }

  async signTransaction(transaction) {
    const transport = await TransportNodeHid.create();
    const eth = new AppEth(transport);

    const tx = await ethers.resolveProperties(transaction);
    const baseTx = {
      chainId: tx.chainId || 8453,
      data: tx.data || '0x',
      gasLimit: tx.gasLimit ? ethers.toBeHex(tx.gasLimit) : '0x',
      gasPrice: tx.gasPrice ? ethers.toBeHex(tx.gasPrice) : undefined,
      maxFeePerGas: tx.maxFeePerGas ? ethers.toBeHex(tx.maxFeePerGas) : undefined,
      maxPriorityFeePerGas: tx.maxPriorityFeePerGas ? ethers.toBeHex(tx.maxPriorityFeePerGas) : undefined,
      nonce: tx.nonce ? ethers.toBeHex(tx.nonce) : '0x0',
      to: tx.to || undefined,
      value: tx.value ? ethers.toBeHex(tx.value) : '0x0',
      type: tx.type || 2,
    };

    const unsignedTx = ethers.Transaction.from(baseTx);
    const unsignedSerialized = unsignedTx.unsignedSerialized.substring(2);

    const resolution = await eth.resolveTransaction(unsignedSerialized, {}, {});
    const signature = await eth.signTransaction(this.path, unsignedSerialized, resolution);

    await transport.close();

    const signedTx = ethers.Transaction.from({
      ...baseTx,
      signature: {
        r: '0x' + signature.r,
        s: '0x' + signature.s,
        v: parseInt(signature.v, 10),
      },
    });

    return signedTx.serialized;
  }

  connect(provider) {
    return new LedgerSigner(provider, this.path);
  }

  async signMessage(message) {
    throw new Error('signMessage not implemented for Ledger');
  }
}

async function main() {
  console.log('🛑 PAUSING STAKING CONTRACT...\n');

  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
  const signer = new LedgerSigner(provider, CONFIG.LEDGER_PATH);
  const address = await signer.getAddress();

  console.log('Admin Address:', address);

  const vault = new ethers.Contract(CONFIG.STAKING_VAULT, STAKING_ABI, signer);

  // Check current status
  const isPaused = await vault.paused();
  console.log('Currently Paused:', isPaused);

  if (isPaused) {
    console.log('\n✅ Contract is already paused!');
    return;
  }

  // Populate transaction
  const tx = await vault.pause.populateTransaction();
  const nonce = await provider.getTransactionCount(address);
  const feeData = await provider.getFeeData();

  const fullTx = {
    ...tx,
    from: address,
    nonce,
    chainId: 8453,
    type: 2,
    maxFeePerGas: feeData.maxFeePerGas,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    gasLimit: 100000n,
  };

  console.log('\n📝 Please approve on Ledger...');
  const signedTx = await signer.signTransaction(fullTx);
  
  console.log('📤 Broadcasting...');
  const response = await provider.broadcastTransaction(signedTx);
  
  console.log('⏳ Waiting for confirmation...');
  console.log('TX:', response.hash);
  
  await response.wait();
  
  console.log('\n✅ STAKING PAUSED!');
  console.log('No one can stake, unstake, or claim until you unpause.');
}

main().catch(console.error);
