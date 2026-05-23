import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Sector } from "recharts";
import { Stats, ScanRecord } from "@/hooks/useAdmin"; 

// --- Custom Active Shape (Glow & Expand) ---
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  return (
    <g>
      <text x={cx} y={cy - 12} dy={8} textAnchor="middle" fill="#94a3b8" className="text-xs font-semibold uppercase tracking-wider">{payload.name}</text>
      <text x={cx} y={cy + 14} dy={8} textAnchor="middle" fill={fill} className="text-3xl font-bold">{value} <tspan fill="#64748b" className="text-sm font-medium">({(percent * 100).toFixed(1)}%)</tspan></text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={0} endAngle={360} fill="#1e293b" opacity={0.3} />
      <Sector cx={cx} cy={cy} innerRadius={innerRadius - 2} outerRadius={outerRadius + 8} startAngle={startAngle} endAngle={endAngle} fill={fill} style={{ filter: `drop-shadow(0px 0px 12px ${fill}60)`, transition: "all 0.3s ease-in-out" }} />
    </g>
  );
};

// --- Custom Tooltip for Bar Chart ---
const ConfidenceTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900/95 p-3 shadow-xl backdrop-blur-md">
        <p className="mb-1 text-xs font-semibold text-slate-400">Scan ID: {label}</p>
        <p className="text-sm text-slate-200">Result: <span className={data.label === "Fraudulent" ? "text-red-400" : "text-emerald-400"}>{data.label}</span></p>
        <p className="text-lg font-bold" style={{ color: data.fill }}>{payload[0].value.toFixed(1)}% <span className="text-xs font-normal text-slate-400">confidence</span></p>
      </div>
    );
  }
  return null;
};

export const AdminCharts = ({ stats, history }: { stats: Stats; history: ScanRecord[] }) => {
  // FIX 1: Initialize to -1 so no slice is active by default
  const [activePieIndex, setActivePieIndex] = useState<number>(-1);
  
  const onPieEnter = (_: any, index: number) => setActivePieIndex(index);
  
  // FIX 2: Reset the index to -1 when the mouse leaves the chart area
  const onPieLeave = () => setActivePieIndex(-1);

  const confidenceData = history.slice(0, 15).reverse().map((h) => {
    const scorePct = h.score * 100;
    return {
      id: `#${h.id}`, score: scorePct, label: h.label,
      fill: scorePct >= 80 ? "#10b981" : scorePct >= 50 ? "#eab308" : "#ef4444"
    };
  });

  return (
    <div className="my-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col items-center justify-center rounded-xl border border-border bg-card/80 p-6 shadow-lg lg:col-span-1 min-h-[340px]">
        <h3 className="mb-2 w-full text-left text-sm font-semibold text-muted-foreground">Scan Distribution</h3>
        <div className="h-full w-full flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                activeIndex={activePieIndex} 
                activeShape={renderActiveShape} 
                onMouseEnter={onPieEnter} 
                onMouseLeave={onPieLeave} // <-- ADDED HERE
                data={[{ name: "Legitimate", value: stats.legit_count, fill: "#10b981" }, { name: "Fraudulent", value: stats.fraud_count, fill: "#ef4444" }]} 
                cx="50%" 
                cy="50%" 
                innerRadius={70} 
                outerRadius={90} 
                paddingAngle={5} 
                dataKey="value" 
                stroke="none" 
                animationBegin={200} 
                animationDuration={1200} 
                animationEasing="ease-out"
              >
                {[0, 1].map((entry, index) => <Cell key={`cell-${index}`} className="cursor-pointer outline-none" />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col rounded-xl border border-border bg-card/80 p-6 shadow-lg lg:col-span-2 min-h-[340px]">
         <h3 className="mb-1 text-sm font-semibold text-muted-foreground">Model Confidence History</h3>
         <p className="mb-6 text-xs text-slate-500">Prediction certainty tracking for the last {confidenceData.length} scans.</p>
         <div className="h-full w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={confidenceData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                <XAxis dataKey="id" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dx={-10} tickFormatter={(val) => `${val}%`} />
                <RechartsTooltip content={<ConfidenceTooltip />} cursor={{ fill: '#334155', opacity: 0.2 }} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]} maxBarSize={40} animationDuration={1500}>
                  {confidenceData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity duration-200 cursor-pointer" />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
         </div>
      </motion.div>
    </div>
  );
};