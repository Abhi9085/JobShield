import { motion } from "framer-motion";
import { BarChart as BarChartIcon, CheckCircle, Flag, XCircle } from "lucide-react";
import { Stats } from "@/hooks/useAdmin"; // Adjust path if your interface is elsewhere

export const AdminStats = ({ stats }: { stats: Stats }) => {
  return (
    // Updated Grid: 1 col on mobile, 2 cols on tablet, 4 cols on large screens
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      
      {/* 1. Total Scans */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="rounded-xl border border-border bg-card/80 p-4 shadow-lg transition-colors hover:border-blue-500/50 sm:p-6"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-blue-500/10 p-3">
            <BarChartIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Scans</p>
            <p className="text-2xl font-bold text-foreground">{stats.total_scans}</p>
          </div>
        </div>
      </motion.div>

      {/* 2. Legitimate Jobs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.1 }} 
        className="rounded-xl border border-border bg-card/80 p-4 shadow-lg transition-colors hover:border-emerald-500/50 sm:p-6"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-emerald-500/10 p-3">
            <CheckCircle className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Legitimate Jobs</p>
            <p className="text-2xl font-bold text-foreground">{stats.legit_count}</p>
          </div>
        </div>
      </motion.div>

      {/* 3. Fraud Detected */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }} 
        className="rounded-xl border border-border bg-card/80 p-4 shadow-lg transition-colors hover:border-red-500/50 sm:p-6"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-red-500/10 p-3">
            <XCircle className="h-6 w-6 text-red-500 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Fraud Detected</p>
            <p className="text-2xl font-bold text-foreground">{stats.fraud_count}</p>
          </div>
        </div>
      </motion.div>

      {/* 4. Requires Review */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-border bg-card/80 p-4 shadow-lg transition-colors hover:border-orange-500/50 sm:p-6"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-orange-500/10 p-3">
            <Flag className="h-6 w-6 text-orange-500 dark:text-orange-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Requires Review</p>
            <p className="text-2xl font-bold text-foreground">{stats.flagged_count}</p>
          </div>
        </div>
      </motion.div>

    </div>
  );
};