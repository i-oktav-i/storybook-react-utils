import { useEffect, useState } from 'react';

import { Wrapper } from 'types';

/**
 * @param {string} [valuePropName = 'value'] - name of field that will be controlled
 * @param {string} [changeFunctionBPropName = 'onChange'] -
 * name of field of function to change field behind valuePropName
 * @returns wrapper for component with two-way data bindings
 */
export const getValueControlWrapper = (
  valuePropName = 'value',
  changeFunctionBPropName = 'onChange',
  // eslint-disable-next-line @typescript-eslint/ban-types
): Wrapper<{}> => Elem => props => {
  const { [valuePropName]: providedValue } = props;
  const [value, setValue] = useState(providedValue);

  useEffect(() => {
    setValue(providedValue);
  }, [providedValue]);

  const elemProps = {
    ...props,
    [valuePropName]:           value,
    [changeFunctionBPropName]: setValue,
  };

  return (
    <Elem {...elemProps} />
  );
};
