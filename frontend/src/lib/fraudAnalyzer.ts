
const apiUrl = import.meta.env.VITE_API_URL;
// Define the expected response from your Flask API
interface FlaskApiResponse {
  result: "Fraudulent" | "Legitimate";
  score: number;
  scan_id: number; // Make sure this matches your Python response key
  status: string;
  error?: string;
}

export interface AnalysisResult {
  fraudProbability: number;
  scanId?: number; // Optional because it might be null if API fails
  indicators: {
    id: string;
    detected: boolean;
    severity: "safe" | "warning" | "danger";
  }[];
  stats: {
    tokensProcessed: number;
    modelConfidence: number;
    processingTime: number;
    patternsDetected: number;
  };
}

// ... (Keep your RED_FLAG_PATTERNS and LEGITIMATE_PATTERNS here) ...
const RED_FLAG_PATTERNS = {
  payment: [
    /upfront (fee|payment|cost)/i,
    /pay.*before.*start/i,
    /registration fee/i,
    /investment required/i,
    /send money/i,
    /wire transfer/i,
  ],
  urgency: [
    /immediate(ly)? start/i,
    /urgent(ly)? (need|hiring|require)/i,
    /asap/i,
    /right away/i,
    /today only/i,
    /limited (time|spots)/i,
    /act now/i,
  ],
  vague: [
    /easy money/i,
    /work from home.*\$\d+.*hour/i,
    /no experience (needed|required|necessary)/i,
    /anyone can do/i,
    /simple tasks/i,
  ],
  contact: [
    /@gmail\.com/i,
    /@yahoo\.com/i,
    /@hotmail\.com/i,
    /@outlook\.com/i,
    /personal email/i,
    /whatsapp only/i,
  ],
  salary: [
    /\$\d{3,}.*per (hour|day)/i,
    /earn.*\$\d{4,}.*week/i,
    /unlimited earning/i,
    /guaranteed income/i,
  ],
};

const LEGITIMATE_PATTERNS = [
  /years of experience/i,
  /bachelor'?s? degree/i,
  /master'?s? degree/i,
  /linkedin/i,
  /benefits include/i,
  /401k|retirement/i,
  /health insurance/i,
  /pto|paid time off/i,
  /equal opportunity/i,
  /background check/i,
  /@[a-z]+\.(com|org|io|co)/i, // Company email domain
];

export const analyzeJobPost = async (text: string): Promise<AnalysisResult> => {
  const startTime = performance.now();
  const lowerText = text.toLowerCase();
  const wordCount = text.split(/\s+/).length;
  
  // 1. Perform Local Heuristic Checks
  const detectedIndicators: AnalysisResult["indicators"] = [];

  // ... (Keep your heuristic checks: payment, urgency, company, vague, contact) ...
    // Payment red flags
  const hasPaymentRisk = RED_FLAG_PATTERNS.payment.some((p) => p.test(text));
  detectedIndicators.push({ id: "payment", detected: hasPaymentRisk, severity: "danger" });

  // Urgency red flags
  const hasUrgency = RED_FLAG_PATTERNS.urgency.some((p) => p.test(text));
  detectedIndicators.push({ id: "urgency", detected: hasUrgency, severity: "warning" });

  // Missing company info
  const missingCompanyInfo = wordCount < 100 || !/@[a-z]+\.[a-z]{2,}/i.test(text);
  detectedIndicators.push({ id: "company", detected: missingCompanyInfo, severity: "warning" });

  // Vague requirements
  const hasVagueReqs = RED_FLAG_PATTERNS.vague.some((p) => p.test(text));
  detectedIndicators.push({ id: "vague", detected: hasVagueReqs, severity: "warning" });

  // Personal email
  const hasPersonalEmail = RED_FLAG_PATTERNS.contact.some((p) => p.test(text));
  detectedIndicators.push({ id: "contact", detected: hasPersonalEmail, severity: "danger" });

  const legitimateMatches = LEGITIMATE_PATTERNS.filter((p) => p.test(text)).length;

  // 2. Call the Flask API
  let modelScore = 0;
  let serverScanId: number | undefined = undefined; // <--- FIX: Define variable here

  try {
    const response = await fetch(`${apiUrl}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ combined_text: text }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data: FlaskApiResponse = await response.json();
    
    // Assign values from the API response to our variables
    modelScore = data.score * 100;
    serverScanId = data.scan_id; // Update variable here

  } catch (error) {
    console.error("Failed to connect to Flask API, falling back to heuristics:", error);
    // Fallback logic
    let fallbackScore = 0;
    if (hasPaymentRisk) fallbackScore += 35;
    if (hasUrgency) fallbackScore += 15;
    if (hasPersonalEmail) fallbackScore += 25;
    modelScore = Math.min(95, fallbackScore);
  }

  const endTime = performance.now();

  return {
    fraudProbability: parseFloat(modelScore.toFixed(2)),
    
    scanId: serverScanId, // variable defined outside try/catch
    
    indicators: detectedIndicators,
    stats: {
      tokensProcessed: Math.floor(wordCount * 1.3),
      modelConfidence: 95,
      processingTime: Math.round(endTime - startTime),
      patternsDetected: detectedIndicators.filter((i) => i.detected).length + legitimateMatches,
    },
  };
};