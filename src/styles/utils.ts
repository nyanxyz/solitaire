import { CSS } from '@stitches/react';

export const flex: Record<string, CSS> = {
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export const alignment: Record<string, CSS> = {
  align: {
    alignItems: 'center',
  },
  justify: {
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};
