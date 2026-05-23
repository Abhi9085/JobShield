import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { Spinner } from "@/components/spinner";

interface AdminLoginProps {
  step: 1 | 2;
  setStep: (step: 1 | 2) => void;
  email: string;
  setEmail: (email: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
  isLoading: boolean;
  handleSendOtp: (e: React.FormEvent) => void;
  handleVerifyOtp: (e: React.FormEvent) => void;
}

export const AdminLogin = ({
  step, setStep, email, setEmail, otp, setOtp, isLoading, handleSendOtp, handleVerifyOtp
}: AdminLoginProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-border bg-card/80 p-10 text-center shadow-2xl backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-card">
          {step === 1 ? <Lock className="h-8 w-8 text-muted-foreground" /> : <Mail className="h-8 w-8 text-blue-400" />}
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          {step === 1 ? "Admin Access" : "Check Your Email"}
        </h2>
        <p className="text-xs text-slate-500">
           {step === 1 ? "Enter authorized email to verify identity" : `Code sent to ${email}`}
        </p>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleSendOtp} className="space-y-4">
              <input type="email" placeholder="Enter Admin Email" required className="w-full rounded-lg border border-slate-800 bg-card p-3 text-foreground focus:border-blue-500 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" disabled={isLoading} className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 font-semibold text-foreground hover:bg-blue-500 disabled:opacity-50 transition-colors">
                {isLoading ? <><Spinner className="mr-2 h-5 w-5" /> Sending...</> : "Login"}
              </button>
            </motion.form>
          ) : (
            <motion.form key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleVerifyOtp} className="space-y-4">
              <input type="text" placeholder="Enter 6-digit Code" maxLength={6} required className="w-full rounded-lg border border-slate-800 bg-card p-3 text-center text-lg tracking-widest text-foreground focus:border-blue-500 focus:outline-none" value={otp} onChange={(e) => setOtp(e.target.value)} />
              <button type="submit" disabled={isLoading} className="flex w-full items-center justify-center rounded-lg bg-emerald-600 py-3 font-semibold text-foreground hover:bg-emerald-500 disabled:opacity-50 transition-colors">
                {isLoading ? <><Spinner className="mr-2 h-5 w-5" /> Verifying...</> : "Verify Code"}
              </button>
              <button type="button" onClick={() => setStep(1)} className="text-xs text-slate-500 underline hover:text-foreground">Change Email</button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};