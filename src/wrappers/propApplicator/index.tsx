import { ComponentProps } from 'react';

import { ArgTypesControl } from '../..';

import {
  Wrapper,
} from '../../types';

export const getPropApplicatorWrapper = <
  V,
  P extends string
>(propName: P, value: V): [
    Wrapper<{ [p in P]?: boolean }, P>,
    {[p in P]: ArgTypesControl},
] => [
    Elem => props => {
      const { [propName]: needApply = false, ...rest } = props;

      return (
        <Elem
          {...{
            ...rest,
            [propName]: needApply ? value : undefined,
          } as ComponentProps<typeof Elem>}
        />
      );
    },
    { [propName]: { type: 'boolean' } } as {[p in P]: ArgTypesControl},
  ];
