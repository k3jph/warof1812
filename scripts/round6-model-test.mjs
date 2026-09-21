import {
  DEFAULT_LAKE_ALLOCATION,
  LAKE_ALLOCATION_BUDGET,
  LAKE_RESOURCE_KEYS,
  evaluateLakeLogistics,
} from "../lib/lake-logistics-model.ts";
import { lakeBases } from "../lib/interactive-history.ts";

const assert = (condition, message) => { if (!condition) throw new Error(message); };
const base = (id) => {
  const found = lakeBases.find((item) => item.id === id);
  if (!found) throw new Error("Missing lake base " + id);
  return found;
};
const allocation = (value) => Object.fromEntries(LAKE_RESOURCE_KEYS.map((key) => [key, value]));

const zero = allocation(0);
const zeroResult = evaluateLakeLogistics(zero, base("kingston"), 6);
assert(zeroResult.valid, "Zero allocation should be a valid, failing state");
assert(zeroResult.readiness === 0 && zeroResult.hulls === 0 && zeroResult.sustainedVessels === 0, "Zero allocation produced capacity");

const balanced = allocation(60);
const balancedResult = evaluateLakeLogistics(balanced, base("kingston"), 6);
assert(balancedResult.totalAllocation === LAKE_ALLOCATION_BUDGET, "Balanced allocation should exactly meet budget");
assert(balancedResult.valid, "Balanced allocation should be valid");
assert(balancedResult.hulls >= 1 && balancedResult.sustainedVessels >= 1, "Balanced valid allocation should demonstrate a sustainable vessel");

const unbalanced = Object.fromEntries(LAKE_RESOURCE_KEYS.map((key) => [key, 67]));
unbalanced.transport = 11;
const unbalancedResult = evaluateLakeLogistics(unbalanced, base("kingston"), 6);
assert(unbalancedResult.totalAllocation === LAKE_ALLOCATION_BUDGET, "Unbalanced test must remain on budget");
assert(unbalancedResult.valid, "Strongly unbalanced allocation should still be valid");
assert(unbalancedResult.sustainedVessels === 0, "Strong bottleneck should be able to produce failure");

const exactBudgetResult = evaluateLakeLogistics(DEFAULT_LAKE_ALLOCATION, base("kingston"), 6);
assert(exactBudgetResult.totalAllocation === LAKE_ALLOCATION_BUDGET && exactBudgetResult.valid, "Default allocation must remain valid and on budget");

const overBudget = { ...DEFAULT_LAKE_ALLOCATION, timber:DEFAULT_LAKE_ALLOCATION.timber + 1 };
const overBudgetResult = evaluateLakeLogistics(overBudget, base("kingston"), 6);
assert(!overBudgetResult.valid && overBudgetResult.reason === "budget", "Above-budget state must be rejected");
assert(overBudgetResult.hulls === 0 && overBudgetResult.sustainedVessels === 0, "Rejected budget state must not report success");

const bottleneckLow = allocation(55);
bottleneckLow.canvas = 35;
const bottleneckMid = { ...bottleneckLow, canvas:55 };
const bottleneckHigh = { ...bottleneckLow, canvas:65 };
const lowResult = evaluateLakeLogistics(bottleneckLow, base("kingston"), 6);
const midResult = evaluateLakeLogistics(bottleneckMid, base("kingston"), 6);
const highResult = evaluateLakeLogistics(bottleneckHigh, base("kingston"), 6);
assert(lowResult.sustainIndex <= midResult.sustainIndex, "Improving the true bottleneck reduced sustainment");
assert(lowResult.sustainedVessels <= midResult.sustainedVessels, "Improving the true bottleneck reduced sustainable vessels");
assert(midResult.sustainIndex <= highResult.sustainIndex, "Further bottleneck relief reduced sustainment");
assert(midResult.sustainedVessels <= highResult.sustainedVessels, "Further bottleneck relief reduced sustainable vessels");

const winter = evaluateLakeLogistics(balanced, base("kingston"), 1);
const summer = evaluateLakeLogistics(balanced, base("kingston"), 6);
assert(winter.readiness < summer.readiness, "Seasonal model does not distinguish winter from summer");
assert(winter.sustainedVessels === 0 && summer.sustainedVessels >= 1, "Seasonal gate does not affect sustainment");

const erieFocused = {
  timber:39, iron:73, guns:57, canvas:63, "skilled labor":57, sailors:50, food:67, transport:70,
};
const erieResult = evaluateLakeLogistics(erieFocused, base("erie"), 6);
assert(erieResult.totalAllocation <= LAKE_ALLOCATION_BUDGET && erieResult.sustainedVessels >= 1, "A valid Erie allocation should be able to sustain a vessel");

let validStates = 0;
let failureStates = 0;
let sustainableStates = 0;
let maxSustained = 0;
const matrix = [
  zero,
  balanced,
  unbalanced,
  DEFAULT_LAKE_ALLOCATION,
  erieFocused,
  allocation(40),
  allocation(50),
  allocation(55),
];
for (const yard of lakeBases) {
  for (const month of [1,3,4,6,9,11]) {
    for (const values of matrix) {
      const result = evaluateLakeLogistics(values, yard, month);
      if (!result.valid) continue;
      validStates += 1;
      if (result.sustainedVessels === 0) failureStates += 1;
      if (result.sustainedVessels >= 1) sustainableStates += 1;
      maxSustained = Math.max(maxSustained, result.sustainedVessels);
      assert(result.readiness >= 0 && result.readiness <= 100, "Readiness escaped 0–100");
      assert(result.sustainIndex >= 0 && result.sustainIndex <= 100, "Sustainment index escaped 0–100");
      assert(result.hulls >= 0 && result.sustainedVessels >= 0, "Negative model output");
      assert(result.sustainedVessels <= result.hulls, "Sustained vessels exceed launched hulls");
    }
  }
}
assert(validStates > 100, "Representative matrix is unexpectedly small");
assert(failureStates > 0, "Representative matrix contains no failures");
assert(sustainableStates > 0, "Representative matrix contains no sustainable-vessel successes");

console.log(JSON.stringify({
  validStates,
  failureStates,
  sustainableStates,
  maxSustained,
  default:exactBudgetResult,
  balanced:balancedResult,
  unbalanced:unbalancedResult,
  winter,
  summer,
  erieFocused:erieResult,
}, null, 2));
