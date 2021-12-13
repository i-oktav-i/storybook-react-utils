import { ArgTypes, Story } from '@storybook/react';
import { JSXElementConstructor, VFC } from 'react';

export type UnknownObj = Record<string, unknown>
export type Falsy = false | null | undefined

/* Provides typings for controls field in story Parameters property */
export type StoryParams<P extends UnknownObj> = {
  controls?: {
    include?: (keyof P)[]
    exclude?: (keyof P)[]
  }
  [x: string]: unknown
}

/* Provides typings for ArgTypes story property */
export type StoryArgTypes<P extends UnknownObj> = {
  [prop in keyof P]?: ArgTypes[string] & {
    defaultValue?: P[prop]
    control?: {
      type?: null | string
      [x: string]: unknown
    }
    table?: {
      disable?: boolean
      [x: string]: unknown
    }
    [x: string]: unknown
  }
}

/* Applying typings for stories */
export type StoryConf<P extends UnknownObj> = Partial<Story<P>> & {
  parameters?: StoryParams<P>
  argTypes?: StoryArgTypes<P>
}

export type Wrapper<E extends UnknownObj> =
  <P extends Record<string, unknown>>(Elem: JSXElementConstructor<P>) => VFC<P & E>
