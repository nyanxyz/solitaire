import { Card, CardNumber, CardType } from './types';

export function range(start: number, end?: number, step = 1): number[] {
  const _start = end === undefined ? 0 : start;
  const _end = end === undefined ? start : end;

  const output = [];
  let current = _start;
  while (current < _end) {
    output.push(current);
    current += step;
  }
  return output;
}

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let randomIndex;
  const newArray = Array.from(array);

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex]!,
      newArray[currentIndex]!,
    ];
  }

  return newArray;
}

const types: CardType[] = ['heart', 'club', 'diamond', 'spade'];
export function getCard(num: number): Card {
  const type = types[num % 4];
  const number = Math.floor(num / 4) as CardNumber;

  return {
    type,
    number,
  };
}

export function getSymbol(type: CardType) {
  switch (type) {
    case 'spade':
      return '♠';
    case 'heart':
      return '♥';
    case 'diamond':
      return '♦';
    case 'club':
      return '♣';
  }
}

export function getCardText(card: Card) {
  return `${card.number} ${getSymbol(card.type)}`;
}
