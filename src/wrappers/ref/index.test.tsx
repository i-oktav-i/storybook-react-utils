import { forwardRef } from 'react';
import { render } from '@testing-library/react';

import { refWrapper } from '.';

// eslint-disable-next-line @typescript-eslint/ban-types
const TestComp = forwardRef<HTMLInputElement, {}>((props, ref) => <input ref={ref} />);

const Wrapped = refWrapper(TestComp);

describe('ref wrapper test', () => {
  it('check that nothing changes', () => {
    const { container: withWrap } = render(<Wrapped />);
    const { container: noWrap } = render(<TestComp />);

    expect(withWrap.innerHTML).toEqual(noWrap.innerHTML);
  });
});
