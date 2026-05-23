import { motion } from "framer-motion";
import {
  ShieldCheck,
  Search,
  Cpu,
  ScanSearch,
} from "lucide-react";

const features = [
  "Payment scam detection",
  "Urgency language analysis",
  "Semantic anomaly scanning",
  "Company authenticity checks",
];

export const EmptyStatePreview = () => {
  return (
    <div className="relative flex h-full min-h-[500px] flex-col overflow-hidden rounded-3xl">
      
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.04]">
        <div
          className="h-full w-full dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,23,42,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div
          className="hidden h-full w-full dark:block"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* AMBIENT GLOW */}
      <div
        className="
          absolute left-1/2 top-1/4
          h-72 w-72 -translate-x-1/2
          rounded-full

          bg-cyan-400/20
          opacity-80 dark:opacity-40

          blur-[80px]
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-6">

        {/* Animated Frosted Orb */}
        <motion.div
          className="
            relative mb-8
            flex h-28 w-28 items-center justify-center
            rounded-full

            /* Glass Styling */
            border border-white/60 bg-white/40
            shadow-[0_8px_32px_rgba(0,0,0,0.05)]
            backdrop-blur-xl

            dark:border-cyan-500/20 dark:bg-slate-900/50
            dark:shadow-[0_8px_32px_rgba(34,211,238,0.05)]
          "
          animate={{
            boxShadow: [
              "0 8px 32px rgba(34,211,238,0.05)",
              "0 8px 40px rgba(34,211,238,0.2)",
              "0 8px 32px rgba(34,211,238,0.05)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Rotating Ring */}
          <motion.div
            className="
              absolute inset-0 rounded-full
              border border-dashed border-cyan-500/40
              dark:border-cyan-400/30
            "
            animate={{ rotate: 360 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <ShieldCheck className="h-12 w-12 text-cyan-600 drop-shadow-sm dark:text-cyan-400" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: "easeOut" }}
          className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100"
        >
          AI Fraud Detection Engine
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400"
        >
          Analyze employment listings using semantic pattern recognition,
          linguistic anomaly detection, and fraud classification models.
        </motion.p>

        {/* Feature List (Inner Glass Cards) */}
        <div className="mt-10 grid w-full max-w-sm gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                y: -2,
                scale: 1.01,
              }}
              className="
                group flex items-center gap-4 rounded-2xl
                px-5 py-3.5
                transition-all duration-300

                /* Inner Frosted Glass Styling */
                border border-white/60 bg-white/50
                shadow-[0_4px_20px_rgba(0,0,0,0.03)]
                backdrop-blur-md

                hover:bg-white/70 hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)]

                dark:border-white/10 dark:bg-slate-900/40
                dark:hover:bg-slate-800/60
              "
            >
              {/* Icon Container */}
              <div
                className="
                  flex h-9 w-9 items-center justify-center rounded-xl
                  bg-cyan-500/10 transition-transform duration-300
                  group-hover:scale-110 group-hover:shadow-sm
                  dark:bg-cyan-500/10
                "
              >
                {index === 0 && <ShieldCheck className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />}
                {index === 1 && <Search className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />}
                {index === 2 && <Cpu className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />}
                {index === 3 && <ScanSearch className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />}
              </div>

              {/* Text */}
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Status */}
        <motion.div
          className="mt-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400"
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)] dark:bg-cyan-400" />
          Neural analysis engine online
        </motion.div>

      </div>
    </div>
  );
};