import { VFC } from 'react';
import { render } from '@testing-library/react';

import { StoryConfig } from 'types';

import { getStoryCreator } from './getStoryCreator';

type TestCompProps = {
  a?: string,
  b?: number,
  c?: {
    d?: string,
    e?: number
  }
  elem?: JSX.Element
}
const TestComp: VFC<TestCompProps> = ({
  a, b, c, elem,
}) => (
  <div>
    {a}
    {b}
    {c?.d}
    {c?.e}
    {elem}
  </div>
);

const defaultJsxProp = <div />;
const newJsxProp = <span />;

const defaultConf: StoryConfig<TestCompProps> = {
  args: {
    a:    'asdf',
    c:    { d: 'qwer' },
    elem: defaultJsxProp,
  },
  argTypes: {
    a: { table: { disable: true } },
    c: { table: { disable: true } },
  },
  parameters: {
    controls: {
      exclude: ['a'],
    },
  },
};

const newConf: StoryConfig<TestCompProps> = {
  args: {
    b:    1234,
    c:    { e: 2345 },
    elem: newJsxProp,
  },
  argTypes: {
    a: { control: { type: 'text' } },
    b: { table: { disable: true } },
  },
  parameters: {
    controls: {
      exclude: ['b'],
      include: ['a'],
    },
  },
};
const expectedMergedConf: StoryConfig<TestCompProps> = {
  args: {
    a:    'asdf',
    b:    1234,
    c:    { e: 2345 },
    elem: newJsxProp,
  },
  argTypes: {
    a: { control: { type: 'text' } },
    b: { table: { disable: true } },
    c: { table: { disable: true } },
  },
  parameters: {
    controls: {
      exclude: ['a', 'b'],
      include: ['a'],
    },
  },
};

describe('getStoryCreator tests', () => {
  describe('Configs merge test', () => {
    it('With empty default', () => {
      const getStory = getStoryCreator(TestComp);
      const Story = getStory(newConf);

      expect(Story.args).toEqual(newConf.args);
      expect(Story.argTypes).toEqual(newConf.argTypes);
      expect(Story.parameters).toEqual(newConf.parameters);
    });

    it('With empty patch', () => {
      const getStory = getStoryCreator(TestComp, defaultConf);
      const Story = getStory();

      expect(Story.args).toEqual(defaultConf.args);
      expect(Story.argTypes).toEqual(defaultConf.argTypes);
      expect(Story.parameters).toEqual(defaultConf.parameters);
    });

    it('Merge two configs', () => {
      const getStory = getStoryCreator(TestComp, defaultConf);
      const Story = getStory(newConf);

      expect(Story.args).toEqual(expectedMergedConf.args);
      expect(Story.argTypes).toEqual(expectedMergedConf.argTypes);
      expect(Story.parameters).toEqual(expectedMergedConf.parameters);
    });
    it('Merge two empty', () => {
      const getStory = getStoryCreator(TestComp);
      const Story = getStory();

      expect(Story.args).toEqual({});
      expect(Story.argTypes).toEqual({});
      expect(Story.parameters).toBeFalsy();
    });
  });

  describe('is story equal to initial component', () => {
    it('empty default', () => {
      const getStory = getStoryCreator(TestComp);
      const Story = getStory();

      const { container: story } = render(<Story {...newConf.args} />);
      const { container: comp } = render(<TestComp {...newConf.args} />);

      expect(story.innerHTML).toEqual(comp.innerHTML);
    });
  });
});
