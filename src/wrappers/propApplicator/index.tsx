import { ComponentProps } from 'react';

import {
  Wrapper,
} from '../../types';

export const getPropApplicatorWrapper = <
  V,
  P extends string
>(propName: P, value: V): Wrapper<{[f in P]?: boolean}, P> => Elem => props => {
    const { [propName]: needApply = false, ...rest } = props;

    return (
      <Elem
        {...{
          ...rest,
          [propName]: needApply ? value : undefined,
        } as ComponentProps<typeof Elem>}
      />
    );
  };
