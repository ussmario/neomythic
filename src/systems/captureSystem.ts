import { elements } from "../data/elements";//reference constitution to ensure consistency

type CaptureInput = {
  //reqd to compute capture probability
  precision: number;
  grammarMultiplier: number;
  runeMastery: number;
  tierMultiplier: number;
  attackerElement: string;
  defenderElement: string;
  HPPercent: number;
  resistance: number;
};

export function captureProbability(input: CaptureInput) {
  const skillScore = computeSkillScore(input.attackerElement, input.defenderElement, input.precision, input.grammarMultiplier, input.tierMultiplier, input.runeMastery);
  const healthScore = computeHealthScore(input.HPPercent);
  const power = 1.1; //tuning parameter to adjust curve steepness
  const skillPower = Math.pow(skillScore, power);
  const healthPower = Math.pow(healthScore, power);

  return (skillPower * healthPower) / input.resistance;
}

//trinity reference from imports is used to getElementMultiplier to return the elementMultiplier from the trinity table
function getElementMultiplier(attacker: string, defender: string) {
  const data = elements[attacker as keyof typeof elements];
//this is a flat boost to ur skill score so it should not be overly impactful. just a slight boost or detriment to capture. remember that this is not a battle
  //if (!data) return 1;
  if (data.strong === defender) return 1.09;
  if (data.weak === defender) return 0.85;

  return 1;
}

//computeSkillScore Ratified
export function computeSkillScore(a: string, d: string, p: number, g: number, t: number, r: number): number {
  //convert input elements into elementMultiplier. all data should now be in proper format for next step
  const e = getElementMultiplier(a, d);
  //compute all formatted data into skill
  const computeSkill = p * g * t * r * e;
  //returns skill score
  return Math.min(computeSkill, 1);
}

//computeHealthScore Ratified
export function computeHealthScore(HPPercent: number) {
  //compute data into health
  const computeHealth = 1 - HPPercent;
  //returns health score
  return Math.max(computeHealth, 0.01);
}