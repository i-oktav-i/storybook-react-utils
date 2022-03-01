import { ArgTypes, Story } from '@storybook/react';
import {
  ForwardRefExoticComponent,
  JSXElementConstructor,
  RefAttributes,
  VFC,
} from 'react';

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

export type ControlType =
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

export interface ControlsOptions extends Record<ControlType, UnknownObj> {
  number: NumbersOptions
  range: NumbersOptions
  color: ColorOptions
  date: FileOptions
}

export type ArgTypesControl = ({
  [k in ControlType]: {
    type: k
  } & ControlsOptions[k]
})[ControlType] | {
  type: null
}

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
  [prop in keyof ComponentProps]?: ArgTypes[string] & {
    defaultValue?: ComponentProps[prop]
    control?: ArgTypesControl
    table?: {
      disable?: boolean
      [x: string]: unknown
    }
    [x: string]: unknown
  }
}

/* Applying typings for stories */
export type StoryConfig<
  ComponentProps extends UnknownObj,
  MergedComponentProps extends UnknownObj = MergeUnion<ComponentProps>
> = Partial<Story<ComponentProps>> & {
  parameters?: StoryParams<MergedComponentProps>
  argTypes?: StoryArgTypes<MergedComponentProps>
}

export type Wrapper<
  Enhance extends UnknownObj,
  ToOmit extends string | void = void,
  /* Solve problem that type provided in O becomes string when passing in Omit */
  ToOmitCopy = ToOmit,
> = <ComponentProps extends Record<string, unknown>>(
    Elem: JSXElementConstructor<ComponentProps> |
      ForwardRefExoticComponent<ComponentProps & RefAttributes<unknown>>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
) => ToOmitCopy extends string ? VFC<Omit<ComponentProps, ToOmit> & Enhance> : VFC<ComponentProps & Enhance>
