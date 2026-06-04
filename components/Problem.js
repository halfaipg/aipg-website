"use client";
import React from "react";

const Problem = () => {
  return (
    <div style={{backgroundColor: '#1F1F1F'}}>
      <div className="max-w-[85rem] px-6 py-16 sm:px-8 lg:px-10 lg:py-20 mx-auto">
        {/* Mission Statement */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl text-white font-bold lg:text-5xl mb-6 leading-tight">
            The kid in Lagos learning to build an agent shouldn't lose to a credit card.
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            The most useful technology of our generation now costs more per month than a lot of people make in a week.
            That's the problem AIPG was built to fix — and we fix it by letting the people who can pay, pay for the people who can't.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-2xl p-7">
            <div className="flex justify-center mb-4">
              <span className="text-4xl">🎓</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Free, and it stays free</h3>
            <p className="text-gray-300 leading-relaxed">
              Sign up, get a key, build. No trial counting down. No reminder email asking for your card.
              The free tier is the product — not a hook.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-7">
            <div className="flex justify-center mb-4">
              <span className="text-4xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Pay it forward, automatically</h3>
            <p className="text-gray-300 leading-relaxed">
              When you pay for higher limits, you're not just buying compute — you're funding the free tier
              for someone shipping their first agent in a country where $20/mo isn't on the table.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-7">
            <div className="flex justify-center mb-4">
              <span className="text-4xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">A network nobody owns</h3>
            <p className="text-gray-300 leading-relaxed">
              Got a GPU? Plug it in. Earn AIPG for every request you serve. The Grid is built so no
              single company can ever flip the switch — including us.
            </p>
          </div>
        </div>

        {/* The Model */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">The simplest economy in AI</h3>
            <p className="text-gray-400">Three roles. One flow. No middlemen.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex-1 p-4">
              <div className="text-3xl font-bold text-orange-400">Paid users</div>
              <div className="text-gray-400 mt-2">Pay for higher limits and confidential workloads</div>
            </div>
            <div className="text-3xl text-gray-600">→</div>
            <div className="flex-1 p-4">
              <div className="text-3xl font-bold text-blue-400">Node operators</div>
              <div className="text-gray-400 mt-2">Run GPUs, serve requests, earn AIPG</div>
            </div>
            <div className="text-3xl text-gray-600">→</div>
            <div className="flex-1 p-4">
              <div className="text-3xl font-bold text-green-400">Free users</div>
              <div className="text-gray-400 mt-2">Build, learn, ship — on the same network</div>
            </div>
          </div>
          <p className="text-center text-gray-300 mt-8 max-w-2xl mx-auto leading-relaxed">
            Every paid call expands the free tier. The bigger AIPG gets, the more free access there is to go around.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Problem;
