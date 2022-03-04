import { render, screen } from '@testing-library/react';
import { VFC } from 'react';

import { getPropFlatterWrapper } from '.';

type TestProps = {
  a: {
    a: string
    b: number
    c: boolean
  }
}

const Test: VFC<TestProps> = ({
  a: {
    a,
    b,
    c,
  },
}) => (
  <div>
    <span>{a}</span>
    <span>{b}</span>
    {c ? <span>true</span> : <span>false</span>}
  </div>
);

describe('prop flatter', () => {
  it('without proxy', () => {
    const wrapper = getPropFlatterWrapper<TestProps['a']>()('a', {
      a: true,
      b: true,
      c: true,
    });

    const Wrapped = wrapper(Test);

    const { rerender } = render(<Wrapped a="qwer" b={1234} c />);

    expect(screen.getByText('qwer')).toBeInTheDocument();
    expect(screen.getByText(1234)).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();

    rerender(<Wrapped a="asdf" b={4321} c={false} />);

    expect(screen.getByText('asdf')).toBeInTheDocument();
    expect(screen.getByText(4321)).toBeInTheDocument();
    expect(screen.getByText('false')).toBeInTheDocument();
  });

  it('with proxy', () => {
    const wrapper = getPropFlatterWrapper<TestProps['a']>()('a', {
      a: 'aProxy',
      b: 'bProxy',
      c: 'cProxy',
    });

    const Wrapped = wrapper(Test);

    const { rerender } = render(<Wrapped aProxy="qwer" bProxy={1234} cProxy />);

    expect(screen.getByText('qwer')).toBeInTheDocument();
    expect(screen.getByText(1234)).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();

    rerender(<Wrapped aProxy="asdf" bProxy={4321} cProxy={false} />);

    expect(screen.getByText('asdf')).toBeInTheDocument();
    expect(screen.getByText(4321)).toBeInTheDocument();
    expect(screen.getByText('false')).toBeInTheDocument();
  });
});
