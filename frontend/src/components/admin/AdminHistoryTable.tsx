import { useState } from "react";
import { motion } from "framer-motion";
import { ScanRecord } from "@/hooks/useAdmin";
import { HistoryTableList } from "./HistoryTableList"; // Adjust paths if necessary
import { HistoryDetailModal } from "./HistoryDetailModal"; // Adjust paths if necessary

interface AdminHistoryTableProps {
  history: ScanRecord[];
  onRefresh: () => void;
}

export const AdminHistoryTable = ({ history, onRefresh }: AdminHistoryTableProps) => {
  const [selectedRecord, setSelectedRecord] = useState<ScanRecord | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- API Handlers ---
  const updateRecord = async (updates: { is_flagged?: boolean; label?: string }) => {
    if (!selectedRecord) return;
    setIsUpdating(true);
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/admin/scans/${selectedRecord.id}/override`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (!response.ok) throw new Error('Network error during update request');

      setSelectedRecord(prev => prev ? { ...prev, ...updates } : null);
      onRefresh();
    } catch (error) {
      console.error("Error updating result:", error);
      alert("Failed to modify database records.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRecord) return;
    if (!window.confirm("Are you sure you want to delete this log? This cannot be undone.")) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/admin/scans/${selectedRecord.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Network error during delete request');

      onRefresh();
      setSelectedRecord(null); // Close modal on success
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete the record from the database.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2, duration: 0.4 }} 
        className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/50 dark:shadow-lg"
      >
        <HistoryTableList 
          history={history} 
          onSelectRecord={(record) => setSelectedRecord(record)} 
        />
      </motion.div>

      <HistoryDetailModal 
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        onUpdate={updateRecord}
        onDelete={handleDelete}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
      />
    </>
  );
};