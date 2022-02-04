# storybook-react-utils

[![codecov](https://codecov.io/gh/i-oktav-i/storybook-react-utils/branch/master/graph/badge.svg)](https://codecov.io/gh/i-oktav-i/storybook-react-utils)


This package provides:
* story creator with enhanced typings
* story Wrapper type
* [containerWrapper](#containerWrapper) wrapper for stretchable components
* [getStorePropertyWrapper](#getStorePropertyWrapper) wrapper creator for Redux/Redux-thunk store action dispatching
* [getCssVarWrapper](#getCssVarWrapper) wrapper creator for css variables managing
* [getValueControlWrapper](#getValueControlWrapper) wrapper creator for controlled value
* wrappers [composer](#compose).

TS is not required

---

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


<h3 id="containerWrapper">
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

<h3 id="getStorePropertyWrapper">
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

<h3 id="getCssVarWrapper">
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

<h3 id="getValueControlWrapper">
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

```ts
import { Wrapper } from 'storybook-react-utils';

type MyWrapperProps = {
  /* Wrapper props */
}

const myWrapper: Wrapper<MyWrapperProps> = Elem => props => {
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
