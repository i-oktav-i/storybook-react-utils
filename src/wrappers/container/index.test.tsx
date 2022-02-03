import { render } from '@testing-library/react';
import { VFC } from 'react';

import { containerWrapper } from '.';

const TestComp: VFC = () => <div />;

const Wrapped = containerWrapper(TestComp);

describe('containerWrapper', () => {
  it('styles test', () => {
    const { container, rerender } = render(<Wrapped containerWidth={100} containerHeight={100} />);
    expect(container.firstChild).toHaveStyle({
      width:  '100px',
      height: '100px',
    });

    rerender(<Wrapped containerWidth={200} containerHeight={200} />);
    expect(container.firstChild).toHaveStyle({
      width:  '200px',
      height: '200px',
    });
    rerender(<Wrapped
      containerWidth={0}
      containerHeight={0}
      containerStyles={{
        backgroundColor: 'red',
      }}
    />);
    expect(container.firstChild).toHaveStyle({
      width:           'auto',
      height:          'auto',
      backgroundColor: 'red',
    });
  });
});
