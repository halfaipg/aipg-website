'use client';

import { StakingInterface } from '@/components/StakingInterface';

export default function StakingPage() {
  return (
    <div className="bg-black relative min-h-screen">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-100"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.1),transparent_50%)]"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10">
        {/* Transition Banner */}
        <div className="pt-24 pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="text-4xl">⚠️</div>
                <div>
                  <h2 className="text-2xl font-bold text-amber-400 mb-2">Staking Program Ending</h2>
                  <p className="text-gray-300 mb-4">
                    We're transitioning from passive staking to <strong>Validator Nodes</strong> and <strong>AI Worker Nodes</strong> —
                    where you earn by actually powering the network, not just holding tokens.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-amber-500/20 text-amber-300 px-4 py-2 rounded-lg text-sm">
                      ✓ No lockup — withdraw anytime
                    </div>
                    <div className="bg-amber-500/20 text-amber-300 px-4 py-2 rounded-lg text-sm">
                      ✓ Your tokens are safe
                    </div>
                    <div className="bg-amber-500/20 text-amber-300 px-4 py-2 rounded-lg text-sm">
                      ✓ Rewards have ended
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staking Section */}
        <div className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Staking Interface */}
            <StakingInterface />
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* What's Next CTA */}
          <div className="mb-12 max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative bg-gradient-to-r from-cyan-900/30 to-blue-900/30 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">What's Next?</h3>
                <p className="text-gray-300 mb-6">
                  Instead of passive staking, earn AIPG by actively contributing to the network.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-900/50 rounded-xl p-4 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="12" rx="2"/>
                          <path d="M8 20h8M12 16v4"/>
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-cyan-400 mb-1">AI Worker Nodes</h4>
                    <p className="text-gray-400 text-sm">Run an LLM, image, or video worker — earn AIPG for every job you serve.</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-xl p-4 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-cyan-400 mb-1">Validator Nodes</h4>
                    <p className="text-gray-400 text-sm">Bond AIPG to verify worker results and earn verification fees. Coming soon.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl blur opacity-0 group-hover:opacity-30 transition"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-xl bg-green-500/15 border border-green-500/40 flex items-center justify-center">
                <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0M5 11h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Lock Period</h3>
            <p className="text-gray-400">
              Withdraw your AIPG anytime. Your tokens are never locked.
            </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl blur opacity-0 group-hover:opacity-30 transition"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-xl bg-green-500/15 border border-green-500/40 flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Withdrawal</h3>
              <p className="text-gray-400">
                Your tokens are returned immediately. No waiting period.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl blur opacity-0 group-hover:opacity-30 transition"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-xl bg-green-500/15 border border-green-500/40 flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ready for Nodes</h3>
              <p className="text-gray-400">
                Withdraw now to participate in the upcoming node programs.
              </p>
            </div>
          </div>
        </div>

        {/* Contract Info & Security */}
        <div className="mb-12 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
          <div className="relative bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-xl bg-green-500/15 border border-green-500/40 flex items-center justify-center">
              <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Verified Smart Contract</h3>
          <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
            Our staking contract is verified on BaseScan and audited for security. Your funds are protected by battle-tested OpenZeppelin libraries.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://basescan.org/address/0x3ED14A6D5A48614D77f313389611410d38fd8277#code"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-xl transition-all font-semibold"
            >
              <span>✓</span>
              View Contract on BaseScan
            </a>
            <div className="inline-flex items-center gap-2 bg-gray-700/50 text-gray-300 px-4 py-2 rounded-xl">
              <span className="text-xs">📍</span>
              <span className="text-sm font-mono">0x3ED1...8277</span>
            </div>
            </div>
          </div>
        </div>

        {/* How to Withdraw */}
        <div className="mb-12 max-w-5xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
          <div className="relative bg-gray-800/30 backdrop-blur-sm border border-green-500/10 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">How to Withdraw</h2>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-900/30 rounded-xl p-4 text-center">
              <div className="bg-green-500/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-500/30">
                <span className="text-green-400 font-bold text-xl">1</span>
              </div>
              <h4 className="text-white font-semibold mb-2 text-base">Connect Wallet</h4>
              <p className="text-gray-400 text-sm">Connect the same wallet you used to stake</p>
            </div>

            <div className="bg-gray-900/30 rounded-xl p-4 text-center">
              <div className="bg-green-500/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-500/30">
                <span className="text-green-400 font-bold text-xl">2</span>
              </div>
              <h4 className="text-white font-semibold mb-2 text-base">Click Withdraw</h4>
              <p className="text-gray-400 text-sm">Click MAX then Withdraw to get all your AIPG back</p>
            </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12 max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
          <div className="relative bg-gray-800/30 backdrop-blur-sm border border-cyan-500/10 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>

          <div className="space-y-5">
            <div className="bg-gray-900/30 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-2">Why is staking ending?</h4>
              <p className="text-gray-400 text-sm">We're transitioning to a model where rewards go to active network participants — AI workers and validators — rather than passive token holders. This makes the network stronger and more decentralized.</p>
            </div>

            <div className="bg-gray-900/30 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-2">Is there a deadline to withdraw?</h4>
              <p className="text-gray-400 text-sm">No hard deadline. Your tokens are safe and you can withdraw anytime. The staking program has ended, so there's no benefit to staying staked.</p>
            </div>

            <div className="bg-gray-900/30 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-2">How do I participate in the node program?</h4>
              <p className="text-gray-400 text-sm">Details coming soon. Join our Discord to be notified when the Validator Node and AI Worker Node programs launch.</p>
            </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

