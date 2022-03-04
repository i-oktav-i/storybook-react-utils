import { configureStore, createReducer } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { FC, VFC } from 'react';
import { Provider } from 'react-redux';

import { getSelectorWrapper } from '.';

const store = configureStore({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reducer: createReducer({ value: 'value' }, () => {}),
});

type AppStore = typeof store
type AppState = ReturnType<AppStore['getState']>

type TestProps = {
  value: string
}

const TestComp: VFC<TestProps> = ({ value }) => <div>{value}</div>;

const valueWrapper = getSelectorWrapper('value', (state: AppState) => state.value);
const Wrapped = valueWrapper(TestComp);

describe('getSelectorWrapper', () => {
  it('test value providing', () => {
    render(<Wrapped />, {
      wrapper: (({ children }: { children: JSX.Element }) => (
        <Provider store={store}>
          {children}
        </Provider>
      )) as FC,
    });

    expect(screen.getByText('value')).toBeInTheDocument();
  });
});
