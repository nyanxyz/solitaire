export type Empty = 0;
export type CardNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
export type CardType = 'spade' | 'heart' | 'diamond' | 'club';
export type BasicCard = {
  type: CardType;
  number: CardNumber;
};
