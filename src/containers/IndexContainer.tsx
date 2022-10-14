import React from 'react';
import { StartContainer } from './StartContainer';

type PageState = 'start' | 'game' | 'end';

export default function IndexContainer() {
  const [pageState, setPageState] = React.useState<PageState>('start');

  if (pageState === 'start') {
    return <StartContainer onStart={() => setPageState('game')} />;
  }
  if (pageState === 'end') {
    return <div>end</div>;
  }

  return <div>game</div>;
}
