import { VFC } from 'react';
import { Story } from '@storybook/react';
import { mergeWithCustomize } from 'webpack-merge';

import { UnknownObj, StoryConfig } from 'typings/types';

/* Function to patch default story config with target */
const merge = mergeWithCustomize<Record<string, unknown>>({
  customizeObject: (first, second, key) => {
    if (['args', 'argTypes'].includes(key)) {
      return {
        ...first,
        ...second,
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
  config: StoryConfig<P>,
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
