import { useMemo, useState } from 'react';
import { Card } from '../components/Card';
import { styled } from '../styles/styled';
import { flex } from '../styles/utils';
import { Card as _Card, CardNumber, CardType, Empty } from '../types';
import { getCard, getCardText, getSymbol, range, shuffle } from '../utils';

type StackCard = _Card & { flipped: boolean };

const EMPTY: Empty = 0;
const types: CardType[] = ['heart', 'club', 'diamond', 'spade'];
const getInitialCards = () => shuffle(range(0, 52).map((card) => getCard(card)));

export function GameContainer() {
  const [initialCards] = useState<_Card[]>(() => getInitialCards());
  const stackCards = useMemo(
    () =>
      initialCards.slice(0, 28).map((card, index) => {
        if ([0, 2, 5, 9, 14, 20, 27].includes(index)) {
          return Object.assign(card, { flipped: true });
        }
        return Object.assign(card, { flipped: false });
      }),
    [initialCards]
  );

  // 기초(foundation) 카드 더미. 현재 최상위 카드번호
  const [heart, setHeart] = useState<CardNumber | Empty>(EMPTY);
  const [diamond, setDiamond] = useState<CardNumber | Empty>(EMPTY);
  const [club, setClub] = useState<CardNumber | Empty>(EMPTY);
  const [spade, setSpade] = useState<CardNumber | Empty>(EMPTY);

  // 줄 스택
  const [line1, setLine1] = useState<StackCard[]>(stackCards.slice(0, 1));
  const [line2, setLine2] = useState<StackCard[]>(stackCards.slice(1, 3));
  const [line3, setLine3] = useState<StackCard[]>(stackCards.slice(3, 6));
  const [line4, setLine4] = useState<StackCard[]>(stackCards.slice(6, 10));
  const [line5, setLine5] = useState<StackCard[]>(stackCards.slice(10, 15));
  const [line6, setLine6] = useState<StackCard[]>(stackCards.slice(15, 21));
  const [line7, setLine7] = useState<StackCard[]>(stackCards.slice(21, 28));

  const [deck, setDeck] = useState<_Card[]>(initialCards.slice(28));
  const [currentCard, setCurrentCard] = useState<number>(-1); // 덱에서 현재 펼쳐진 카드. 없을 땐 -1

  return (
    <Root>
      <SpaceBetween>
        <Foundations>
          {types.map((type) => (
            <Card key={type} type={type} />
          ))}
        </Foundations>

        <Deck>
          {deck[currentCard] != null && <Card bgColor="blue" {...deck[currentCard]} />}
          <Card
            onClick={() => {
              if (currentCard === deck.length - 1) {
                setCurrentCard(-1);
                return;
              }

              setCurrentCard((c) => c + 1);
            }}
          />
        </Deck>
      </SpaceBetween>

      <LineStacks>
        {[line1, line2, line3, line4, line5, line6, line7].map((line, index) => (
          <LineStack key={index}>
            {line.map((card, i) => (
              <Card
                key={getCardText(card)}
                bgColor={card.flipped ? 'blue' : 'gray'}
                css={{
                  marginTop: i === 0 ? 0 : -50,
                }}
                number={card.flipped ? card.number : undefined}
                type={card.flipped ? card.type : undefined}
              />
            ))}
          </LineStack>
        ))}
      </LineStacks>
    </Root>
  );
}

const Root = styled('div', {
  ...flex.column,
  gap: '$8',
  padding: '$8',
});
const SpaceBetween = styled('div', {
  ...flex.row,
  justifyContent: 'space-between',
});
const Foundations = styled('div', {
  ...flex.row,
  gap: '$4',
});
const Deck = styled('div', {
  ...flex.row,
  gap: '$4',
});
const LineStacks = styled('div', {
  ...flex.row,
  alignItems: 'flex-start',
  gap: '$4',
});
const LineStack = styled('div', {
  ...flex.column,
  gap: '-8px',
});
