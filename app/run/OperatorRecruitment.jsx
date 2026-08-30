import { FiArrowRight, FiCpu, FiShield } from "react-icons/fi";
import {
  OPERATOR_INTAKE_URL,
  TEXT_OPERATOR_COHORT_URL,
} from "./operatorLinks";

export default function OperatorRecruitment() {
  return (
    <section
      id="operator-cohort"
      className="scroll-mt-20 border-y border-white/10 bg-[#111214]"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1fr_auto] md:items-center md:px-8 lg:py-16">
        <div className="max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase text-orange-400">
            <FiCpu aria-hidden="true" />
            Operator cohort
          </p>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            Add independent text capacity
          </h2>
          <p className="mt-4 text-sm leading-6 text-gray-300 md:text-base">
            The current paid cohort is open to Linux operators with an existing
            Ollama or OpenAI-compatible GPU backend. Join the tracked cohort for
            current model gaps, acceptance evidence, and setup support.
          </p>
          <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-gray-400">
            <FiShield className="mt-0.5 shrink-0" aria-hidden="true" />
            Both GitHub paths are public. Share coarse hardware and availability
            only. Never post credentials, wallet details, network addresses, or
            private logs.
          </p>
        </div>
        <div className="grid min-w-60 gap-3">
          <a
            href={TEXT_OPERATOR_COHORT_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-orange-500 px-6 font-bold text-black transition-colors hover:bg-orange-400"
          >
            Join the text cohort
            <FiArrowRight aria-hidden="true" />
          </a>
          <a
            href={OPERATOR_INTAKE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 px-6 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Register other hardware
            <FiArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
