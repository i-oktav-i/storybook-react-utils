# storybook-react-utils

[![codecov](https://codecov.io/gh/i-oktav-i/storybook-react-utils/branch/master/graph/badge.svg)](https://codecov.io/gh/i-oktav-i/storybook-react-utils)
[![GitHub license](https://img.shields.io/github/license/i-oktav-i/storybook-react-utils)](https://github.com/i-oktav-i/storybook-react-utils/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dm/storybook-react-utils)](https://www.npmjs.com/package/storybook-react-utils)
[![npm](https://img.shields.io/npm/v/storybook-react-utils)](https://www.npmjs.com/package/storybook-react-utils)

This package provides:
* story creator with enhanced typings
* story Wrapper type
* [containerWrapper](#container-wrapper) wrapper for stretchable components
* [getStorePropertyWrapper](#get-store-property-wrapper) wrapper creator for Redux/Redux-thunk store action dispatching
* [getCssVarWrapper](#get-css-var-wrapper) wrapper creator for css variables managing
* [getValueControlWrapper](#get-value-control-wrapper) wrapper creator for controlled value
* [getPropApplicatorWrapper](#get-prop-applicator-wrapper) wrapper creator for prop applicator
* [refWrapper](#ref-wrapper) wrapper that provides `ref` prop
* [getPropFlatterWrapper](#get-prop-flatter-wrapper) wrapper creator that replace object prop with its fields __(or fields proxies)__
* [getSelectorWrapper](#get-selector-wrapper) wrapper creator for providing props from redux store
* wrappers [composer](#compose).

## How to use

```ts
// Component.jsx
import { VFC } from 'react'

export type ComponentProps = {
  /* Component props */
}

export const Component: VFC<ComponentProps> = () => {
  /* your component code */
};

// Component.stories.jsx
import { Meta } from '@storybook/react';
import { getStoryCreator } from 'storybook-react-utils';
import { Component, ComponentProps } from './Component';

const componentMeta: Meta<SubstrateProps> = {
  component: Substrate,
  title:     'Util Components / Substrate',
};

export default componentMeta;

/* Init story creator */
const getStory = getStoryCreator(
  Component,
  { /* Default story config (optional) */
    args: {
      /* default args */
    },
    argTypes: {
      /* default args types */
    },
    /* ... Other story and stories plugins attributes */
  },
  "ComponentDisplayName" /* Display name (optional) */
);

/* Create story */
export const ComponentStory = getStory({
  /* Story config (optional) */
  /* Will be merged with default config */
});

/* Create another story */
export const AnotherComponentStory = getStory({
  /* Another story config (optional) */
  /* Will be merged with default config */
});
```

## Wrappers

storybook-react-utils provides one story wrapper and wrappers creator for dispatching store actions with story controls


<h3 id="container-wrapper">
  <code>containerWrapper</code>
</h3>

Provides `containerWidth` and `containerHeight` story controls for stretchable components.   
Сan also get the `containerStyles` prop

```ts
import {
  containerWrapper,
  containerWrapperArgTypes,
  getStoryCreator,
} from 'storybook-react-utils';

import { Component } from './Component';

const wrapped = containerWrapper(Component)

const getStory = getStoryCreator(wrapped, {
  argTypes: {
    ...containerWrapperArgTypes, /* Default wrapper controls config */
    /* Equals to
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
    }, */
  }
});
```

<h3 id="get-store-property-wrapper">
  <code>getStorePropertyWrapper</code>
</h3>

Creates a wrapper with which you can change the store state

```ts
import { getStorePropertyWrapper } from 'storybook-react-utils';

const isMobile = getStorePropertyWrapper(
  'isMobile', /* Prop/Control name */
  setIsMobile, /* function that returns action or thunk action */
  false, /* if provided dispatch(setIsMobile(false)) will be called on unmount (optional) */
);

```

<h3 id="get-css-var-wrapper">
  <code>getCssVarWrapper</code>
</h3>

Creates wrapper and argsTypes for css variable. By default controls type is `{type: 'text'}`, another control config can be provided with second argument

```ts
import {
  getCssVarWrapper,
  getStoryCreator,
} from 'storybook-react-utils';
import { Component } from './Component';

const [paddingWrapper, paddingWrapperArgType] = getCssVarWrapper('--my-padding-var'/*, {
  type: 'range',
  min: 1,
  max: 3,
  step: 1,
}*/);

const wrapped = paddingWrapper(Component)

const getStory = getStoryCreator(wrapped, {
  argType: {
    ...paddingWrapperArgType,
  },
});

```

<h3 id="get-value-control-wrapper">
  <code>getValueControlWrapper</code>
</h3>

Creates a wrapper for components that have two-way data bindings
If the value is changed using the control panel, it will be overwritten

```ts
/* Component.tsx */
type ComponentProps = {
  inputValue: string
  onInput: (newValue: string) => void
}

export const Component: VFC<ComponentProps> = ({
  inputValue,
  onInput,
}) => {
  return (
    <input
      value={inputValue}
      onInput={onInput}
    />
  );
};

/* Component.stories.tsx */
import { getValueControlWrapper, getStoryCreator } from 'storybook-react-utils';
import { Component } from './Component';

// Some code

const valueControlWrapper = getValueControlWrapper(
  'inputValue', /* default value - 'value' */
  'onInput', /* default value - 'onChange' */
);

const wrapped = valueControlWrapper(Component);
const getStory = getStoryCreator(wrapped);

export const Default = getStory();
```

<h3 id="get-prop-applicator-wrapper">
  <code>getPropApplicatorWrapper</code>
</h3>

Creates a wrapper that replace prop with boolean prop, and apply provided value when it's true of `undefined` when it's false

```tsx
import {
  getPropApplicatorWrapper,
  getStoryCreator,
} from 'storybook-react-utils';
import { Component } from './Component';

const iconApplicator = getPropApplicatorWrapper('icon', (
  <div>
    icon
  </div>
));

const wrapped = iconApplicator(Component);

const getStory = getStoryCreator(wrapped);

export const Default = getStory({args: {icon: true}});

```

<h3 id="ref-wrapper">
  <code>refWrapper</code>
</h3>

Provides ref prop into component. Need when create stories for `forwardRef(Comp)`

```tsx
import {
  refWrapper,
  getStoryCreator,
} from 'storybook-react-utils';

const Comp = forwardRef<
  HTMLInputElement,
  {}
>((props, ref) => <input ref={ref} />);

const wrapped = refWrapper(TestComp);

const getStory = getStoryCreator(wrapped);
const Default = getStory();
```

<h3 id="get-prop-flatter-wrapper">
  <code>getPropFlatterWrapper</code>
</h3>

This wrapper replace object prop with its fields __(can be proxied)__. __NOTE:__ because of typing restrictions, it is required to call the function twice. First time without arguments and with generic param to provide typings, and second time just with arguments.

```tsx
/* ./Component.tsx */
import { VFC } from 'react';

export type ComponentProps = {
  objProp: {
    first: string
    second: number
    third: boolean
  }
  third: any
}

export const Component: VFC<ComponentProps> = props => {/* code */};

/* ./Component.stories.tsx */
import {
  getStoryCreator,
  getPropFlatterWrapper,
} from 'storybook-react-utils';

import { Component, ComponentProps } from './Component';

const objPropWrapper = getPropFlatterWrapper<ComponentProps['objProp']>()(
  'objProp', /* name of prop, that need to replace */
  {
    first: true, /* in controls will have same name */
    second: true,
    third: 'objProp.third', /* in controls with have 'thirdProxy' to avoid identical names  */
  },
);

const wrapped = objPropWrapper(Component);
const getStory = getStoryCreator(wrapped, {
  args: {
    first: '',
    second: 0,
    'objProp.third': true,
    third: {},
  }
});

```

Do not forget, that `getPropFlatterWrapper` can be used with `getValueControlWrapper`, `getPropApplicatorWrapper` and on object in object

```tsx

/* ./Component.tsx */
import { VFC } from 'react';

type Data = {
  first: string
  second: number
  thirdObj: {
    innerFirst: string
    innerSecond: string
  }
}
export type ComponentProps = {
  value: Data
  onChange: (newValue: Data) => void
}

export const Component: VFC<ComponentProps> = props => {/* code */};


/* ./Component.stories.tsx */
import {
  getStoryCreator,
  getPropFlatterWrapper,
  getValueControlWrapper,
  compose,
} from 'storybook-react-utils';
import { Component, ComponentProps } from './Component';

const valueWrapper = getPropFlatterWrapper<ComponentProps['value']>()('value', {
  first: 'value.first',
  second: 'value.second',
  thirdObj: 'value.thirdObj',
});

const valueThirdObjWrapper = getPropFlatterWrapper<ComponentProps['value']['thirdObj']>()(
  'value.thirdObj', 
  {
    innerFirst: 'value.thirdObj.innerFirst',
    innerSecond: 'value.thirdObj.innerSecond',
  },
);

const wrapped = compose(
  /* Do not forget, this is order sensitive */
  getValueControlWrapper(),
  valueWrapper,
  valueThirdObjWrapper,
)(Component);

```


<h3 id="get-selector-wrapper">
  <code>getSelectorWrapper</code>
</h3>

creates wrapper that gets value from redux store and provide into a component as prop

```tsx
import { getSelectorWrapper } from 'storybook-react-utils';
import { Component } from './Component';

const valueWrapper = getSelectorWrapper(
  'propName', /* Name of prop to provide stored value */
  (store/*: AppStore */) => store.value, /* getter from store, provides into useSelector */
);

const wrapped = valueWrapper(Component);
```


<h3 id="compose">
  <code>compose</code>
</h3>


This function compose wrappers into one

```ts
import { compose } from 'storybook-react-utils';
import { Component } from './Component';

// Some code

const wrapped = compose(
  wrapper1,
  wrapper2,
  wrapper3,
  wrapper4,
  // ...
)(Component)

```

### type `Wrapper`

Type of wrapper function to enhance props types for controls addon

```tsx
import { Wrapper } from 'storybook-react-utils';

type MyWrapperProps = {
  /* Wrapper props */
}

type PropsToOmit = 'prop1' | 'prop2'

const myWrapper: Wrapper<
  MyWrapperProps, 
  /* PropsToOmit, // if need to omit props */
> = (
  Elem // Component to wrap
) => (
  props // will be equal tp (Omit<ComponentProps<typeof Elem>, PropsToOmit> & MyWrapperProps)
) => {
  /* Code here */

  return (
    /* Additional elements and containers */
    <Elem {...props}>
  );
}
```

### Exported types

```ts

export type {
  Wrapper, /* Type for wrapper function */
  StoryConfig, /* Story config type */
  StoryArgTypes, /* Story config argTypes filed type */
  ArgTypesControl, /* Type of control field in argTypes */
  ControlType, /* Union of control type (except null) */
  ControlsOptions, /* Map of ControlType and addition options  */
};
```

## TODO

* Allow provide `forwardRef()` components as wrapper argument