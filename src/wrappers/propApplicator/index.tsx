import { ComponentProps } from 'react';

import {
  Wrapper,
  StoryArgTypes,
  UnknownObj,
} from '../../types';

export const getPropApplicatorWrapper = <
  Value,
  PropName extends string,
  Props extends UnknownObj = { [p in PropName]?: boolean },
>(propName: PropName, value: Value): [
    Wrapper<Props, PropName>,
    StoryArgTypes<Props>,
] => {
  const wrapper: Wrapper<Props, PropName> = Elem => props => {
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

  const argType: StoryArgTypes<Props> = {
    [propName]: { control: { type: 'boolean' } },
  } as StoryArgTypes<Props>;

  return [wrapper, argType];
};
