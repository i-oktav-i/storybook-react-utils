# storybook-react-utils

Provides story creator with enhanced typings, story Wrapper type, wrapper creator for Redux/Redux-thunk store action dispatching and wrappers composer.

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
    argsTypes: {
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

### `containerWrapper`

Provides `width` and `height` story controls for stretchable components.   
Сan also get the `style` prop

```ts
import {
  containerWrapper,
  containerWrapperArgTypes,
  getStoryCreator,
} from 'storybook-react-utils';

import { Component } from './Component';

const wrapped = containerWrapper(Component)

const getStory = getStoryCreator(wrapped, {
  argsTypes: {
    ...containerWrapperArgTypes, /* Default wrapper controls config */
    /* Equals to
    width: {
      defaultValue: 300,
      control:      {
        type: 'range',
        min:  0, // 0 === 'auto'
        max:  1000,
      },
    },
    height: {
      defaultValue: 200,
      control:      {
        type: 'range',
        min:  0, // 0 === 'auto'
        max:  1000,
      },
    },
    styles: {
      table: { disable: true },
    }, */
  }
});
```
### `getStorePropertyWrapper`

Creates a wrapper with which you can change the store state

```ts
import { getStorePropertyWrapper } from 'storybook-react-utils';

const isMobile = getStorePropertyWrapper(
  'isMobile', /* Prop/Control name */
  setIsMobile, /* function that returns action or thunk action */
  false, /* if provided dispatch(setIsMobile(false)) will be called on unmount (optional) */
);

```

### `compose`

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