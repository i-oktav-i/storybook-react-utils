import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Wrapper } from 'types';

/**
 *
 * @param fieldName - name of the props field to get the value of the argument for the action
 * @param action - action creator or thunk action
 * @param init - initial value for reset
 * @returns HOC for component
 */
export function getStorePropertyWrapper<
  Field extends string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, function-paren-newline
  ActionCreator extends(args: any) => unknown,
>(
  fieldName: Field,
  action: ActionCreator,
  /* TODO: Remove this
      now it fixes a bug that ActionPropsType === typeof init
      but not action argument type
      it's nesses for boolean value
      (if init = false than ActionPropsType = false, not boolean)
    */
  init?: Parameters<typeof action>[0],
): Wrapper<{ [f in Field]: Parameters<typeof action>[0] }> {
  const needReset = arguments.length > 2;

  return Elem => props => {
    const dispatch = useDispatch();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const setData = useCallback(async (args: Parameters<typeof action>[0]) => {
      setIsDataLoaded(false);

      await dispatch(action(args));

      setIsDataLoaded(true);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      const { [fieldName]: field } = props;

      setData(field);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    useEffect(() => {
      if (needReset) {
        return () => { dispatch(action(init)); };
      }

      return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isDataLoaded
      ? <Elem {...props} />
      : null;
  };
}
