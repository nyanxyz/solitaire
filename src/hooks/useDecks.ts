import { useCallback, useState } from 'react';
import { BasicCard } from '../types';

const 스택의_총_카드수 = 28;

export function useDecks(initialCards: BasicCard[]) {
  const [deck, setDeck] = useState<BasicCard[]>(() => initialCards.slice(스택의_총_카드수));
  const [deckIndex, setDeckIndex] = useState<number>(-1);

  const handleDeckClick = useCallback(() => {
    if (deckIndex >= deck.length - 1) {
      setDeckIndex(-1);
      return;
    }
    setDeckIndex((prev) => prev + 1);
  }, [deck.length, deckIndex]);

  const handleCurrentCardRemove = useCallback(() => {
    setDeck((prev) => prev.slice(0, deckIndex).concat(prev.slice(deckIndex + 1)));
    setDeckIndex((prev) => prev - 1);
  }, [deckIndex]);

  return {
    current: deck[deckIndex],
    remainCount: deck.length - deckIndex - 1,
    handleDeckClick,
    handleCurrentCardRemove,
  };
}
