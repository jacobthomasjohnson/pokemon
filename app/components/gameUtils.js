export const calculateDamage = (move, isCritical, critMultiplier = 1.5) => {
      const baseDamage = move.power;
      return isCritical ? baseDamage * critMultiplier : baseDamage;
};

export const calculateCritical = (critChance) =>
      Math.random() * 100 < critChance;

export const calculateAccuracy = (moveAccuracy) =>
      Math.random() * 100 < moveAccuracy;

export const getNewHP = (currentHP, damage) => Math.max(0, currentHP - damage);
