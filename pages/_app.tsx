import type { AppProps } from 'next/app';
import { Container } from '../src/components/Container';
import { globalStyles } from '../src/styles/globalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
