import { render } from '@testing-library/react';
import { VFC } from 'react';

import { ArgTypesControl } from 'types';

import { getCssVarWrapper } from '.';

const TestComp: VFC = () => <div />;

describe('getCssVarWrapper', () => {
  it('wrapper test', () => {
    const [wrapper] = getCssVarWrapper('--test');
    const Wrapped = wrapper(TestComp);

    const firstValue = { '--test': 'red' };
    const secondValue = { '--test': 'green' };

    const { rerender, container } = render(<Wrapped {...firstValue} />);

    expect(container.firstChild).toHaveStyle(firstValue);

    rerender(<Wrapped {...secondValue} />);

    expect(container.firstChild).toHaveStyle(secondValue);
  });

  it('default agsTypes test', () => {
    const [, wrapperArgTypes] = getCssVarWrapper('--test');

    expect(wrapperArgTypes['--test']).toEqual({ control: { type: 'text' } });
  });

  it('custom agsTypes test', () => {
    const controlConfig: ArgTypesControl = { type: 'color', presetColors: ['#fff'] };
    const [, wrapperArgTypes] = getCssVarWrapper('--test', controlConfig);

    expect(wrapperArgTypes['--test']).toEqual({ control: controlConfig });
  });

  it('equality with self made wrapper', () => {
    const [wrapper] = getCssVarWrapper('--test');
    const Wrapped = wrapper(() => <div />);

    const { container: wrappedNode } = render(<Wrapped {...{ '--test': 'red' }} />);
    const { container: selfMadeNode } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <div style={{ '--test': 'red' }}>
        <div />
      </div>,
    );

    expect(wrappedNode.innerHTML).toEqual(selfMadeNode.innerHTML);
  });
});
