export const backgrounds = [
    "arcana",
    "arm",
    "buffoon",
    "celestial",
    "club",
    "endless",
    "eye",
    "finalboss",
    "fish",
    "flint",
    "goad",
    "head",
    "hook",
    "house",
    "main",
    "manacle",
    "mark",
    "mouth",
    "needle",
    "ox",
    "pillar",
    "plant",
    "psychic",
    "serpent",
    "shop",
    "spectral",
    "standard",
    "tooth",
    "wall",
    "water",
    "wheel",
    "window",
] as const;

export type Background = (typeof backgrounds)[number];

export function getBackgroundPath(background: Background): string {
    return `/bg/bg_${background}.png`;
}

export function getBackgroundName(background: Background): string {
    return background === "finalboss" ? "Final Boss" : background.charAt(0).toUpperCase() + background.slice(1);
}
