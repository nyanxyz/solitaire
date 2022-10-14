import { styled } from '../styles/styled';

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <ContainerRoot>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </ContainerRoot>
  );
}

const ContainerRoot = styled('div', {
  display: 'flex',
  width: '100vw',
  height: '100vh',
  backgroundColor: '$gray200',
});
const ChildrenWrapper = styled('div', {
  width: '100%',
  maxWidth: 640,
  backgroundColor: 'white',
  margin: '0 auto',
});
