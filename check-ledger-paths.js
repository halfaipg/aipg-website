const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid').default;
const AppEth = require('@ledgerhq/hw-app-eth').default;

const PATHS = [
  "m/44'/60'/0'/0/0",  // Standard path
  "m/44'/60'/1'/0/0",  // Path 1
  "m/44'/60'/2'/0/0",  // Path 2
  "m/44'/60'/0'/0/1",  // Address 1
  "m/44'/60'/0'/0/2",  // Address 2
];

const TARGET = '0xA218db26ed545f3476e6c3E827b595cf2E182533';

async function main() {
  console.log('🔍 Checking Ledger paths for treasury address...\n');
  console.log('Target:', TARGET);
  console.log('');
  
  const transport = await TransportNodeHid.create();
  const eth = new AppEth(transport);
  
  for (const path of PATHS) {
    try {
      const result = await eth.getAddress(path);
      const match = result.address.toLowerCase() === TARGET.toLowerCase() ? '✅ MATCH!' : '';
      console.log(`${path}: ${result.address} ${match}`);
    } catch (error) {
      console.log(`${path}: Error - ${error.message}`);
    }
  }
  
  await transport.close();
}

main().catch(console.error);

