import { render } from '@testing-library/react';
import { VFC } from 'react';

import { getPropApplicatorWrapper } from '.';

type TestCompProps = {
  value?: string
}

const defaultString = 'default string';
const TestComp: VFC<TestCompProps> = ({
  value = defaultString,
}) => (
  <div>
    {value}
  </div>
);

const applicableValue = 'applicable value';
const [valueApplicator, argTypes] = getPropApplicatorWrapper('value', applicableValue);

const Wrapped = valueApplicator(TestComp);

describe('props applier', () => {
  it('value apply test', () => {
    const { rerender, getByText } = render(<Wrapped value />);

    expect(getByText(applicableValue)).toBeInTheDocument();

    rerender(<Wrapped />);

    expect(getByText(defaultString)).toBeInTheDocument();

    rerender(<Wrapped value />);

    expect(getByText(applicableValue)).toBeInTheDocument();
  });

  it('arg types test', () => {
    expect(argTypes).toEqual({ value: { type: 'boolean' } });
  });
});
