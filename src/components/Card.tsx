import { useMemo } from 'react';
import { styled } from '../styles/styled';
import { alignment, flex } from '../styles/utils';
import { CardNumber, CardType } from '../types';
import { getSymbol } from '../utils';

interface CardProps extends React.ComponentProps<typeof Root> {
  children?: React.ReactNode;
  bgColor?: 'gray' | 'blue';
  number?: CardNumber;
  type?: CardType;
}

export function Card({ children, bgColor = 'gray', number, type, ...restProps }: CardProps) {
  const cardText = useMemo(() => {
    if (number === 1) return 'A';
    if (number === 11) return 'J';
    if (number === 12) return 'Q';
    if (number === 13) return 'K';
    return number;
  }, [number]);

  return (
    <Root className={type} bgColor={bgColor} {...restProps}>
      <div>
        {type && <span>{getSymbol(type)}</span>}
        {cardText && <span>{cardText}</span>}
      </div>
      {children}
    </Root>
  );
}

const Root = styled('div', {
  ...flex.column,
  ...alignment.align,
  justifyContent: 'flex-start',
  width: '10vw',
  maxWidth: 50,
  aspectRatio: 3 / 4,
  borderRadius: 4,
  userSelect: 'none',
  webKitUserSelect: 'none',
  cursor: 'pointer',
  '&.heart, &.diamond': {
    color: 'red',
  },
  '&.club, &.spade': {
    color: 'black',
  },

  variants: {
    bgColor: {
      gray: {
        backgroundColor: '$gray200',
        border: '1px solid $gray300',
      },
      blue: {
        backgroundColor: '$blue50',
        border: '1px solid $blue100',
      },
    },
  },
});
