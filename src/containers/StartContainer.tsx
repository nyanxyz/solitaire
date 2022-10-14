import { styled } from '../styles/styled';
import { alignment, flex } from '../styles/utils';

interface StartContainerProps {
  onStart: () => void;
}

export function StartContainer({ onStart }: StartContainerProps) {
  return (
    <Root>
      <div>솔리테어</div>
      <button onClick={onStart}>시작</button>
    </Root>
  );
}

const Root = styled('div', {
  ...flex.column,
  ...alignment.center,
  height: '100%',
  gap: '$2',
});
