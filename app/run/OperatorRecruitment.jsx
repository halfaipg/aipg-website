import { FiArrowRight, FiCpu, FiShield } from "react-icons/fi";

const OPERATOR_INTAKE_URL =
  "https://github.com/halfaipg/aipg-website/issues/new?template=operator-interest.yml";

export default function OperatorRecruitment() {
  return (
    <section className="border-y border-white/10 bg-[#111214]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1fr_auto] md:items-center md:px-8 lg:py-16">
        <div className="max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase text-orange-400">
            <FiCpu aria-hidden="true" />
            Operator cohort
          </p>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            Have a GPU we should put to work?
          </h2>
          <p className="mt-4 text-sm leading-6 text-gray-300 md:text-base">
            Share the model, VRAM, operating system, and availability. We will
            match promising machines to a verified worker path or qualification
            cohort as capacity opens.
          </p>
          <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-gray-400">
            <FiShield className="mt-0.5 shrink-0" aria-hidden="true" />
            The intake is public and accepts coarse specifications only. Never
            post credentials, wallet details, network addresses, or private
            logs.
          </p>
        </div>
        <a
          href={OPERATOR_INTAKE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-orange-500 px-6 font-bold text-black transition-colors hover:bg-orange-400"
        >
          Register operator interest
          <FiArrowRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
