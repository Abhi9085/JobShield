import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { useAdmin } from "@/hooks/useAdmin"; 
import { CalendarDays, XCircle } from "lucide-react"; 

// Import components
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminCharts } from "@/components/admin/AdminCharts";
import { AdminHistoryTable } from "@/components/admin/AdminHistoryTable";

// --- UNIVERSAL DATE DATA ---
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i); // e.g., 2026, 2025, 2024...
const MONTHS = [
  { val: "01", label: "Jan" }, { val: "02", label: "Feb" }, { val: "03", label: "Mar" },
  { val: "04", label: "Apr" }, { val: "05", label: "May" }, { val: "06", label: "Jun" },
  { val: "07", label: "Jul" }, { val: "08", label: "Aug" }, { val: "09", label: "Sep" },
  { val: "10", label: "Oct" }, { val: "11", label: "Nov" }, { val: "12", label: "Dec" }
];

const Admin = () => {
  const {
    isAuthenticated, step, setStep, email, setEmail, otp, setOtp, 
    isLoading, stats, history, handleSendOtp, handleVerifyOtp, handleLogout, refreshData,
    selectedMonth, setSelectedMonth, clearFilters
  } = useAdmin();

  // Split the YYYY-MM string to feed our dropdowns
  const [selYear, selMonth] = selectedMonth ? selectedMonth.split("-") : ["", ""];

  // Handle changes and combine them back into the YYYY-MM format for the backend
  const handleDateSelect = (type: "year" | "month", value: string) => {
    if (type === "year") {
      // If they pick a year first, default to Jan
      setSelectedMonth(`${value}-${selMonth || "01"}`); 
    } else {
      // If they pick a month first, default to current year
      setSelectedMonth(`${selYear || CURRENT_YEAR}-${value}`); 
    }
  };

  // UI/UX Logic: If no month is selected, only show the 10 most recent logs in the table.
  // If a month IS selected, show all logs returned by the backend for that month.
  const displayHistory = selectedMonth ? history : history.slice(0, 10);

  if (!isAuthenticated) {
    return (
      <AdminLogin 
        step={step} setStep={setStep} email={email} setEmail={setEmail} 
        otp={otp} setOtp={setOtp} isLoading={isLoading} 
        handleSendOtp={handleSendOtp} handleVerifyOtp={handleVerifyOtp} 
      />
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
      <div className="min-h-screen bg-background px-4 py-4 sm:px-6 sm:py-6 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto w-full">
          <Header />
          
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Admin Dashboard</h1>
              <p className="text-muted-foreground">System overview and threat monitoring</p>
            </div>
            
            <div className="flex items-center gap-3">
              
              {/* --- UNIVERSAL MONTH FILTER BAR --- */}
              <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <CalendarDays className="mr-1 h-4 w-4 text-gray-500 dark:text-slate-400" />
                
                {/* Month Dropdown */}
                <select 
                  value={selMonth}
                  onChange={(e) => handleDateSelect("month", e.target.value)}
                  className="cursor-pointer appearance-none bg-transparent text-sm font-medium text-gray-700 outline-none transition-colors hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400"
                >
                  <option value="" disabled className="dark:bg-slate-900">Month</option>
                  {MONTHS.map(m => <option key={m.val} value={m.val} className="dark:bg-slate-900">{m.label}</option>)}
                </select>

                <span className="text-gray-300 dark:text-slate-600">/</span>

                {/* Year Dropdown */}
                <select 
                  value={selYear}
                  onChange={(e) => handleDateSelect("year", e.target.value)}
                  className="cursor-pointer appearance-none bg-transparent text-sm font-medium text-gray-700 outline-none transition-colors hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400"
                >
                  <option value="" disabled className="dark:bg-slate-900">Year</option>
                  {YEARS.map(y => <option key={y} value={y} className="dark:bg-slate-900">{y}</option>)}
                </select>

                {/* Clear Button */}
                {selectedMonth && (
                  <button 
                    onClick={clearFilters}
                    className="ml-2 rounded-full p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                    title="Clear filter"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <button onClick={handleLogout} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
                Logout
              </button>
            </div>
          </div>

          {stats && <AdminStats stats={stats} />}
          
          {stats && history.length > 0 && (
            <AdminCharts stats={stats} history={history} />
          )}

          {/* Pass the sliced displayHistory instead of the raw history */}
          <AdminHistoryTable history={displayHistory} onRefresh={refreshData}/>
          
        </div>
      </div>
    </motion.div>
  );
};

export default Admin;