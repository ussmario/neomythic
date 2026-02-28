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

  if (!data) return 1;
  if (data.strong === defender) return 1.5;
  if (data.weak === defender) return 0.5;

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
















/* // Add a small helper for MVP testing sliders. again, ensure consotency with constitution
export function captureFormulaMVP(hp: number, precision: number, element: string) {
  const base = 50; // base %
  const hpFactor = (100 - hp) / 100;
  const precisionFactor = precision / 100;
  const elementFactor = element === "Fire" ? 1.1 : 1; // demo bonus
  return Math.round(base * hpFactor * precisionFactor * elementFactor);
} */




/* export function captureFormula(
  HPPercent: number,
  precision: number,
  element: string,
  monsterElement: string,
  tierMultiplier: number,
  runeMastery: number
) {
  //the lower the monster's HP, the higher the value, and the easier it is to capture.
  const hpFactor = 100 - HPPercent// invert HPPercent to a format where higher = easier
  const precisionFactor = precision / 100;

  // Element bonus: uses your type chart logic
  const typeBonus = elementMatchBonus(element, monsterElement); // 0.5–1.5

  const baseCapture = 50; // starting base. arbitrary???
  const captureStrength = baseCapture * hpFactor * precisionFactor * typeBonus * tierMultiplier;

  // Clamp 0–100
  return Math.min(Math.max(Math.round(captureStrength), 0), 100);
}

// accepts 2 elements and returns a multiplier based on the type chart
function elementMatchBonus(playerElement: string, targetElement: string) {
  const chart: Record<string, Record<string, number>> = {
    Fire: { Fire: 1, Plant: 1.5, Water: 0.5, Earth: 1, Air: 1, Electric: 1, Light: 1, Dark: 1, Psy: 1 },
    Plant: { Fire: 0.5, Plant: 1, Water: 1.5, Earth: 1, Air: 1, Electric: 1, Light: 1, Dark: 1, Psy: 1 },
    Water: { Fire: 1.5, Plant: 0.5, Water: 1, Earth: 1, Air: 1, Electric: 1, Light: 1, Dark: 1, Psy: 1 },
    // etc. add all 9 elements
  };

  return chart[playerElement][targetElement] ?? 1;
} */