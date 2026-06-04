"use client";
import React from "react";

const Problem = () => {
  return (
    <div style={{backgroundColor: '#1F1F1F'}}>
      <div className="max-w-[85rem] px-6 py-16 sm:px-8 lg:px-10 lg:py-20 mx-auto">
        {/* Mission Statement */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl text-white font-bold lg:text-5xl mb-6 leading-tight">
            AI shouldn't have a doorman.
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            $20 a month before your first line of code. A trial that expires. A card you don't have.
            Closed AI is full of velvet ropes. AIPG is built so the people who can pay fund the people who can't —
            and so the network can never be shut down by anyone, including us.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-2xl p-7">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-xl bg-orange-500/15 border border-orange-500/40 flex items-center justify-center">
                <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Free, and it stays free</h3>
            <p className="text-gray-300 leading-relaxed">
              Sign up, get a key, build. No trial counting down. No reminder email asking for your card.
              The free tier is the product — not a hook.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-7">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center">
                <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Pay it forward, automatically</h3>
            <p className="text-gray-300 leading-relaxed">
              When you pay for higher limits, you're not just buying compute — you're funding the free tier
              for someone shipping their first agent in a country where $20/mo isn't on the table.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-7">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Private. Unbiased. Yours.</h3>
            <p className="text-gray-300 leading-relaxed">
              Open models, no corporate worldview baked in by a policy team you've never met.
              On the confidential tier, even the operator running the GPU can't read your prompts.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Problem;
