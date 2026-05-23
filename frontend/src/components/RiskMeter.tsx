import { motion } from "framer-motion";
import { useMemo } from "react";

interface RiskMeterProps {
  percentage: number;
  isAnalyzing?: boolean;
}

export const RiskMeter = ({ percentage, isAnalyzing = false }: RiskMeterProps) => {

  const { colorClass, glowClass, label, badgeClass } = useMemo(() => {
    if (percentage <= 60) {
      return {
        colorClass: "text-risk-safe",
        glowClass: "shadow-[0_0_25px_rgba(16,185,129,0.4)]",
        label: "SAFE",
        badgeClass: "verdict-safe"
      };
    } else if (percentage <= 85) {
      return {
        colorClass: "text-risk-suspicious",
        glowClass: "shadow-[0_0_25px_rgba(245,158,11,0.4)]",
        label: "SUSPICIOUS",
        badgeClass: "verdict-suspicious"
      };
    } else {
      return {
        colorClass: "text-risk-critical",
        glowClass: "shadow-[0_0_25px_rgba(239,68,68,0.4)]",
        label: "CRITICAL",
        badgeClass: "verdict-critical"
      };
    }
  }, [percentage]);

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">

      <div className="relative flex items-center justify-center w-[160px] h-[160px] sm:w-[180px] sm:h-[180px]">

        {/* Glow */}
        <motion.div
          className={`absolute inset-0 rounded-full blur-2xl opacity-60 ${glowClass}`}
          animate={isAnalyzing ? { scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* SVG */}
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          {/* Background ring */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="hsl(var(--border))"
            strokeWidth="8"
            fill="none"
            className="opacity-40"
          />

          {/* Progress ring */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            className={colorClass}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: isAnalyzing ? circumference : strokeDashoffset
            }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          
          {isAnalyzing ? (
            <motion.span
              className="font-mono text-xl font-bold text-primary"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ...
            </motion.span>
          ) : (
            <>
              <motion.span
                className={`font-mono text-2xl sm:text-3xl font-bold ${colorClass}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {percentage}%
              </motion.span>

              <span className="text-[10px] sm:text-xs tracking-widest text-muted-foreground">
                FRAUD RISK
              </span>
            </>
          )}
        </div>
      </div>

      <motion.div
        className={`px-5 py-1.5 rounded-full text-xs font-bold tracking-wider ${badgeClass}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isAnalyzing ? 0 : 1, y: isAnalyzing ? 10 : 0 }}
      >
        {label}
      </motion.div>
    </div>
  );
};