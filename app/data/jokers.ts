export interface Joker {
  id: number;
  filename: string;
  name: string;
  effect: string;
}

export const jokers: Joker[] = [
  {
    "id": 1,
    "filename": "joker",
    "name": "Joker",
    "effect": "+4 Mult"
  },
  {
    "id": 2,
    "filename": "greedy_joker",
    "name": "Greedy Joker",
    "effect": "Played cards with Diamond suit give +3 Mult when scored"
  },
  {
    "id": 3,
    "filename": "lusty_joker",
    "name": "Lusty Joker",
    "effect": "Played cards with Heart suit give +3 Mult when scored"
  },
  {
    "id": 4,
    "filename": "wrathful_joker",
    "name": "Wrathful Joker",
    "effect": "Played cards with Spade suit give +3 Mult when scored"
  },
  {
    "id": 5,
    "filename": "gluttonous_joker",
    "name": "Gluttonous Joker",
    "effect": "Played cards with Club suit give +3 Mult when scored"
  },
  {
    "id": 6,
    "filename": "jolly_joker",
    "name": "Jolly Joker",
    "effect": "+8 Mult if played hand contains a Pair"
  },
  {
    "id": 7,
    "filename": "zany_joker",
    "name": "Zany Joker",
    "effect": "+12 Mult if played hand contains a Three of a Kind"
  },
  {
    "id": 8,
    "filename": "mad_joker",
    "name": "Mad Joker",
    "effect": "+10 Mult if played hand contains a Two Pair"
  },
  {
    "id": 9,
    "filename": "crazy_joker",
    "name": "Crazy Joker",
    "effect": "+12 Mult if played hand contains a Straight"
  },
  {
    "id": 10,
    "filename": "droll_joker",
    "name": "Droll Joker",
    "effect": "+10 Mult if played hand contains a Flush"
  },
  {
    "id": 11,
    "filename": "sly_joker",
    "name": "Sly Joker",
    "effect": "+50 Chips if played hand contains a Pair"
  },
  {
    "id": 12,
    "filename": "wily_joker",
    "name": "Wily Joker",
    "effect": "+100 Chips if played hand contains a Three of a Kind"
  },
  {
    "id": 13,
    "filename": "clever_joker",
    "name": "Clever Joker",
    "effect": "+80 Chips if played hand contains a Two Pair"
  },
  {
    "id": 14,
    "filename": "devious_joker",
    "name": "Devious Joker",
    "effect": "+100 Chips if played hand contains a Straight"
  },
  {
    "id": 15,
    "filename": "crafty_joker",
    "name": "Crafty Joker",
    "effect": "+80 Chips if played hand contains a Flush"
  },
  {
    "id": 16,
    "filename": "half_joker",
    "name": "Half Joker",
    "effect": "+20 Mult if played hand contains 3 or fewer cards"
  },
  {
    "id": 17,
    "filename": "joker_stencil",
    "name": "Joker Stencil",
    "effect": "X1 Mult for each empty Joker slot. Joker Stencil included \n (Currently X1)"
  },
  {
    "id": 18,
    "filename": "four_fingers",
    "name": "Four Fingers",
    "effect": "All Flushes and Straights can be made with 4 cards"
  },
  {
    "id": 19,
    "filename": "mime",
    "name": "Mime",
    "effect": "Retrigger all card held in hand abilities"
  },
  {
    "id": 20,
    "filename": "credit_card",
    "name": "Credit Card",
    "effect": "Go up to -$20 in debt"
  },
  {
    "id": 21,
    "filename": "ceremonial_dagger",
    "name": "Ceremonial Dagger",
    "effect": "When Blind is selected, destroy Joker to the right and permanently add double its sell value to this Mult (Currently +0 Mult)"
  },
  {
    "id": 22,
    "filename": "banner",
    "name": "Banner",
    "effect": "+30 Chips for each remaining discard"
  },
  {
    "id": 23,
    "filename": "mystic_summit",
    "name": "Mystic Summit",
    "effect": "+15 Mult when 0 discards remaining"
  },
  {
    "id": 24,
    "filename": "marble_joker",
    "name": "Marble Joker",
    "effect": "Adds one Stone card to the deck when Blind is selected"
  },
  {
    "id": 25,
    "filename": "loyalty_card",
    "name": "Loyalty Card",
    "effect": "X4 Mult every 6 hands played\n5 remaining"
  },
  {
    "id": 26,
    "filename": "8_ball",
    "name": "8 Ball",
    "effect": "1 in 4 chance for each played 8 to create a Tarot card when scored\n(Must have room)"
  },
  {
    "id": 27,
    "filename": "misprint",
    "name": "Misprint",
    "effect": "+0-23 Mult"
  },
  {
    "id": 28,
    "filename": "dusk",
    "name": "Dusk",
    "effect": "Retrigger all played cards in final hand of the round"
  },
  {
    "id": 29,
    "filename": "raised_fist",
    "name": "Raised Fist",
    "effect": "Adds double the rank of lowest ranked card held in hand to Mult"
  },
  {
    "id": 30,
    "filename": "chaos_the_clown",
    "name": "Chaos the Clown",
    "effect": "1 free Reroll per shop"
  },
  {
    "id": 31,
    "filename": "fibonacci",
    "name": "Fibonacci",
    "effect": "Each played Ace, 2, 3, 5, or 8 gives +8 Mult when scored"
  },
  {
    "id": 32,
    "filename": "steel_joker",
    "name": "Steel Joker",
    "effect": "Gives X0.2 Mult for each Steel Card in your full deck \n (Currently X1 Mult)"
  },
  {
    "id": 33,
    "filename": "scary_face",
    "name": "Scary Face",
    "effect": "Played face cards give +30 Chips when scored"
  },
  {
    "id": 34,
    "filename": "abstract_joker",
    "name": "Abstract Joker",
    "effect": "+3 Mult for each Joker card \n (Currently +0 Mult)"
  },
  {
    "id": 35,
    "filename": "delayed_gratification",
    "name": "Delayed Gratification",
    "effect": "Earn $2 per discard if no discards are used by end of the round"
  },
  {
    "id": 36,
    "filename": "hack",
    "name": "Hack",
    "effect": "Retrigger each played 2, 3, 4, or 5"
  },
  {
    "id": 37,
    "filename": "pareidolia",
    "name": "Pareidolia",
    "effect": "All cards are considered face cards"
  },
  {
    "id": 38,
    "filename": "gros_michel",
    "name": "Gros Michel",
    "effect": "+15 Mult\n1 in 6 chance this is destroyed at the end of round."
  },
  {
    "id": 39,
    "filename": "even_steven",
    "name": "Even Steven",
    "effect": "Played cards with even rank give +4 Mult when scored \n (10, 8, 6, 4, 2)"
  },
  {
    "id": 40,
    "filename": "odd_todd",
    "name": "Odd Todd",
    "effect": "Played cards with odd rank give +31 Chips when scored \n (A, 9, 7, 5, 3)"
  },
  {
    "id": 41,
    "filename": "scholar",
    "name": "Scholar",
    "effect": "Played Aces give +20 Chips and +4 Mult when scored"
  },
  {
    "id": 42,
    "filename": "business_card",
    "name": "Business Card",
    "effect": "Played face cards have a 1 in 2 chance to give $2 when scored"
  },
  {
    "id": 43,
    "filename": "supernova",
    "name": "Supernova",
    "effect": "Adds the number of times poker hand has been played this run to Mult"
  },
  {
    "id": 44,
    "filename": "ride_the_bus",
    "name": "Ride the Bus",
    "effect": "This Joker gains +1 Mult per consecutive hand played without a scoring face card \n (Currently +0 Mult)"
  },
  {
    "id": 45,
    "filename": "space_joker",
    "name": "Space Joker",
    "effect": "1 in 4 chance to upgrade level of played poker hand"
  },
  {
    "id": 46,
    "filename": "egg",
    "name": "Egg",
    "effect": "Gains $3 of sell value at end of round"
  },
  {
    "id": 47,
    "filename": "burglar",
    "name": "Burglar",
    "effect": "When Blind is selected, gain +3 Hands and lose all discards"
  },
  {
    "id": 48,
    "filename": "blackboard",
    "name": "Blackboard",
    "effect": "X3 Mult if all cards held in hand are Spades or Clubs"
  },
  {
    "id": 49,
    "filename": "runner",
    "name": "Runner",
    "effect": "Gains +15 Chips if played hand contains a Straight \n (Currently +0 Chips)"
  },
  {
    "id": 50,
    "filename": "ice_cream",
    "name": "Ice Cream",
    "effect": "+100 Chips\n-5 Chips for every hand played"
  },
  {
    "id": 51,
    "filename": "dna",
    "name": "DNA",
    "effect": "If first hand of round has only 1 card, add a permanent copy to deck and draw it to hand"
  },
  {
    "id": 52,
    "filename": "splash",
    "name": "Splash",
    "effect": "Every played card counts in scoring"
  },
  {
    "id": 53,
    "filename": "blue_joker",
    "name": "Blue Joker",
    "effect": "+2 Chips for each remaining card in deck \n (Currently +104 Chips)"
  },
  {
    "id": 54,
    "filename": "sixth_sense",
    "name": "Sixth Sense",
    "effect": "If first hand of round is a single 6, destroy it and create a Spectral card \n (Must have room)"
  },
  {
    "id": 55,
    "filename": "constellation",
    "name": "Constellation",
    "effect": "This Joker gains X0.1 Mult every time a Planet card is used \n (Currently X1 Mult)"
  },
  {
    "id": 56,
    "filename": "hiker",
    "name": "Hiker",
    "effect": "Every played card permanently gains +5 Chips when scored"
  },
  {
    "id": 57,
    "filename": "faceless_joker",
    "name": "Faceless Joker",
    "effect": "Earn $5 if 3 or more face cards are discarded at the same time"
  },
  {
    "id": 58,
    "filename": "green_joker",
    "name": "Green Joker",
    "effect": "+1 Mult per hand played \n -1 Mult per discard \n (Currently +0 Mult)"
  },
  {
    "id": 59,
    "filename": "superposition",
    "name": "Superposition",
    "effect": "Create a Tarot card if poker hand contains an Ace and a Straight \n (Must have room)"
  },
  {
    "id": 60,
    "filename": "to_do_list",
    "name": "To Do List",
    "effect": "Earn $4 if poker hand is a [Poker Hand], poker hand changes at end of round"
  },
  {
    "id": 61,
    "filename": "cavendish",
    "name": "Cavendish",
    "effect": "X3 Mult \n 1 in 1000 chance this card is destroyed at the end of round"
  },
  {
    "id": 62,
    "filename": "card_sharp",
    "name": "Card Sharp",
    "effect": "X3 Mult if played poker hand has already been played this round"
  },
  {
    "id": 63,
    "filename": "red_card",
    "name": "Red Card",
    "effect": "This Joker gains +3 Mult when any Booster Pack is skipped \n (Currently +0 Mult)"
  },
  {
    "id": 64,
    "filename": "madness",
    "name": "Madness",
    "effect": "When Small Blind or Big Blind is selected, gain X0.5 Mult and destroy a random Joker \n (Currently X1 Mult)"
  },
  {
    "id": 65,
    "filename": "square_joker",
    "name": "Square Joker",
    "effect": "This Joker gains +4 Chips if played hand has exactly 4 cards \n (Currently 0 Chips)"
  },
  {
    "id": 66,
    "filename": "séance",
    "name": "Séance",
    "effect": "If poker hand is a Straight Flush, create a random Spectral card \n (Must have room)"
  },
  {
    "id": 67,
    "filename": "riff-raff",
    "name": "Riff-Raff",
    "effect": "When Blind is selected, create 2 Common Jokers \n (Must have room)"
  },
  {
    "id": 68,
    "filename": "vampire",
    "name": "Vampire",
    "effect": "This Joker gains X0.1 Mult per scoring Enhanced card played, removes card Enhancement \n (Currently X1 Mult)"
  },
  {
    "id": 69,
    "filename": "shortcut",
    "name": "Shortcut",
    "effect": "Allows Straights to be made with gaps of 1 rank \n (ex: 10 8 6 5 3)"
  },
  {
    "id": 70,
    "filename": "hologram",
    "name": "Hologram",
    "effect": "This Joker gains X0.25 Mult every time a playing card is added to your deck \n (Currently X1 Mult)"
  },
  {
    "id": 71,
    "filename": "vagabond",
    "name": "Vagabond",
    "effect": "Create a Tarot card if hand is played with $4 or less"
  },
  {
    "id": 72,
    "filename": "baron",
    "name": "Baron",
    "effect": "Each King held in hand gives X1.5 Mult"
  },
  {
    "id": 73,
    "filename": "cloud_9",
    "name": "Cloud 9",
    "effect": "Earn $1 for each 9 in your full deck at end of round \n (Currently $4)"
  },
  {
    "id": 74,
    "filename": "rocket",
    "name": "Rocket",
    "effect": "Earn $1 at end of round. Payout increases by $2 when Boss Blind is defeated"
  },
  {
    "id": 75,
    "filename": "obelisk",
    "name": "Obelisk",
    "effect": "This Joker gains X0.2 Mult per consecutive hand played without playing your most played poker hand \n (Currently X1 Mult)"
  },
  {
    "id": 76,
    "filename": "midas_mask",
    "name": "Midas Mask",
    "effect": "All played face cards become Gold cards when scored"
  },
  {
    "id": 77,
    "filename": "luchador",
    "name": "Luchador",
    "effect": "Sell this card to disable the current Boss Blind"
  },
  {
    "id": 78,
    "filename": "photograph",
    "name": "Photograph",
    "effect": "First played face card gives X2 Mult when scored"
  },
  {
    "id": 79,
    "filename": "gift_card",
    "name": "Gift Card",
    "effect": "Add $1 of sell value to every Joker and Consumable card at end of round"
  },
  {
    "id": 80,
    "filename": "turtle_bean",
    "name": "Turtle Bean",
    "effect": "+5 hand size, reduces by 1 each round"
  },
  {
    "id": 81,
    "filename": "erosion",
    "name": "Erosion",
    "effect": "+4 Mult for each card below [the deck's starting size] in your full deck \n (Currently +0 Mult)"
  },
  {
    "id": 82,
    "filename": "reserved_parking",
    "name": "Reserved Parking",
    "effect": "Each face card held in hand has a 1 in 2 chance to give $1"
  },
  {
    "id": 83,
    "filename": "mail-in_rebate",
    "name": "Mail-In Rebate",
    "effect": "Earn $5 for each discarded [rank], rank changes every round"
  },
  {
    "id": 84,
    "filename": "to_the_moon",
    "name": "To the Moon",
    "effect": "Earn an extra $1 of interest for every $5 you have at end of round"
  },
  {
    "id": 85,
    "filename": "hallucination",
    "name": "Hallucination",
    "effect": "1 in 2 chance to create a Tarot card when any Booster Pack is opened \n (Must have room)"
  },
  {
    "id": 86,
    "filename": "fortune_teller",
    "name": "Fortune Teller",
    "effect": "+1 Mult per Tarot card used this run \n (Currently +0)"
  },
  {
    "id": 87,
    "filename": "juggler",
    "name": "Juggler",
    "effect": "+1 hand size"
  },
  {
    "id": 88,
    "filename": "drunkard",
    "name": "Drunkard",
    "effect": "+1 discard each round"
  },
  {
    "id": 89,
    "filename": "stone_joker",
    "name": "Stone Joker",
    "effect": "Gives +25 Chips for each Stone Card in your full deck \n (Currently +0 Chips)"
  },
  {
    "id": 90,
    "filename": "golden_joker",
    "name": "Golden Joker",
    "effect": "Earn $4 at end of round"
  },
  {
    "id": 91,
    "filename": "lucky_cat",
    "name": "Lucky Cat",
    "effect": "This Joker gains X0.25 Mult every time a Lucky card successfully triggers \n (Currently X1 Mult)"
  },
  {
    "id": 92,
    "filename": "baseball_card",
    "name": "Baseball Card",
    "effect": "Uncommon Jokers each give X1.5 Mult"
  },
  {
    "id": 93,
    "filename": "bull",
    "name": "Bull",
    "effect": "+2 Chips for each $1 you have \n (Currently +0 Chips)"
  },
  {
    "id": 94,
    "filename": "diet_cola",
    "name": "Diet Cola",
    "effect": "Sell this card to create a free Double Tag"
  },
  {
    "id": 95,
    "filename": "trading_card",
    "name": "Trading Card",
    "effect": "If first discard of round has only 1 card, destroy it and earn $3"
  },
  {
    "id": 96,
    "filename": "flash_card",
    "name": "Flash Card",
    "effect": "This Joker gains +2 Mult per reroll in the shop \n (Currently +0 Mult)"
  },
  {
    "id": 97,
    "filename": "popcorn",
    "name": "Popcorn",
    "effect": "+20 Mult \n -4 Mult per round played"
  },
  {
    "id": 98,
    "filename": "spare_trousers",
    "name": "Spare Trousers",
    "effect": "This Joker gains +2 Mult if played hand contains a Two Pair \n (Currently +0 Mult)"
  },
  {
    "id": 99,
    "filename": "ancient_joker",
    "name": "Ancient Joker",
    "effect": "Each played card with [suit] gives X1.5 Mult when scored, \n suit changes at end of round"
  },
  {
    "id": 100,
    "filename": "ramen",
    "name": "Ramen",
    "effect": "X2 Mult, loses X0.01 Mult per card discarded"
  },
  {
    "id": 101,
    "filename": "walkie_talkie",
    "name": "Walkie Talkie",
    "effect": "Each played 10 or 4 gives +10 Chips and +4 Mult when scored"
  },
  {
    "id": 102,
    "filename": "seltzer",
    "name": "Seltzer",
    "effect": "Retrigger all cards played for the next 10 hands"
  },
  {
    "id": 103,
    "filename": "castle",
    "name": "Castle",
    "effect": "This Joker gains +3 Chips per discarded [suit] card, suit changes every round \n (Currently +0 Chips)"
  },
  {
    "id": 104,
    "filename": "smiley_face",
    "name": "Smiley Face",
    "effect": "Played face cards give +5 Mult when scored"
  },
  {
    "id": 105,
    "filename": "campfire",
    "name": "Campfire",
    "effect": "This Joker gains X0.25 Mult for each card sold, resets when Boss Blind is defeated \n (Currently X1 Mult)"
  },
  {
    "id": 106,
    "filename": "golden_ticket",
    "name": "Golden Ticket",
    "effect": "Played Gold cards earn $4 when scored"
  },
  {
    "id": 107,
    "filename": "mr._bones",
    "name": "Mr. Bones",
    "effect": "Prevents Death if chips scored are at least 25% of required chips \n self destructs"
  },
  {
    "id": 108,
    "filename": "acrobat",
    "name": "Acrobat",
    "effect": "X3 Mult on final hand of round"
  },
  {
    "id": 109,
    "filename": "sock_and_buskin",
    "name": "Sock and Buskin",
    "effect": "Retrigger all played face cards"
  },
  {
    "id": 110,
    "filename": "swashbuckler",
    "name": "Swashbuckler",
    "effect": "Adds the sell value of all other owned Jokers to Mult \n (Currently +1 Mult)"
  },
  {
    "id": 111,
    "filename": "troubadour",
    "name": "Troubadour",
    "effect": "+2 hand size, \n -1 hand per round"
  },
  {
    "id": 112,
    "filename": "certificate",
    "name": "Certificate",
    "effect": "When round begins, add a random playing card with a random seal to your hand"
  },
  {
    "id": 113,
    "filename": "smeared_joker",
    "name": "Smeared Joker",
    "effect": "Hearts and Diamonds count as the same suit, Spades and Clubs count as the same suit"
  },
  {
    "id": 114,
    "filename": "throwback",
    "name": "Throwback",
    "effect": "X0.25 Mult for each Blind skipped this run \n (Currently X1 Mult)"
  },
  {
    "id": 115,
    "filename": "hanging_chad",
    "name": "Hanging Chad",
    "effect": "Retrigger first played card used in scoring 2 additional times"
  },
  {
    "id": 116,
    "filename": "rough_gem",
    "name": "Rough Gem",
    "effect": "Played cards with Diamond suit earn $1 when scored"
  },
  {
    "id": 117,
    "filename": "bloodstone",
    "name": "Bloodstone",
    "effect": "1 in 2 chance for played cards with Heart suit to give X1.5 Mult when scored"
  },
  {
    "id": 118,
    "filename": "arrowhead",
    "name": "Arrowhead",
    "effect": "Played cards with Spade suit give +50 Chips when scored"
  },
  {
    "id": 119,
    "filename": "onyx_agate",
    "name": "Onyx Agate",
    "effect": "Played cards with Club suit give +7 Mult when scored"
  },
  {
    "id": 120,
    "filename": "glass_joker",
    "name": "Glass Joker",
    "effect": "This Joker gains X0.75 Mult for every Glass Card that is destroyed \n (Currently X1 Mult)"
  },
  {
    "id": 121,
    "filename": "showman",
    "name": "Showman",
    "effect": "Joker, Tarot, Planet, and Spectral cards may appear multiple times"
  },
  {
    "id": 122,
    "filename": "flower_pot",
    "name": "Flower Pot",
    "effect": "X3 Mult if poker hand contains a Diamond card, Club card, Heart card, and Spade card"
  },
  {
    "id": 123,
    "filename": "blueprint",
    "name": "Blueprint",
    "effect": "Copies ability of Joker to the right"
  },
  {
    "id": 124,
    "filename": "wee_joker",
    "name": "Wee Joker",
    "effect": "This Joker gains +8 Chips when each played 2 is scored (Currently +0 Chips)"
  },
  {
    "id": 125,
    "filename": "merry_andy",
    "name": "Merry Andy",
    "effect": "+3 discards each round, \n-1 hand size"
  },
  {
    "id": 126,
    "filename": "oops!_all_6s",
    "name": "Oops! All 6s",
    "effect": "Doubles all listed probabilities \n (ex: 1 in 3 -> 2 in 3)"
  },
  {
    "id": 127,
    "filename": "the_idol",
    "name": "The Idol",
    "effect": "Each played [rank] of [suit] gives X2 Mult when scored\nCard changes every round"
  },
  {
    "id": 128,
    "filename": "seeing_double",
    "name": "Seeing Double",
    "effect": "X2 Mult if played hand has a scoring Club card and a scoring card of any other suit"
  },
  {
    "id": 129,
    "filename": "matador",
    "name": "Matador",
    "effect": "Earn $8 if played hand triggers the Boss Blind ability"
  },
  {
    "id": 130,
    "filename": "hit_the_road",
    "name": "Hit the Road",
    "effect": "This Joker gains X0.5 Mult for every Jack discarded this round \n (Currently X1 Mult)"
  },
  {
    "id": 131,
    "filename": "the_duo",
    "name": "The Duo",
    "effect": "X2 Mult if played hand contains a Pair"
  },
  {
    "id": 132,
    "filename": "the_trio",
    "name": "The Trio",
    "effect": "X3 Mult if played hand contains a Three of a Kind"
  },
  {
    "id": 133,
    "filename": "the_family",
    "name": "The Family",
    "effect": "X4 Mult if played hand contains a Four of a Kind"
  },
  {
    "id": 134,
    "filename": "the_order",
    "name": "The Order",
    "effect": "X3 Mult if played hand contains a Straight"
  },
  {
    "id": 135,
    "filename": "the_tribe",
    "name": "The Tribe",
    "effect": "X2 Mult if played hand contains a Flush"
  },
  {
    "id": 136,
    "filename": "stuntman",
    "name": "Stuntman",
    "effect": "+250 Chips,\n-2 hand size"
  },
  {
    "id": 137,
    "filename": "invisible_joker",
    "name": "Invisible Joker",
    "effect": "After 2 rounds, sell this card to Duplicate a random Joker \n (Currently 0/2) \n (Removes Negative from copy)"
  },
  {
    "id": 138,
    "filename": "brainstorm",
    "name": "Brainstorm",
    "effect": "Copies the ability of leftmost Joker"
  },
  {
    "id": 139,
    "filename": "satellite",
    "name": "Satellite",
    "effect": "Earn $1 at end of round per unique Planet card used this run"
  },
  {
    "id": 140,
    "filename": "shoot_the_moon",
    "name": "Shoot the Moon",
    "effect": "Each Queen held in hand gives +13 Mult"
  },
  {
    "id": 141,
    "filename": "driver's_license",
    "name": "Driver's License",
    "effect": "X3 Mult if you have at least 16 Enhanced cards in your full deck \n (Currently 0)"
  },
  {
    "id": 142,
    "filename": "cartomancer",
    "name": "Cartomancer",
    "effect": "Create a Tarot card when Blind is selected \n (Must have room)"
  },
  {
    "id": 143,
    "filename": "astronomer",
    "name": "Astronomer",
    "effect": "All Planet cards and Celestial Packs in the shop are free"
  },
  {
    "id": 144,
    "filename": "burnt_joker",
    "name": "Burnt Joker",
    "effect": "Upgrade the level of the first discarded poker hand each round"
  },
  {
    "id": 145,
    "filename": "bootstraps",
    "name": "Bootstraps",
    "effect": "+2 Mult for every $5 you have \n (Currently +0 Mult)"
  },
  {
    "id": 146,
    "filename": "canio",
    "name": "Canio",
    "effect": "This Joker gains X1 Mult when a face card is destroyed \n (Currently X1 Mult)"
  },
  {
    "id": 147,
    "filename": "triboulet",
    "name": "Triboulet",
    "effect": "Played Kings and Queens each give X2 Mult when scored"
  },
  {
    "id": 148,
    "filename": "yorick",
    "name": "Yorick",
    "effect": "This Joker gains X1 Mult every 23 [23] cards discarded\n(Currently X1 Mult)"
  },
  {
    "id": 149,
    "filename": "chicot",
    "name": "Chicot",
    "effect": "Disables effect of every Boss Blind"
  },
  {
    "id": 150,
    "filename": "perkeo",
    "name": "Perkeo",
    "effect": "Creates a Negative copy of 1 random consumable card in your possession at the end of the shop"
  }
];