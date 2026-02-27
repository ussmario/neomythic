type CaptureInput = {
  tierMultiplier: number;
  grammarMultiplier: number;
  precision: number;
  attackerElement: string;
  defenderElement: string;
  currentHP: number;
  resistance: number;
};

import { elements } from "../data/elements";

function getElementMultiplier(attacker: string, defender: string) {
  const data = elements[attacker as keyof typeof elements];

  if (!data) return 1;

  if (data.strong === defender) return 1.5;
  if (data.weak === defender) return 0.5;

  return 1;
}

export function calculateCaptureChance(input: CaptureInput) {
  const elementMultiplier = getElementMultiplier(
    input.attackerElement,
    input.defenderElement
  );

  const captureStrength =
    input.tierMultiplier *
    input.grammarMultiplier *
    input.precision *
    elementMultiplier;

  const chance =
    captureStrength / (input.currentHP * input.resistance);

  return Math.min(chance, 1);
}

// Add a small helper for MVP testing sliders
export function captureFormulaMVP(hp: number, precision: number, element: string) {
  const base = 50; // base %
  const hpFactor = (100 - hp) / 100;
  const precisionFactor = precision / 100;
  const elementFactor = element === "Fire" ? 1.1 : 1; // demo bonus
  return Math.round(base * hpFactor * precisionFactor * elementFactor);
}