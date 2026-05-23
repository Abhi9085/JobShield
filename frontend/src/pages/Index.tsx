import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { JobInputForm } from "@/components/JobInputForm";
import { RiskMeter } from "@/components/RiskMeter";
import { RiskIndicators, getDefaultIndicators } from "@/components/RiskIndicators";
import { AnalyticsPanel } from "@/components/AnalyticsPanel";
import { analyzeJobPost } from "@/lib/fraudAnalyzer";
import { toast } from "sonner";
import { AnalysisSkeleton } from "@/components/AnalysisSkeleton";
import { EmptyStatePreview } from "@/components/EmptyStatePreview";
const apiUrl = import.meta.env.VITE_API_URL;

const Index = () => {
  const [currentScanId, setCurrentScanId] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [fraudProbability, setFraudProbability] = useState(0);
  const [indicators, setIndicators] = useState(getDefaultIndicators());
  const [stats, setStats] = useState({
    tokensProcessed: 0,
    modelConfidence: 0,
    processingTime: 0,
    patternsDetected: 0,
  });

  const handleFlag = async () => {
    if (!currentScanId) return;
    try {
      await fetch(`${apiUrl}/api/flag/${currentScanId}`, { method: "POST" });
      toast.info("Feedback Received", {
        description: "Thanks for flagging this. Our team will review it.",
      });
    } catch (e) {
      toast.error("Error", { description: "Could not submit feedback." });
    }
  };

  const handleAnalyze = async (text: string) => {
    setIsAnalyzing(true);
    setHasResults(false);
    
    try {
      const result = await analyzeJobPost(text);
      
      setCurrentScanId(result.scanId || null);
      // Update state with results
      setFraudProbability(result.fraudProbability);
      setStats(result.stats);
      
      // Map indicators
      const updatedIndicators = indicators.map((ind) => {
        const resultInd = result.indicators.find((r) => r.id === ind.id);
        return resultInd
          ? { ...ind, detected: resultInd.detected, severity: resultInd.severity }
          : ind;
      });
      setIndicators(updatedIndicators);
      setHasResults(true);

      // Show toast based on result
      if (result.fraudProbability <= 30) {
        toast.success("Analysis Complete", {
          description: "This job posting appears to be legitimate.",
        });
      } else if (result.fraudProbability <= 65) {
        toast.warning("Analysis Complete", {
          description: "Some suspicious patterns detected. Review carefully.",
        });
      } else {
        toast.error("Analysis Complete", {
          description: "High fraud risk detected. Exercise extreme caution.",
        });
      }
    } catch (error) {
      toast.error("Analysis Failed", {
        description: "Unable to process the job description. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 transition-colors duration-500 dark:bg-slate-950">
        
        {/* ===================================================================
            BACKGROUND BLOBS (The secret to making glassmorphism look amazing)
            =================================================================== */}
        <div className="pointer-events-none absolute -left-[10%] -top-[10%] h-[600px] w-[600px] rounded-full bg-cyan-200/40 blur-[120px] dark:bg-cyan-900/20" />
        <div className="pointer-events-none absolute -right-[5%] top-[20%] h-[700px] w-[700px] rounded-full bg-purple-200/40 blur-[150px] dark:bg-purple-900/20" />
        <div className="pointer-events-none absolute bottom-[-10%] left-[20%] h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-[120px] dark:bg-blue-900/20" />

        {/* Main Content Wrapper (z-10 ensures it sits on top of blobs) */}
        <div className="relative z-10 w-full px-4 py-6 md:px-6 xl:px-8">  
          <Header />

          {/* Main content - Split screen layout */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left panel - Input */}
            <motion.div
              className="
                rounded-3xl p-6
                border border-white/50 bg-white/30 shadow-[0_8px_32px_rgba(148,163,184,0.1)] backdrop-blur-xl
                dark:border-white/5 dark:bg-slate-900/40 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
              "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <JobInputForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            </motion.div>

            {/* Right panel - Results */}
            <motion.div
              className="
                flex flex-col gap-6 rounded-3xl p-6
                border border-white/50 bg-white/30 shadow-[0_8px_32px_rgba(148,163,184,0.1)] backdrop-blur-xl
                dark:border-white/5 dark:bg-slate-900/40 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
              "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Risk Meter */}
              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1"
                  >
                    <AnalysisSkeleton />

                    {/* Loading Text */}
                    <div className="mt-6 flex flex-col items-center">
                      <div className="flex items-center gap-2">
                        {[0, 1, 2].map((dot) => (
                          <motion.div
                            key={dot}
                            className="h-2 w-2 rounded-full bg-primary"
                            animate={{
                              opacity: [0.3, 1, 0.3],
                              scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: dot * 0.2,
                            }}
                          />
                        ))}
                      </div>

                      <motion.p
                        className="mt-4 text-center text-xs text-muted-foreground sm:text-sm"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Scanning linguistic patterns, semantic anomalies
                        and fraud indicators...
                      </motion.p>
                    </div>
                  </motion.div>
                ) : hasResults ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Risk Meter */}
                    <div className="flex flex-col items-center justify-center pb-4 pt-2">
                      <RiskMeter percentage={fraudProbability} />

                      <div className="mt-4 flex justify-center">
                        <button
                          onClick={handleFlag}
                          className="text-xs text-muted-foreground transition-colors hover:text-red-400 underline decoration-dotted"
                        >
                          Report Incorrect Result
                        </button>
                      </div>
                    </div>

                    {/* Glass Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300/50 to-transparent dark:via-slate-700/50" />

                    {/* Analytics */}
                    <div className="space-y-6">
                      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                        <RiskIndicators
                          indicators={indicators}
                          isVisible={hasResults}
                        />

                        <AnalyticsPanel
                          isVisible={hasResults}
                          stats={stats}
                          compact
                        />
                      </div>

                      <AnalyticsPanel
                        isVisible={hasResults}
                        stats={stats}
                        chartOnly
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1"
                  >
                    <EmptyStatePreview />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Footer info */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 px-2 text-center sm:mt-8"
          >
            <p className="text-[10px] leading-relaxed text-slate-500 sm:text-xs dark:text-slate-400">
              Powered by LSTM Neural Network • EDA-Optimized Pattern Recognition •{" "}
              <span className="font-bold text-primary">98.2% Accuracy</span> on test dataset
            </p>
          </motion.footer>
        </div>
      </div>
    </motion.div>
  );
};

export default Index;