import { styled } from '../styles/styled';
import { alignment, flex } from '../styles/utils';
import { CardNumber, CardType } from '../types';
import { getSymbol } from '../utils';

interface CardProps extends React.ComponentProps<typeof Root> {
  children?: string;
  bgColor?: 'gray' | 'blue';
  number?: CardNumber;
  type?: CardType;
}

export function Card({ children, bgColor = 'gray', number, type, ...restProps }: CardProps) {
  return (
    <Root className={type} bgColor={bgColor} {...restProps}>
      {type && <div>{getSymbol(type)}</div>}
      {number && <div>{number}</div>}
      {children}
    </Root>
  );
}

const Root = styled('div', {
  ...flex.column,
  ...alignment.center,
  gap: '$1',
  width: 50,
  aspectRatio: 3 / 4,
  borderRadius: 4,
  userSelect: 'none',
  webKitUserSelect: 'none',
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
