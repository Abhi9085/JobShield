const apiUrl = import.meta.env.VITE_API_URL;  
import { useState, useEffect, useCallback } from "react";

export interface Stats {
  total_scans: number;
  fraud_count: number;
  legit_count: number;
  flagged_count: number;
}

export interface ScanRecord {
  id: number;
  text_snippet: string;
  full_text?: string;
  score: number;
  label: string;
  date: string;
  is_flagged: boolean;
}

export const useAdmin = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [step, setStep] = useState<1 | 2>(1); // 1 = Email, 2 = OTP
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Dashboard Data State
  const [stats, setStats] = useState<Stats | null>(null);
  const [history, setHistory] = useState<ScanRecord[]>([]);

  // Date Filter State (Format: YYYY-MM-DD)
  const [selectedMonth, setSelectedMonth] = useState("");

  // 1. Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setStep(2);
      } else {
        alert(data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Backend offline or connection error");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Backend offline");
    } finally {
      setIsLoading(false);
    }
  };

  // Extract fetchData so it can be called manually
  const refreshData = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (selectedMonth) params.append("month", selectedMonth);
      const queryString = params.toString() ? `?${params.toString()}` : "";

      const statsRes = await fetch(`${apiUrl}/api/stats${queryString}`);
      const historyRes = await fetch(`${apiUrl}/api/history${queryString}`);
      
      const statsData = await statsRes.json();
      const historyData = await historyRes.json();

      // Set stats safely
      setStats(statsData);

      // SAFETY CHECK: Ensure history is an array before setting it
      if (Array.isArray(historyData)) {
        setHistory(historyData);
      } else {
        console.error("Backend error instead of history list:", historyData);
        setHistory([]); // Default to empty array to prevent .map() crash
      }
      
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
      setHistory([]); // Fallback on network failure
    }
  }, [selectedMonth]);
  // 3. Fetch Data (Auto-runs when authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated, refreshData]);

  // 4. Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setStep(1);
    setEmail("");
    setOtp("");
    setStats(null);
    setHistory([]);
    setSelectedMonth("");
  };

  // Helper to clear filters
  const clearFilters = () => {
    setSelectedMonth("");
  };

  return {
    isAuthenticated,
    step,
    setStep,
    email,
    setEmail,
    otp,
    setOtp,
    isLoading,
    stats,
    history,
    handleSendOtp,
    handleVerifyOtp,
    handleLogout,
    refreshData,
    selectedMonth,
    setSelectedMonth, 
    clearFilters
  };
};