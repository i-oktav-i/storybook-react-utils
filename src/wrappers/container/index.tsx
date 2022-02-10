import { CSSProperties } from 'react';

import { StoryArgTypes, Wrapper } from '../../types';

type ContainerProps = {
  containerWidth: number,
  containerHeight: number,
  containerStyles?: CSSProperties
}

export const containerWrapperArgTypes: StoryArgTypes<ContainerProps> = {
  containerWidth: {
    defaultValue: 300,
    control:      {
      type: 'range',
      min:  0,
      max:  1000,
    },
    description: 'Not component property',
  },
  containerHeight: {
    defaultValue: 200,
    control:      {
      type: 'range',
      min:  0,
      max:  1000,
    },
    description: 'Not component property',
  },
  containerStyles: {
    table: { disable: true },
  },
};
export const containerWrapper: Wrapper<ContainerProps> = Elem => props => {
  const { containerWidth, containerHeight, containerStyles = {} } = props;

  return (
    <div
      style={{
        width:  containerWidth || 'auto',
        height: containerHeight || 'auto',
        ...containerStyles,
      }}
    >
      <Elem {...props} />
    </div>
  );
};
