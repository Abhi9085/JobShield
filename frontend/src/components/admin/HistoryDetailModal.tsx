import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert, CheckCircle, AlertTriangle, Trash2, FileText, RefreshCw, Flag, FlagOff } from "lucide-react";
import { ScanRecord } from "@/hooks/useAdmin";

interface HistoryDetailModalProps {
  record: ScanRecord | null;
  onClose: () => void;
  onUpdate: (updates: { is_flagged?: boolean; label?: string }) => void;
  onDelete: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export const HistoryDetailModal = ({ record, onClose, onUpdate, onDelete, isUpdating, isDeleting }: HistoryDetailModalProps) => {
  const [viewFullSource, setViewFullSource] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Reset text view when record changes
  useEffect(() => {
    setViewFullSource(false);
  }, [record]);

  if (!record) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm dark:bg-black/60" />
        
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/50">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Scan Analysis</h2>
              <p className="text-xs text-gray-500 dark:text-slate-400">ID: #{record.id} • {new Date(record.date).toLocaleString()}</p>
            </div>
            <button onClick={onClose} className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-slate-800 dark:hover:text-slate-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
                <p className="mb-1 text-xs font-medium uppercase text-gray-500 dark:text-slate-400">Detection Result</p>
                <div className={`inline-flex items-center gap-2 text-lg font-bold ${record.label === "Fraudulent" ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                  {record.label === "Fraudulent" ? <ShieldAlert className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                  {record.label}
                </div>
              </div>
              
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
                <p className="mb-1 text-xs font-medium uppercase text-gray-500 dark:text-slate-400">AI Confidence</p>
                <div className="text-lg font-bold text-gray-900 dark:text-slate-100">
                  {(record.score * 100).toFixed(2)}%
                </div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-slate-200">
                  {viewFullSource ? "Full Article Source" : "Job Description Snippet"}
                </p>
                <button onClick={() => setViewFullSource(!viewFullSource)} className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                  <FileText className="h-3.5 w-3.5" />
                  {viewFullSource ? "Show Snippet View" : "View Full Source"}
                </button>
              </div>
              <div className="max-h-48 overflow-y-auto whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed text-gray-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                {viewFullSource ? (record.full_text || "Full context unretrievable.") : record.text_snippet}
              </div>
            </div>

            {record.is_flagged && (
              <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-500/20 dark:bg-orange-500/10">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-orange-600 dark:text-orange-400" />
                <div>
                  <h4 className="text-sm font-semibold text-orange-800 dark:text-orange-300">Requires Attention</h4>
                  <p className="mt-1 text-xs text-orange-700 dark:text-orange-400/80">This record has been flagged for manual administrative review.</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
            <button onClick={onDelete} disabled={isDeleting || isUpdating} className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-70 dark:text-red-400 dark:hover:bg-red-500/10">
              {isDeleting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              {isDeleting ? "Deleting..." : "Delete Log"}
            </button>
            
            <div className="flex gap-3">
              <button onClick={() => onUpdate({ is_flagged: !record.is_flagged })} disabled={isUpdating} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                {isUpdating ? <RefreshCw className="h-4 w-4 animate-spin" /> : record.is_flagged ? <><FlagOff className="h-4 w-4 text-orange-500" /> Remove Flag</> : <><Flag className="h-4 w-4 text-gray-400" /> Flag for Review</>}
              </button>

              <button onClick={() => onUpdate({ label: record.label === "Fraudulent" ? "Legitimate" : "Fraudulent" })} disabled={isUpdating} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-70 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                {isUpdating ? <><RefreshCw className="h-4 w-4 animate-spin" /> Updating...</> : <>Override to {record.label === "Fraudulent" ? "Legitimate" : "Fraudulent"}</>}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};