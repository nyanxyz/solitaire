import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { CardNumber, CardType, Empty } from '../types';

const EMPTY: Empty = 0;

export type FoundationCard = {
  type: CardType;
  number: CardNumber | Empty;
  setter: Dispatch<SetStateAction<CardNumber | Empty>>;
};

// 위쪽에 있는 A에서 K까지 카드를 놓을 수 있는 곳
export function useFoundations() {
  const [heartTop, setHeartTop] = useState<CardNumber | Empty>(EMPTY);
  const [diamondTop, setDiamondTop] = useState<CardNumber | Empty>(EMPTY);
  const [clubTop, setClubTop] = useState<CardNumber | Empty>(EMPTY);
  const [spadeTop, setSpadeTop] = useState<CardNumber | Empty>(EMPTY);

  const heart = useMemo<FoundationCard>(
    () => ({
      type: 'heart',
      number: heartTop,
      setter: setHeartTop,
    }),
    [heartTop]
  );
  const diamond = useMemo<FoundationCard>(
    () => ({
      type: 'diamond',
      number: diamondTop,
      setter: setDiamondTop,
    }),
    [diamondTop]
  );
  const club = useMemo<FoundationCard>(
    () => ({
      type: 'club',
      number: clubTop,
      setter: setClubTop,
    }),
    [clubTop]
  );
  const spade = useMemo<FoundationCard>(
    () => ({
      type: 'spade',
      number: spadeTop,
      setter: setSpadeTop,
    }),
    [spadeTop]
  );

  const foundations: FoundationCard[] = useMemo(
    () => [heart, diamond, club, spade],
    [club, diamond, heart, spade]
  );

  return { foundations };
}
