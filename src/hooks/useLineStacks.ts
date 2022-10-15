import { useState, useMemo, SetStateAction, Dispatch } from 'react';
import { BasicCard } from '../types';

export type StackCard = BasicCard & { flipped: boolean };
export type Line = {
  cards: StackCard[];
  setter: Dispatch<SetStateAction<StackCard[]>>;
};

const 스택의_총_카드수 = 28;
const 스택의_마지막카드_INDEXs = [0, 2, 5, 9, 14, 20, 27];

export function useLineStacks(initialCards: BasicCard[]) {
  const stackCards = useMemo(
    () =>
      initialCards.slice(0, 스택의_총_카드수).map((card, index) => {
        if (스택의_마지막카드_INDEXs.includes(index)) {
          return Object.assign(card, { flipped: true });
        }
        return Object.assign(card, { flipped: false });
      }),
    [initialCards]
  );

  const [line1, setLine1] = useState<StackCard[]>(() => stackCards.slice(0, 1));
  const [line2, setLine2] = useState<StackCard[]>(() => stackCards.slice(1, 3));
  const [line3, setLine3] = useState<StackCard[]>(() => stackCards.slice(3, 6));
  const [line4, setLine4] = useState<StackCard[]>(() => stackCards.slice(6, 10));
  const [line5, setLine5] = useState<StackCard[]>(() => stackCards.slice(10, 15));
  const [line6, setLine6] = useState<StackCard[]>(() => stackCards.slice(15, 21));
  const [line7, setLine7] = useState<StackCard[]>(() => stackCards.slice(21, 28));

  const lines: Line[] = useMemo(
    () => [
      { cards: line1, setter: setLine1 },
      { cards: line2, setter: setLine2 },
      { cards: line3, setter: setLine3 },
      { cards: line4, setter: setLine4 },
      { cards: line5, setter: setLine5 },
      { cards: line6, setter: setLine6 },
      { cards: line7, setter: setLine7 },
    ],
    [line1, line2, line3, line4, line5, line6, line7]
  );

  return { lines };
}
