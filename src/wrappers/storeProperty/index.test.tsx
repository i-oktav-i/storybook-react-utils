import { FC, VFC } from 'react';
import {
  configureStore,
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { Provider, useSelector } from 'react-redux';

import { render, waitFor } from '@testing-library/react';

import { getStorePropertyWrapper } from '.';

const setValue = createAction<string>('setValue');
const setValueAsync = createAsyncThunk('setValueAsync', async (value: string) => Promise.resolve(value));

const getStore = () => configureStore({
  reducer: createReducer({ value: '' as string | undefined }, builder => {
    builder
      .addCase(setValue, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.value = action.payload;
      })
      .addCase(setValueAsync.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.value = action.payload;
      });
  }),
});

// type AppStore = ReturnType<typeof store.getState>
type AppStore = ReturnType<typeof getStore>
type AppState = ReturnType<AppStore['getState']>

const TestComp: VFC = () => {
  const value = useSelector((state: AppState) => state.value);

  return (
    <div>
      {value}
    </div>
  );
};

describe('getStorePropertyWrapper', () => {
  let store!: AppStore;
  let StoreProvider!: FC;

  beforeEach(() => {
    store = getStore();
    StoreProvider = (({ children }: { children: JSX.Element }) => (
      <Provider store={store}>
        {children}
      </Provider>
    )) as FC;
  });

  it('sync value changing test', async () => {
    const valueWrapper = getStorePropertyWrapper('test', setValue);
    const Wrapped = valueWrapper(TestComp);

    const { findByText, rerender, unmount } = render(<Wrapped test="first" />, {
      wrapper: StoreProvider,
    });

    expect(await findByText('first')).toBeInTheDocument();

    rerender(<Wrapped test="second" />);
    expect(await findByText('second')).toBeInTheDocument();

    unmount();
    await waitFor(() => {
      expect(store.getState().value).toBe('second');
    });
  });

  it('async value changing test', async () => {
    const valueWrapper = getStorePropertyWrapper('test', setValueAsync);
    const Wrapped = valueWrapper(TestComp);

    const { findByText, rerender, unmount } = render(<Wrapped test="first" />, {
      wrapper: StoreProvider,
    });

    expect(await findByText('first')).toBeInTheDocument();

    rerender(<Wrapped test="second" />);
    expect(await findByText('second')).toBeInTheDocument();

    unmount();
    await waitFor(() => {
      expect(store.getState().value).toBe('second');
    });
  });

  it('async value reset test', async () => {
    const resetValue = 'reset value';
    const valueWrapper = getStorePropertyWrapper('test', setValueAsync, resetValue);
    const Wrapped = valueWrapper(TestComp);

    const { unmount } = await waitFor(() => render(<Wrapped test="first" />, {
      wrapper: StoreProvider,
    }));

    unmount();
    await waitFor(() => {
      expect(store.getState().value).toBe(resetValue);
    });
  });

  it('value reset to undefined', async () => {
    const valueWrapper = getStorePropertyWrapper('test', setValueAsync, undefined);
    const Wrapped = valueWrapper(TestComp);

    const { unmount } = await waitFor(() => render(<Wrapped test="first" />, {
      wrapper: StoreProvider,
    }));

    unmount();
    await waitFor(() => {
      expect(store.getState().value).toBeUndefined();
    });
  });
});
