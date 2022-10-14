import { globalCss } from '@stitches/react';

export const globalStyles = globalCss({
  'html, body': {
    padding: 0,
    margin: 0,
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  '*': {
    boxSizing: 'border-box',
  },
});
