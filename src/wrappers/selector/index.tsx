import { ComponentProps } from 'react';
import { useSelector } from 'react-redux';

import { UnknownObj, Wrapper } from 'typings/types';

export const getSelectorWrapper = <
  PropName extends string,
  Store extends UnknownObj,
  Selected,
// eslint-disable-next-line @typescript-eslint/ban-types
>(propName: PropName, getter: (store: Store) => Selected): Wrapper<{}, PropName> => Elem => props => {
    const value = useSelector(getter);

    return <Elem {...{ ...props, [propName]: value } as ComponentProps<typeof Elem>} />;
  };
