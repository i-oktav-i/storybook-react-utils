import { render } from '@testing-library/react';
import { VFC } from 'react';

import { getCssVarWrapper } from './wrappers/cssVar';

import { compose } from './compose';

const [wrapper1] = getCssVarWrapper('--test-1');
const [wrapper2] = getCssVarWrapper('--test-2');
const [wrapper3] = getCssVarWrapper('--test-3');
const [wrapper4] = getCssVarWrapper('--test-4');
const [wrapper5] = getCssVarWrapper('--test-5');
const [wrapper6] = getCssVarWrapper('--test-6');
const [wrapper7] = getCssVarWrapper('--test-7');
const [wrapper8] = getCssVarWrapper('--test-8');
const [wrapper9] = getCssVarWrapper('--test-9');
const [wrapper10] = getCssVarWrapper('--test-10');

const Comp: VFC = () => <div />;

const WrappedByHand = wrapper1(
  wrapper2(
    wrapper3(
      wrapper4(
        wrapper5(
          wrapper6(
            wrapper7(
              wrapper8(
                wrapper9(
                  wrapper10(Comp),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  ),
);

const WrappedByCompose = compose(
  wrapper10,
  wrapper9,
  wrapper8,
  wrapper7,
  wrapper6,
  wrapper5,
  wrapper4,
  wrapper3,
  wrapper2,
  wrapper1,
)(Comp);

const props = {
  '--test-1':  '1',
  '--test-2':  '2',
  '--test-3':  '3',
  '--test-4':  '4',
  '--test-5':  '5',
  '--test-6':  '6',
  '--test-7':  '7',
  '--test-8':  '8',
  '--test-9':  '9',
  '--test-10': '10',
};

describe('compose', () => {
  it('wrapping by hand and by compose equality test', () => {
    const { container: byCompose } = render(<WrappedByCompose {...props} />);
    const { container: byHand } = render(<WrappedByHand {...props} />);

    expect(byCompose.innerHTML).toEqual(byHand.innerHTML);
  });
});
