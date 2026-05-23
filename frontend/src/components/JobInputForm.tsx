import { useState } from "react";
import { motion } from "framer-motion";
import { Search, AlertTriangle, Shield } from "lucide-react";

interface JobInputFormProps {
  // Pass just the text up to the parent/Index page
  onAnalyze: (text: string) => void;
  // Use this to show the spinner while Flask is thinking
  isAnalyzing: boolean;
}

export const JobInputForm = ({ onAnalyze, isAnalyzing }: JobInputFormProps) => {
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic client-side validation
    if (jobDescription.trim().length >= 10) {
      onAnalyze(jobDescription);
    }
  };

  const charCount = jobDescription.length;
  const isValidLength = charCount >= 50;

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex h-full flex-col"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-foreground">Job Description Analysis</h2>
          <p className="text-sm text-muted-foreground">Paste the job posting content below</p>
        </div>
      </div>

      {/* Textarea container */}
      <div className="glass-input relative flex-1 p-1 focus:ring-2 focus:ring-primary/30">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here...&#10;&#10;Example of suspicious content:&#10;• Vague job requirements&#10;• Requests for upfront payment&#10;• Too-good-to-be-true salary"
          className="h-full w-full resize-none bg-transparent p-4 font-sans text-sm sm:test-base leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
          disabled={isAnalyzing}
        />

        {/* Character count */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <span
            className={`font-mono text-xs ${
              isValidLength ? "text-risk-safe" : "text-muted-foreground"
            }`}
          >
            {charCount} chars
          </span>
          {!isValidLength && charCount > 0 && (
            <span className="text-xs text-risk-suspicious">Min 50 required</span>
          )}
        </div>
      </div>

      {/* Warning banner for short text */}
      {charCount > 0 && charCount < 100 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 flex items-center gap-2 rounded-lg border border-risk-suspicious/30 bg-risk-suspicious/10 px-4 py-2"
        >
          <AlertTriangle className="h-4 w-4 text-risk-suspicious" />
          <span className="text-xs text-risk-suspicious">
            Short descriptions often indicate fraudulent postings
          </span>
        </motion.div>
      )}

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={!isValidLength || isAnalyzing}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 sm:py-3 font-semibold text-foreground shadow-lg shadow-blue-500/25 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        whileHover={{ scale: isValidLength ? 1.02 : 1 }}
        whileTap={{ scale: isValidLength ? 0.98 : 1 }}
      >
        {isAnalyzing ? (
          <>
            <motion.div
              className="h-5 w-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Analyzing with LSTM Model...</span>
          </>
        ) : (
          <>
            <Search className="h-5 w-5 text-primary-foreground" />
            <span className="text-primary-foreground">Authenticate Job Post</span>
          </>
        )}
      </motion.button>
    </motion.form>
  );
};