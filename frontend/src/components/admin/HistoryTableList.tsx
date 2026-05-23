import { List, ShieldAlert, CheckCircle } from "lucide-react";
import { ScanRecord } from "@/hooks/useAdmin";

interface HistoryTableListProps {
  history: ScanRecord[];
  onSelectRecord: (record: ScanRecord) => void;
}

export const HistoryTableList = ({ history, onSelectRecord }: HistoryTableListProps) => {
  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/50">
        <div className="flex items-center gap-2">
          <List className="h-5 w-5 text-gray-500 dark:text-slate-400" />
          <h3 className="font-semibold text-gray-900 dark:text-slate-100">Recent Activity Log</h3>
        </div>
        <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-600 dark:bg-slate-800 dark:text-slate-300">
          {Array.isArray(history) ? history.length : 0} Records
        </span>
      </div>
      
      <div className="w-full">
        <div className="max-h-[500px] w-full overflow-auto">
          <table className="min-w-[800px] w-full text-left text-xs sm:text-sm">
            <thead className="sticky top-0 z-10 bg-gray-100 text-xs uppercase tracking-wider text-gray-500 shadow-sm outline outline-1 outline-gray-200 dark:bg-slate-900 dark:text-slate-400 dark:outline-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Result</th>
                <th className="px-6 py-4 font-medium">Confidence</th>
                <th className="px-6 py-4 font-medium">Job Snippet</th>
                <th className="px-6 py-4 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-800/60">
              {Array.isArray(history) && history.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => onSelectRecord(item)}
                  className={`group cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/50 ${
                    item.is_flagged ? "bg-orange-50 dark:bg-orange-500/5" : ""
                  }`}
                >
                  <td className="px-6 py-4 font-mono text-xs text-gray-700 dark:text-slate-300">
                      #{item.id}
                      {item.is_flagged && (
                        <span className="ml-2 inline-flex items-center rounded-full border border-orange-200 bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/20 dark:text-orange-400">
                          FLAGGED
                        </span>
                      )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                      item.label === "Fraudulent" 
                        ? "border-red-200 bg-red-100 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400" 
                        : "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                    }`}>
                      {item.label === "Fraudulent" ? <ShieldAlert className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                      {item.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-slate-100">
                    {(item.score * 100).toFixed(1)}%
                  </td>
                  <td className="max-w-md truncate px-6 py-4 text-gray-600 group-hover:text-gray-900 transition-colors dark:text-slate-400 dark:group-hover:text-slate-200">
                    {item.text_snippet}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 dark:text-slate-500">
                    {new Date(item.date).toLocaleString()}
                  </td>
                </tr>
              ))}
              {(!Array.isArray(history) || history.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-slate-500">
                    No scans recorded for this period.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};