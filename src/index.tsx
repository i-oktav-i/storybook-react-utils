import {
  useEffect,
  VFC,
  useState,
  useCallback,
  CSSProperties,
} from 'react';
import { useDispatch } from 'react-redux';
import { Story } from '@storybook/react';
import { mergeWithCustomize } from 'webpack-merge';

import {
  UnknownObj,
  Falsy,
  StoryArgTypes,
  StoryConfig,
  Wrapper,
  ArgTypesControl,
  ControlsOptions,
  ControlType,
} from './types';

export type {
  Wrapper,
  ArgTypesControl,
  StoryConfig,
  StoryArgTypes,
  ControlsOptions,
  ControlType,
};

/* Function to patch default story config with target */
export const merge = mergeWithCustomize<Record<string, unknown>>({
  customizeObject: (first, second, key) => {
    if (['args', 'argTypes'].includes(key)) {
      return {
        ...(first || {}),
        ...(second || {}),
      };
    }

    return undefined;
  },
});

/**
 *
 * @param Component - Story component
 * @param displayName - Name for JXS example in story docs page
 * @returns story template with the enhanced typings
 */
const getStoryTemplate = <P extends UnknownObj>(
  Component: VFC<P>,
  displayName = Component.displayName || 'Component',
): Story<P> => {
  const Cmp: VFC<P> = (props: P) => <Component {...props} />;
  Cmp.displayName = displayName;

  return (props: P) => <Cmp {...props} />;
};

/**
 *
 * @param template - story template
 * @param config - story config
 * @returns new story with the applied config
 */
const getStory = <P extends UnknownObj>(
  template: Story<P>,
  config: StoryConfig<P> = {},
) => {
  const story = template.bind({});
  Object.assign(story, config);

  return story;
};

/**
 *
 * @param Component -  Story component
 * @param defaultConfig - Default story config
 * @param displayName - Name for the JXS example in the story docs page
 * @returns an stories factory that accepts patch for default config
 */
export const getStoryCreator = <P extends UnknownObj>(
  Component: VFC<P>,
  defaultConfig: StoryConfig<P> = {},
  displayName = Component.displayName,
) => {
  const t = getStoryTemplate(Component, displayName);

  /* eslint-disable no-param-reassign */
  defaultConfig.args ||= {};
  defaultConfig.argTypes ||= {};
  /* eslint-enable no-param-reassign */

  return (config: StoryConfig<P> = {}) => getStory(t, merge(defaultConfig, config));
};

/**
 *
 * @param fieldName - name of the props field to get the value of the argument for the action
 * @param action - action creator or thunk action
 * @param init - initial value for reset
 * @returns HOC for component
 */

export const getStorePropertyWrapper = <
  Field extends string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ActionCreator extends (args: any) => unknown,
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
  ): Wrapper<{ [f in Field]: Parameters<typeof action>[0] }> => Elem => props => {
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

      if (init !== undefined) {
        return () => { setData(init); };
      }

      return undefined;
    }, [setData, props]);

    return isDataLoaded
      ? <Elem {...props} />
      : null;
  };

type ContainerProps = {
  containerWidth: number,
  containerHeight: number,
  containerStyles?: CSSProperties
}

export const containerWrapperArgTypes: StoryArgTypes<ContainerProps> = {
  containerWidth: {
    defaultValue: 300,
    control:      {
      type: 'range',
      min:  0,
      max:  1000,
    },
    description: 'Not component property',
  },
  containerHeight: {
    defaultValue: 200,
    control:      {
      type: 'range',
      min:  0,
      max:  1000,
    },
    description: 'Not component property',
  },
  containerStyles: {
    table: { disable: true },
  },
};
export const containerWrapper: Wrapper<ContainerProps> = Elem => props => {
  const { containerWidth, containerHeight, containerStyles = {} } = props;

  return (
    <div
      style={{
        width:  containerWidth || 'auto',
        height: containerHeight || 'auto',
        ...containerStyles,
      }}
    >
      <Elem {...props} />
    </div>
  );
};

type CssVar = `--${string}`

/**
 * @param { string } name - name of css variable
 * @param { ArgTypesControl } [control = { type: 'text' }] - control config
 * @returns wrapper for component that have css params
 */
export const getCssVarWrapper = <
  F extends CssVar,
  Props extends UnknownObj = { [p in F]: string }
  >(
    name: F,
    control: ArgTypesControl = { type: 'text' },
  ): [Wrapper<Props>, StoryArgTypes<Props>] => [
    Elem => props => {
      const { [name]: value } = props;

      return (
        <div style={{
          [name]: value,
        }}
        >
          <Elem {...props} />
        </div>
      );
    },
    {
      [name]: { control },
    } as StoryArgTypes<Props>,
  ];

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

/* eslint-disable max-len */
export function compose<P1 extends UnknownObj>(w1: Wrapper<P1>): Wrapper<P1>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>): Wrapper<P1 & P2>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>): Wrapper<P1 & P2 & P3>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>, w4: Wrapper<P4>): Wrapper<P1 & P2 & P3 & P4>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj, P5 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>, w4: Wrapper<P4>, w5: Wrapper<P5>): Wrapper<P1 & P2 & P3 & P4 & P5>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj, P5 extends UnknownObj, P6 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>, w4: Wrapper<P4>, w5: Wrapper<P5>, w6: Wrapper<P6>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj, P5 extends UnknownObj, P6 extends UnknownObj, P7 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>, w4: Wrapper<P4>, w5: Wrapper<P5>, w6: Wrapper<P6>, w7: Wrapper<P7>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj, P5 extends UnknownObj, P6 extends UnknownObj, P7 extends UnknownObj, P8 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>, w4: Wrapper<P4>, w5: Wrapper<P5>, w6: Wrapper<P6>, w7: Wrapper<P7>, w8: Wrapper<P8>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj, P5 extends UnknownObj, P6 extends UnknownObj, P7 extends UnknownObj, P8 extends UnknownObj, P9 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>, w4: Wrapper<P4>, w5: Wrapper<P5>, w6: Wrapper<P6>, w7: Wrapper<P7>, w8: Wrapper<P8>, w9: Wrapper<P9>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj, P5 extends UnknownObj, P6 extends UnknownObj, P7 extends UnknownObj, P8 extends UnknownObj, P9 extends UnknownObj, P10 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>, w4: Wrapper<P4>, w5: Wrapper<P5>, w6: Wrapper<P6>, w7: Wrapper<P7>, w8: Wrapper<P8>, w9: Wrapper<P9>, w10: Wrapper<P10>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj, P5 extends UnknownObj, P6 extends UnknownObj, P7 extends UnknownObj, P8 extends UnknownObj, P9 extends UnknownObj, P10 extends UnknownObj>(w1: Wrapper<P1>, w2?: Wrapper<P2> | Falsy, w3?: Wrapper<P3> | Falsy, w4?: Wrapper<P4> | Falsy, w5?: Wrapper<P5> | Falsy, w6?: Wrapper<P6> | Falsy, w7?: Wrapper<P7> | Falsy, w8?: Wrapper<P8> | Falsy, w9?: Wrapper<P9> | Falsy, w10?: Wrapper<P10> | Falsy) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (E: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let res: any = w1(E);

    if (w2) res = w2(res);
    if (w2) res = w2(res);
    if (w3) res = w3(res);
    if (w4) res = w4(res);
    if (w5) res = w5(res);
    if (w6) res = w6(res);
    if (w7) res = w7(res);
    if (w8) res = w8(res);
    if (w9) res = w9(res);
    if (w10) res = w10(res);

    return res;
  };
}
/* eslint-enable max-len */
