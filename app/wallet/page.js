"use client";

import { useState } from "react";

const TOKEN_ADDRESS = "0xa1c0deCaFE3E9Bf06A5F29B7015CD373a9854608";
const BASE_CHAIN_ID = "0x2105"; // 8453

const Wallet = () => {
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(TOKEN_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addToWallet = async () => {
    const eth = typeof window !== "undefined" ? window.ethereum : null;
    if (!eth) {
      window.open("https://metamask.io/download/", "_blank");
      return;
    }
    try {
      // Make sure we're on Base, then register the token.
      await eth
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: BASE_CHAIN_ID }],
        })
        .catch(async (err) => {
          if (err?.code === 4902) {
            await eth.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: BASE_CHAIN_ID,
                  chainName: "Base",
                  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
                  rpcUrls: ["https://mainnet.base.org"],
                  blockExplorerUrls: ["https://basescan.org"],
                },
              ],
            });
          }
        });
      await eth.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: TOKEN_ADDRESS,
            symbol: "AIPG",
            decimals: 18,
          },
        },
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    } catch (e) {
      // user rejected — nothing to do
    }
  };

  return (
    <div className="pb-40 pt-10">
      <div className="w-full py-8 md:py-12" style={{ backgroundColor: "#1F1F1F" }}>
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-semibold text-white mb-2">
            The AIPG Token
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto px-6">
            AIPG is an ERC-20 token on{" "}
            <a
              href="https://base.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Base
            </a>
            , Ethereum&apos;s leading L2. No special wallet needed — MetaMask,
            Rabby, Coinbase Wallet, or any wallet that speaks Base.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-10">
        {/* Contract address card */}
        <div className="bg-gray-900/70 border border-gray-700 rounded-2xl p-6 md:p-8 mb-8">
          <div className="text-sm text-gray-400 mb-1">
            Token contract (Base mainnet)
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <code className="text-sm md:text-base text-green-400 break-all">
              {TOKEN_ADDRESS}
            </code>
            <button
              onClick={copyAddress}
              className="px-3 py-1.5 text-sm rounded-full bg-gray-700 hover:bg-gray-600 text-white transition"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-800 text-sm">
            <div>
              <div className="text-gray-400">Network</div>
              <div className="text-white">Base (8453)</div>
            </div>
            <div>
              <div className="text-gray-400">Symbol</div>
              <div className="text-white">AIPG</div>
            </div>
            <div>
              <div className="text-gray-400">Supply</div>
              <div className="text-white">150M fixed</div>
            </div>
            <div>
              <div className="text-gray-400">Minting</div>
              <div className="text-white">Renounced</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={addToWallet}
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
          >
            {added ? "Added ✓" : "Add AIPG to your wallet"}
          </button>
          <a
            href={`https://basescan.org/token/${TOKEN_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white font-medium transition text-center"
          >
            View on BaseScan
          </a>
        </div>

        {/* Legacy note */}
        <p className="text-sm text-gray-400 text-center max-w-2xl mx-auto">
          Coming from the legacy AIPG chain? The network migrated to Base — the
          old core and paper wallets are retired. Visit our{" "}
          <a
            href="https://discord.gg/W9D8j6HCtC"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Discord
          </a>{" "}
          for migration help.
        </p>
      </div>
    </div>
  );
};

export default Wallet;
