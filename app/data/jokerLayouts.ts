/**
 * Configuration for joker positioning and scaling based on the number of jokers
 */

export interface JokerScale {
  scale: number;
  rotation: number;
}

export interface JokerPosition {
  x: number;
  y: number;
}

export interface JokerLayout {
  scales: JokerScale[];
  positions: JokerPosition[];
}

/**
 * Returns layout configuration (scales and positions) for a given number of jokers
 */
export function getJokerLayout(jokerCount: number): JokerLayout {
  switch (jokerCount) {
    case 1:
      return {
        scales: [{ scale: 3, rotation: 0 }],
        positions: [{ x: 50, y: 50 }]
      };
    case 2:
      return {
        scales: [
          { scale: 2.8, rotation: 0 },
          { scale: 2.8, rotation: 0 }
        ],
        positions: [
          { x: 30, y: 50 },
          { x: 70, y: 50 }
        ]
      };
    case 3:
      return {
        scales: [
          { scale: 2.5, rotation: -5 },
          { scale: 3, rotation: 0 },
          { scale: 2.5, rotation: 5 }
        ],
        positions: [
          { x: 25, y: 50 },
          { x: 50, y: 50 },
          { x: 75, y: 50 }
        ]
      };
    case 4:
      return {
        scales: [
          { scale: 2, rotation: -5 },
          { scale: 2.5, rotation: 0 },
          { scale: 2.5, rotation: 0 },
          { scale: 2, rotation: 5 }
        ],
        positions: [
          { x: 16, y: 50 },
          { x: 35, y: 50 },
          { x: 65, y: 50 },
          { x: 84, y: 50 }
        ]
      };
    case 5:
      return {
        scales: [
          { scale: 2, rotation: -7.5 },
          { scale: 2.3, rotation: -5 },
          { scale: 2.5, rotation: 0 },
          { scale: 2.3, rotation: 5 },
          { scale: 2, rotation: 7.5 }
        ],
        positions: [
          { x: 16, y: 53 },
          { x: 33, y: 50 },
          { x: 50, y: 50 },
          { x: 66, y: 50 },
          { x: 84, y: 53 }
        ]
      };
    default:
      return {
        scales: [],
        positions: []
      };
  }
}

/**
 * Calculate z-index order for layering jokers
 * Higher values are drawn on top
 */
export function calculateZOrders(jokerCount: number): number[] {
  const zOrders: number[] = [];
  
  for (let i = 0; i < jokerCount; i++) {
    if (jokerCount <= 2) {
      zOrders.push(i + 1);
    } else {
      const centerIndex = Math.floor(jokerCount / 2);
      zOrders.push(
        i === centerIndex 
          ? jokerCount + 1  // Center card on top
          : jokerCount - Math.abs(i - centerIndex)
      );
    }
  }
  
  return zOrders;
}