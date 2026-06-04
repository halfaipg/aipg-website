"use client";
import React from "react";

const Problem = () => {
  return (
    <div style={{backgroundColor: '#1F1F1F'}}>
      <div className="max-w-[85rem] px-6 py-16 sm:px-8 lg:px-10 lg:py-20 mx-auto">
        {/* Mission Statement */}
        <div className="text-center mb-16">
          <h2 className="text-3xl text-white font-bold lg:text-4xl mb-4">
            AI Should Be Accessible to Everyone
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Not just those who can afford $20/month subscriptions. Students learning to code.
            Developers in emerging markets. Hobbyists exploring AI. Everyone deserves access.
          </p>
        </div>

        {/* How It Works */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-white mb-2">Free to Learn</h3>
            <p className="text-gray-400">
              Students and learners get free daily access. No credit card. No trial that expires. Just start building.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-white mb-2">Pay It Forward</h3>
            <p className="text-gray-400">
              When you pay for API access, you're funding free access for others. Your usage powers the community.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Run a Node, Earn</h3>
            <p className="text-gray-400">
              Got a GPU? Run a worker node and earn AIPG for every request you process. Power the network, get paid.
            </p>
          </div>
        </div>

        {/* The Model */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white">How Free AI Works</h3>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex-1 p-4">
              <div className="text-3xl font-bold text-orange-400">Paid Users</div>
              <div className="text-gray-400 mt-1">Fund the network</div>
            </div>
            <div className="text-3xl text-gray-600">→</div>
            <div className="flex-1 p-4">
              <div className="text-3xl font-bold text-blue-400">Node Operators</div>
              <div className="text-gray-400 mt-1">Provide compute</div>
            </div>
            <div className="text-3xl text-gray-600">→</div>
            <div className="flex-1 p-4">
              <div className="text-3xl font-bold text-green-400">Free Users</div>
              <div className="text-gray-400 mt-1">Learn and build</div>
            </div>
          </div>
          <p className="text-center text-gray-400 mt-6">
            A sustainable model where success funds accessibility. The more the network grows, the more free access it can provide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Problem; 