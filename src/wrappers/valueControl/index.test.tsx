import { VFC } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getValueControlWrapper } from '.';

describe('getValueControlWrapper', () => {
  it('value changing test', () => {
    type ControlProps = {
      onInput: (newValue: string) => void
      inputValue: string
    }

    const wrapper = getValueControlWrapper('inputValue', 'onInput');
    const Wrapped = wrapper((({
      inputValue,
      onInput,
    }) => (
      <input
        value={inputValue}
        onInput={e => onInput((e.target as HTMLInputElement).value)}
      />
    )) as VFC<ControlProps>);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { rerender } = render(<Wrapped inputValue="" />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('');

    const typedText = 'text';
    userEvent.type(screen.getByRole('textbox'), typedText);

    expect(input).toHaveValue(typedText);

    const newValue = 'NewValue';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rerender(<Wrapped inputValue={newValue} />);
    expect(input).toHaveValue(newValue);
  });

  it('default props names test', () => {
    type ControlProps = {
      onChange: (newValue: string) => void
      value: string
    }

    const wrapper = getValueControlWrapper();
    const Wrapped = wrapper((({
      value,
      onChange,
    }) => (
      <input
        value={value}
        onInput={e => onChange((e.target as HTMLInputElement).value)}
      />
    )) as VFC<ControlProps>);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(<Wrapped value="" />);

    const input = screen.getByRole('textbox');
    const typedText = 'text';
    userEvent.type(screen.getByRole('textbox'), typedText);

    expect(input).toHaveValue(typedText);
  });
});
