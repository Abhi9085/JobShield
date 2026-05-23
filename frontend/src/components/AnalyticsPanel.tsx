import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Database,
  Cpu,
} from "lucide-react";

interface AnalyticsPanelProps {
  isVisible: boolean;
  compact?: boolean;
  chartOnly?: boolean;
  stats: {
    tokensProcessed: number;
    modelConfidence: number;
    processingTime: number;
    patternsDetected: number;
  };
}

export const AnalyticsPanel = ({
  isVisible,
  stats,
  compact = false,
  chartOnly = false,
}: AnalyticsPanelProps) => {
  const metrics = [
    {
      label: "Tokens",
      value: stats.tokensProcessed.toLocaleString(),
      icon: <Database className="h-4 w-4" />,
      color: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      label: "Confidence",
      value: `${stats.modelConfidence}%`,
      icon: <Cpu className="h-4 w-4" />,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Time",
      value: `${stats.processingTime}ms`,
      icon: <TrendingUp className="h-4 w-4" />,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Patterns",
      value: stats.patternsDetected.toString(),
      icon: <BarChart3 className="h-4 w-4" />,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  const keywordBars = [
    {
      label: "Technical Terms",
      value: 72,
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      label: "Red Flag Keywords",
      value: 23,
      gradient: "from-rose-500 to-red-400",
    },
    {
      label: "Company Mentions",
      value: 45,
      gradient: "from-indigo-500 to-purple-400",
    },
    {
      label: "Salary Info",
      value: 88,
      gradient: "from-emerald-500 to-teal-400",
    },
  ];

  // =========================
  // CHART ONLY MODE
  // =========================

  if (chartOnly) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="
          rounded-3xl p-6 sm:p-8
          
          /* Refined Ultra-Glass */
          bg-gradient-to-b from-white/60 to-white/30 
          backdrop-blur-2xl 
          border border-white/80 
          shadow-[0_8px_32px_rgba(148,163,184,0.15)]
          
          /* Subtle inner glow for depth */
          ring-1 ring-inset ring-white/50

          dark:border-white/10
          dark:bg-gradient-to-b dark:from-slate-900/60 dark:to-slate-900/30
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
          dark:ring-white/5
        "
      >
        <div className="mb-7 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Keyword Frequency Analysis
          </h4>
        </div>

        <div className="space-y-6">
          {keywordBars.map((bar, i) => (
            <div key={bar.label} className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {bar.label}
                </span>
                <span className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
                  {bar.value}%
                </span>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/60 shadow-inner dark:bg-slate-800/60">
                <motion.div
                  initial={{ width: 0 }}
                  animate={
                    isVisible
                      ? { width: `${bar.value}%` }
                      : { width: 0 }
                  }
                  transition={{
                    delay: 0.3 + i * 0.15,
                    duration: 1.2,
                    ease: "easeOut",
                  }}
                  className={`h-full rounded-full bg-gradient-to-r ${bar.gradient} shadow-[inset_0_-1px_1px_rgba(0,0,0,0.1)]`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // =========================
  // COMPACT ANALYTICS MODE
  // =========================

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
        <Cpu className="h-3.5 w-3.5" />
        Model Analytics
      </h3>

      <div className="grid gap-3.5">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.1 + index * 0.08,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -3, scale: 1.01 }}
            className="
              group flex items-center justify-between
              rounded-2xl px-5 py-4
              transition-all duration-300 ease-out

              /* True Frosted Glass for the individual cards */
              bg-white/50 
              backdrop-blur-xl 
              border border-white/90
              shadow-[0_4px_20px_rgba(148,163,184,0.1)]
              
              hover:bg-white/80 
              hover:border-white 
              hover:shadow-[0_8px_25px_rgba(148,163,184,0.2)] 

              dark:border-white/10
              dark:bg-slate-900/50
              dark:hover:bg-slate-800/70
            "
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-xl
                  transition-transform duration-300 group-hover:scale-110 group-hover:shadow-sm
                  ${metric.bg}
                `}
              >
                <div className={metric.color}>{metric.icon}</div>
              </div>

              <span className="font-semibold text-slate-600 dark:text-slate-300">
                {metric.label}
              </span>
            </div>

            {/* RIGHT */}
            <span className="font-mono text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {metric.value}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};