import { useRef } from 'react';

import { Wrapper } from 'typings/types';

// eslint-disable-next-line @typescript-eslint/ban-types
export const refWrapper: Wrapper<{}> = Elem => props => {
  const ref = useRef(null);

  return <Elem {...props} ref={ref} />;
};
