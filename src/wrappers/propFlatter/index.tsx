import { ComponentProps } from 'react';

import { UnknownObj, Wrapper } from 'typings/types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type Swap<T extends UnknownObj> = { [K in keyof T as (T[K] extends boolean ? K : T[K])]: K }
type Enhance<S extends UnknownObj, M extends Record<string, string | true>> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  [k in keyof Swap<M>]: S[Swap<M>[k]]
}

export const getPropFlatterWrapper = <Scheme extends UnknownObj>() => {
  // eslint-disable-next-line max-len
  const getWrapper = <
    PropName extends string,
    F extends string | true,
    Keys extends Record<keyof Scheme, F>
  >(propName: PropName, keysList: Keys): Wrapper<Enhance<Scheme, Keys>, PropName> => {
    const objKeys = Object.keys(keysList) as (keyof Scheme)[];
    const propKeys = objKeys
      .map(item => (keysList[item] === true ? item : keysList[item]) as keyof Enhance<Scheme, Keys>);

    return Elem => props => {
      const objProp = objKeys.reduce((memo, key, index) => {
        // eslint-disable-next-line no-param-reassign, react/destructuring-assignment
        memo[key] = props[propKeys[index]] as unknown as Scheme[typeof key];

        return memo;
      }, {} as Scheme);

      return <Elem {...{ ...props, [propName]: objProp } as ComponentProps<typeof Elem>} />;
    };
  };

  return getWrapper;
};
