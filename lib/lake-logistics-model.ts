export const LAKE_RESOURCE_KEYS = ["timber","iron","guns","canvas","skilled labor","sailors","food","transport"] as const;
export type LakeResource = typeof LAKE_RESOURCE_KEYS[number];
export type LakeAllocation = Record<LakeResource, number>;

export type LakeBaseFactors = {
  timber: number;
  iron: number;
  labor: number;
  transport: number;
  threat: number;
  season: number;
};

export const LAKE_ALLOCATION_BUDGET = 480;
export const DEFAULT_LAKE_ALLOCATION: LakeAllocation = {
  timber: 58,
  iron: 58,
  guns: 63,
  canvas: 67,
  "skilled labor": 52,
  sailors: 54,
  food: 64,
  transport: 64,
};

const MONTH_WORK_WINDOWS = [0, .28, .34, .48, .68, .9, 1, .98, .92, .78, .56, .36, .28] as const;

export type LakeEvaluation = {
  valid: boolean;
  reason?: "budget" | "range" | "month";
  totalAllocation: number;
  overBudget: number;
  seasonFactor: number;
  scores: Record<LakeResource, number>;
  bottleneck: { key: LakeResource; score: number } | null;
  readiness: number;
  hulls: number;
  sustainIndex: number;
  sustainedVessels: number;
};

const emptyScores = (): Record<LakeResource, number> => Object.fromEntries(
  LAKE_RESOURCE_KEYS.map((key) => [key, 0]),
) as Record<LakeResource, number>;

const geometricMean = (values: number[]) => {
  if (values.some((value) => value <= 0)) return 0;
  return Math.pow(values.reduce((product, value) => product * value, 1), 1 / values.length);
};

export function evaluateLakeLogistics(allocation: LakeAllocation, base: LakeBaseFactors, month: number): LakeEvaluation {
  const totalAllocation = LAKE_RESOURCE_KEYS.reduce((sum, key) => sum + allocation[key], 0);
  const overBudget = Math.max(0, totalAllocation - LAKE_ALLOCATION_BUDGET);
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return { valid:false, reason:"month", totalAllocation, overBudget, seasonFactor:0, scores:emptyScores(), bottleneck:null, readiness:0, hulls:0, sustainIndex:0, sustainedVessels:0 };
  }
  if (LAKE_RESOURCE_KEYS.some((key) => !Number.isFinite(allocation[key]) || allocation[key] < 0 || allocation[key] > 100)) {
    return { valid:false, reason:"range", totalAllocation, overBudget, seasonFactor:0, scores:emptyScores(), bottleneck:null, readiness:0, hulls:0, sustainIndex:0, sustainedVessels:0 };
  }
  if (overBudget > 0) {
    return { valid:false, reason:"budget", totalAllocation, overBudget, seasonFactor:0, scores:emptyScores(), bottleneck:null, readiness:0, hulls:0, sustainIndex:0, sustainedVessels:0 };
  }

  const seasonFactor = MONTH_WORK_WINDOWS[month] * base.season;
  const weights: Record<LakeResource, number> = {
    timber: base.timber,
    iron: base.iron,
    guns: base.iron * .92,
    canvas: base.transport * .95,
    "skilled labor": base.labor,
    sailors: base.labor * .92,
    food: base.transport,
    transport: base.transport,
  };

  const scores = Object.fromEntries(LAKE_RESOURCE_KEYS.map((key) => {
    const seasonalAdjustment = key === "timber" || key === "skilled labor" ? .85 + seasonFactor * .15 : 1;
    const score = Math.round(allocation[key] * weights[key] * seasonalAdjustment);
    return [key, Math.max(0, Math.min(100, score))];
  })) as Record<LakeResource, number>;

  const bottleneck = LAKE_RESOURCE_KEYS
    .map((key) => ({ key, score:scores[key] }))
    .sort((a,b) => a.score - b.score)[0];

  const readiness = Math.max(0, Math.min(100, Math.round(
    geometricMean(LAKE_RESOURCE_KEYS.map((key) => scores[key])) * (.62 + seasonFactor * .38),
  )));

  // Launching a hull requires enough overall capacity and a season in which yard work can proceed.
  // This is a teaching threshold, not a historical vessel count.
  const hulls = seasonFactor >= .30 && readiness >= 34
    ? 1 + Math.max(0, Math.floor((readiness - 34) / 18))
    : 0;

  // Sustaining vessels must improve when the weakest true resource improves, never the reverse.
  // The bottleneck caps the readiness available for operations; local threat can only reduce it.
  const threatPressure = Math.max(.85, 1 - Math.max(0, base.threat - .7) * .25);
  const sustainIndex = Math.max(0, Math.min(100, Math.round(
    Math.min(readiness, bottleneck.score * 1.05) * threatPressure,
  )));
  const sustainableCapacity = seasonFactor >= .40 && sustainIndex >= 34
    ? 1 + Math.max(0, Math.floor((sustainIndex - 34) / 18))
    : 0;
  const sustainedVessels = Math.min(hulls, sustainableCapacity);

  return {
    valid:true,
    totalAllocation,
    overBudget,
    seasonFactor,
    scores,
    bottleneck,
    readiness,
    hulls,
    sustainIndex,
    sustainedVessels,
  };
}
