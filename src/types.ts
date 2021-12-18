import { ArgTypes as ArgsTypes, Story } from '@storybook/react';
import { JSXElementConstructor, VFC } from 'react';

export type UnknownObj = Record<string, unknown>
export type Falsy = false | null | undefined

/* Gets all possible union type keys */
type AllKeys<T extends UnknownObj> = T extends T ? keyof T : never;
/* Gets the key type in the union */
type PickType<T extends UnknownObj, K extends AllKeys<T>> = T extends { [k in K]?: unknown }
  ? T[K]
  : undefined;

/* Gets merged union type with all possible fields and their types */
export type MergeUnion<Union extends UnknownObj> = {
  [k in AllKeys<Union>]: PickType<Union, k>;
}

export type ControlsTypes =
  'boolean' |
  'number' |
  'range' |
  'object' |
  'array' |
  'file' |
  'radio' |
  'inline-radio' |
  'check' |
  'inline-check' |
  'select' |
  'multi-select' |
  'text' |
  'color' |
  'date'

type NumbersOptions = {
  min?: number
  max?: number
  step?: number
}

type ColorOptions = {
  presetColors?: (string | {color: string, title: string})[]
}

type FileOptions = {
  accept: string | string[]
}

interface ControlsOptions extends Record<ControlsTypes, UnknownObj> {
  number: NumbersOptions
  range: NumbersOptions
  color: ColorOptions
  date: FileOptions
}

type ArgsTypesControl = ({
  [k in ControlsTypes]: {
    type: k
  } & ControlsOptions[k]
})[ControlsTypes]

/* Provides typings for controls field in story Parameters property */
export type StoryParams<ComponentProps extends UnknownObj> = {
  controls?: {
    include?: (keyof ComponentProps)[]
    exclude?: (keyof ComponentProps)[]
  }
  [x: string]: unknown
}

/* Provides typings for ArgTypes story property */
export type StoryArgTypes<ComponentProps extends UnknownObj> = {
  [prop in keyof ComponentProps]?: ArgsTypes[string] & {
    defaultValue?: ComponentProps[prop]
    control?: ArgsTypesControl
    table?: {
      disable?: boolean
      [x: string]: unknown
    }
    [x: string]: unknown
  }
}

/* Applying typings for stories */
export type StoryConf<
  ComponentProps extends UnknownObj,
  MergedComponentProps extends UnknownObj = MergeUnion<ComponentProps>
> = Partial<Story<ComponentProps>> & {
  parameters?: StoryParams<MergedComponentProps>
  argTypes?: StoryArgTypes<MergedComponentProps>
}

export type Wrapper<E extends UnknownObj> = <ComponentProps extends Record<string, unknown>>(
  Elem: JSXElementConstructor<ComponentProps>
) => VFC<ComponentProps & E>
