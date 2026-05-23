import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import {
  ShieldCheck,
  Sparkles,
  Lock,
  Moon,
  Sun,
  Menu,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-8"
    >
      <div className="flex items-start justify-between gap-4 xl:items-center">
        
        {/* LEFT SIDE - LOGO */}
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-3 sm:gap-4"
        >
          <motion.div
            className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 shadow-lg shadow-cyan-500/20"
            whileHover={{
              scale: 1.08,
              rotate: 6,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
            }}
          >
            <ShieldCheck className="h-7 w-7 text-white" />

            <motion.div
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 shadow-md shadow-emerald-400/40"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Sparkles className="h-3 w-3 text-slate-900" />
            </motion.div>
          </motion.div>

          <div className="min-w-0">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-800 transition-colors group-hover:text-blue-500 sm:text-2xl dark:text-slate-100 dark:group-hover:text-blue-400">
              <span className="text-blue-600 dark:text-blue-400 drop-shadow-sm">
                JobShield{" "}
              </span>
              : Job Post Authenticator
            </h1>

            <p className="text-xs font-medium text-slate-500 sm:text-sm dark:text-slate-400">
              AI-Powered Employment Fraud Detection
            </p>
          </div>
        </Link>

        {/* RIGHT SIDE - CONTROLS */}
        <div className="flex shrink-0 items-center gap-2">

          {/* MOBILE DRAWER */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="
                  flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all
                  border border-white/60 bg-white/40 backdrop-blur-md shadow-sm
                  hover:bg-white/60
                  dark:border-white/10 dark:bg-slate-900/40 dark:hover:bg-slate-800/60
                  lg:hidden
                "
              >
                <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="border-white/20 bg-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/80"
            >
              <div className="mt-8 flex flex-col gap-4 px-1">
                <Link
                  to="/admin"
                  className="flex items-center justify-center rounded-xl border border-white/60 bg-white/50 px-4 py-3 text-sm font-medium shadow-sm dark:border-white/10 dark:bg-slate-900/50"
                >
                  Admin Dashboard
                </Link>

                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center rounded-xl border border-white/60 bg-white/50 px-4 py-3 text-sm font-medium shadow-sm dark:border-white/10 dark:bg-slate-900/50"
                >
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4 text-yellow-400" />
                    ) : (
                      <Moon className="h-4 w-4 text-slate-700" />
                    )}
                    <span>
                      Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                    </span>
                  </div>
                </button>

                <div className="rounded-xl border border-white/60 bg-white/50 p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/50">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      LSTM Model Active
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                    Version 2.1.0
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* THEME TOGGLE (DESKTOP) */}
          <button
            onClick={toggleTheme}
            className="
              hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all
              border border-white/60 bg-white/40 backdrop-blur-md shadow-sm
              hover:bg-white/70 hover:scale-105 hover:shadow-md
              dark:border-white/10 dark:bg-slate-900/40 dark:hover:bg-slate-800/60
              lg:flex
            "
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400 drop-shadow-sm" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600" />
            )}
          </button>

          {/* ADMIN BUTTON (DESKTOP) */}
          {!isAdminPage && (
            <Link
              to="/admin"
              className="
                hidden shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all
                border border-white/60 bg-white/40 backdrop-blur-md shadow-sm text-slate-600
                hover:bg-white/70 hover:text-slate-900 hover:shadow-md
                dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white
                md:flex
              "
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Admin</span>
            </Link>
          )}

          {/* STATUS BADGE (DESKTOP) */}
          <div className="
            hidden shrink-0 items-center gap-2 rounded-full px-2 py-1.5 sm:gap-3 sm:px-4 sm:py-2 lg:flex
            border border-white/60 bg-white/40 backdrop-blur-md shadow-sm
            dark:border-white/10 dark:bg-slate-900/40
          ">
            <div className="flex items-center gap-2">
              <motion.div
                className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="hidden text-xs font-semibold text-slate-600 sm:inline dark:text-slate-300">
                LSTM Active
              </span>
            </div>

            <div className="hidden h-4 w-px bg-slate-300 sm:block dark:bg-slate-700" />

            <span className="font-mono text-[10px] font-bold text-blue-600 sm:text-xs dark:text-blue-400">
              v2.1.0
            </span>
          </div>
        </div>
      </div>

      {/* SUBTITLE BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        className="
          mt-6 rounded-2xl px-5 py-3.5 text-center shadow-[0_4px_20px_rgba(148,163,184,0.05)]
          border border-white/50 bg-white/30 backdrop-blur-xl
          dark:border-white/5 dark:bg-slate-900/40 dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
        "
      >
        <p className="text-xs text-slate-600 sm:text-sm dark:text-slate-400">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            Trained on 20,000+ job postings
          </span>
          {" "}— Identifies linguistic patterns, keyword clusters, and structural anomalies to detect fraudulent employment offers.
        </p>
      </motion.div>
    </motion.header>
  );
};