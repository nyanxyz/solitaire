import { useCallback, useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { useDecks } from '../hooks/useDecks';
import { FoundationCard, useFoundations } from '../hooks/useFoundations';
import { StackCard, useLineStacks } from '../hooks/useLineStacks';
import { styled } from '../styles/styled';
import { flex } from '../styles/utils';
import { BasicCard, CardNumber, Empty } from '../types';
import { getCard, getOppositeTypes, range, shuffle } from '../utils';

interface GameContainerProps {
  onEnd: () => void;
}

const EMPTY: Empty = 0;
const getInitialCards = () => shuffle(range(0, 52).map((card) => getCard(card)));

export function GameContainer({ onEnd }: GameContainerProps) {
  const [initialCards] = useState(() => getInitialCards());

  const { foundations } = useFoundations();
  const { lines } = useLineStacks(initialCards);
  const { current, remainCount, handleDeckClick, handleCurrentCardRemove } = useDecks(initialCards);

  useEffect(() => {
    if (foundations.every((foundation) => foundation.number === 13)) {
      onEnd();
    }
  }, [foundations, onEnd]);

  const moveToFoundation = useCallback(
    (card: BasicCard) => {
      const { type, number } = card;
      const foundation = foundations.find((foundation) => foundation.type === type);

      if (foundation?.number === number - 1) {
        foundation.setter(number);
        return true;
      }

      return false;
    },
    [foundations]
  );
  const moveDeckToLines = useCallback(
    (card: BasicCard) => {
      const line = lines.find((line) => {
        const cards = line.cards;
        const lastCard = cards[cards.length - 1];

        if (lastCard == null) {
          return card.number === 13;
        }

        const 알맞은_숫자인가 = lastCard.number === card.number + 1;
        const 알맞은_모양인가 = getOppositeTypes(lastCard.type).includes(card.type);

        return 알맞은_숫자인가 && 알맞은_모양인가;
      });

      if (line) {
        const newCard: StackCard = Object.assign(card, { flipped: true });
        line.setter((prev) => [...prev, newCard]);
        return true;
      }

      return false;
    },
    [lines]
  );
  const moveFoundationToLines = useCallback(
    (card: FoundationCard) => {
      if (card.number === EMPTY) return false;

      const line = lines.find((line) => {
        const cards = line.cards;
        const lastCard = cards[cards.length - 1];

        if (lastCard == null) {
          return card.number === 13;
        }

        const 알맞은_숫자인가 = lastCard.number === card.number + 1;
        const 알맞은_모양인가 = getOppositeTypes(lastCard.type).includes(card.type);

        return 알맞은_숫자인가 && 알맞은_모양인가;
      });

      if (line) {
        const newCard: StackCard = { type: card.type, number: card.number, flipped: true };
        line.setter((prev) => [...prev, newCard]);
        return true;
      }

      return false;
    },
    [lines]
  );
  const moveLinesToLines = useCallback(
    (card: StackCard, lineIndex: number) => {
      if (!card.flipped) return false;

      const { type, number } = card;
      const line = lines[lineIndex];

      const orderedLines = [
        ...lines.slice(lineIndex + 1, lines.length),
        ...lines.slice(0, lineIndex),
      ];
      const targetLine = orderedLines.find((line) => {
        const cards = line.cards;
        const lastCard = cards[cards.length - 1];

        if (lastCard == null) {
          return number === 13;
        }

        const 알맞은_숫자인가 = lastCard.number === number + 1;
        const 알맞은_모양인가 = getOppositeTypes(lastCard.type).includes(type);

        return 알맞은_숫자인가 && 알맞은_모양인가;
      });

      console.log(targetLine);
      if (targetLine != null) {
        targetLine.setter((prev) => [...prev, ...line.cards.slice(line.cards.indexOf(card))]);
        return true;
      }

      return false;
    },
    [lines]
  );

  const handleDeckCurrentCardClick = useCallback(
    (card: BasicCard) => {
      if (moveToFoundation(card) || moveDeckToLines(card)) {
        handleCurrentCardRemove();
        return;
      }
    },
    [moveToFoundation, moveDeckToLines, handleCurrentCardRemove]
  );

  const handleStackCardClick = useCallback(
    (card: StackCard, lineIndex: number) => {
      if (!card.flipped) return;

      const cards = lines[lineIndex].cards;
      const isLast = cards.indexOf(card) === cards.length - 1;

      const lineSetter = lines[lineIndex].setter;

      if (isLast && moveToFoundation(card)) {
        lineSetter((line) => {
          const newLine = line.slice(0, -1);
          if (newLine.length > 0) {
            newLine[newLine.length - 1].flipped = true;
          }

          return newLine;
        });
        return;
      }

      if (moveLinesToLines(card, lineIndex)) {
        lineSetter((line) => {
          const newLine = line.slice(0, line.indexOf(card));
          if (newLine.length > 0) {
            newLine[newLine.length - 1].flipped = true;
          }

          return newLine;
        });
        return;
      }
    },
    [lines, moveLinesToLines, moveToFoundation]
  );

  const handleFoundationCardClick = useCallback(
    (card: FoundationCard) => {
      if (moveFoundationToLines(card)) {
        card.setter((prev) => (prev - 1) as CardNumber | Empty);
      }
    },
    [moveFoundationToLines]
  );

  return (
    <Root>
      <SpaceBetween>
        <Foundations>
          {foundations.map((foundation) => {
            return (
              <Card
                key={foundation.type}
                type={foundation.type}
                bgColor={foundation.number === EMPTY ? 'gray' : 'blue'}
                number={foundation.number === EMPTY ? undefined : foundation.number}
                onClick={() => handleFoundationCardClick(foundation)}
              />
            );
          })}
        </Foundations>

        <Deck>
          {current != null && (
            <Card
              bgColor="blue"
              type={current.type}
              number={current.number}
              onClick={() => handleDeckCurrentCardClick(current)}
            />
          )}
          <Card onClick={handleDeckClick}>{remainCount}</Card>
        </Deck>
      </SpaceBetween>

      <LineStacks>
        {lines.map((line, lineIndex) => (
          <LineStack key={lineIndex}>
            {line.cards.map((card, index) => (
              <Card
                key={`${card.type}-${card.number}-${index}`}
                bgColor={card.flipped ? 'blue' : 'gray'}
                number={card.flipped ? card.number : undefined}
                type={card.flipped ? card.type : undefined}
                css={{
                  marginTop: index === 0 ? 0 : -40,
                }}
                onClick={() => handleStackCardClick(card, lineIndex)}
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
  gap: '$2',
});
const Deck = styled('div', {
  ...flex.row,
  gap: '$2',
});
const LineStacks = styled('div', {
  ...flex.row,
  alignItems: 'flex-start',
  gap: '$1',
});
const LineStack = styled('div', {
  ...flex.column,
  gap: '-8px',
  width: '10vw',
  maxWidth: 50,
});
