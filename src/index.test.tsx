import { VFC } from 'react';

import {
  getStoryCreator,
} from '.';

const Comp: VFC<{a: string, b: number, c: {d?: string, e?: number}}> = () => <div />;

describe('Library testing', () => {
  it('Configs merge test', () => {
    const getStory = getStoryCreator(Comp, {
      args: {
        a: 'asdf',
        c: { d: 'qwer' },
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
    });

    const Story = getStory({
      args: {
        b: 1234,
        c: { e: 2345 },
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
    });

    expect(Story.args).toEqual({
      a: 'asdf',
      b: 1234,
      c: { e: 2345 },
    });

    expect(Story.argTypes).toEqual({
      a: { control: { type: 'text' } },
      b: { table: { disable: true } },
      c: { table: { disable: true } },
    });

    expect(Story.parameters).toEqual({
      controls: {
        exclude: ['a', 'b'],
        include: ['a'],
      },
    });
  });
});
