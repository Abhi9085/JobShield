import { motion } from "framer-motion";
import { 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  Clock, 
  Building2, 
  FileText, 
  Mail 
} from "lucide-react";

interface RiskIndicator {
  id: string;
  label: string;
  detected: boolean;
  severity: "safe" | "warning" | "danger";
  icon: React.ReactNode;
}

interface RiskIndicatorsProps {
  indicators: RiskIndicator[];
  isVisible: boolean;
}

export const RiskIndicators = ({ indicators, isVisible }: RiskIndicatorsProps) => {
  const getSeverityStyles = (severity: string, detected: boolean) => {
    if (!detected) {
      return `
        border border-emerald-300/60
        bg-emerald-50
        text-emerald-700

        shadow-sm

        dark:border-risk-safe/30
        dark:bg-risk-safe/5
        dark:text-risk-safe
      `;
    }
    switch (severity) {
      case "danger":
        return `
          border border-rose-300/60
          bg-rose-50
          text-rose-700
            
          shadow-sm
            
          dark:border-risk-critical/30
          dark:bg-risk-critical/10
          dark:text-risk-critical
        `;
      case "warning":
        return `
          border border-amber-300/60
          bg-amber-50
          text-amber-700
            
          shadow-sm
            
          dark:border-risk-suspicious/30
          dark:bg-risk-suspicious/10
          dark:text-risk-suspicious
        `;
      default:
        return "border-risk-safe/30 bg-risk-safe/5 text-risk-safe";
    }
  };

  const getStatusIcon = (detected: boolean, severity: string) => {
    if (!detected) {
      return <CheckCircle className="h-4 w-4 text-risk-safe" />;
    }
    if (severity === "danger") {
      return <XCircle className="h-4 w-4 text-risk-critical" />;
    }
    return <AlertCircle className="h-4 w-4 text-risk-suspicious" />;
  };

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground">
        <FileText className="h-4 w-4" />
        RISK INDICATORS
      </h3>
      
      <div className="grid gap-2">
        {indicators.map((indicator, index) => (
          <motion.div
            key={indicator.id}
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className={`flex items-center justify-between rounded-lg border px-3 py-2 ${getSeverityStyles(
              indicator.severity,
              indicator.detected
            )}`}
          >
            <div className="flex items-center gap-2">
              <span className="opacity-60">{indicator.icon}</span>
              <span className="text-xs sm:text-sm font-medium">{indicator.label}</span>
            </div>
            {getStatusIcon(indicator.detected, indicator.severity)}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const getDefaultIndicators = (): RiskIndicator[] => [
  {
    id: "payment",
    label: "Upfront Payment Request",
    detected: false,
    severity: "danger",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    id: "urgency",
    label: "Urgency Language",
    detected: false,
    severity: "warning",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: "company",
    label: "Missing Company Info",
    detected: false,
    severity: "warning",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    id: "vague",
    label: "Vague Requirements",
    detected: false,
    severity: "warning",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "contact",
    label: "Personal Email Only",
    detected: false,
    severity: "danger",
    icon: <Mail className="h-4 w-4" />,
  },
];
