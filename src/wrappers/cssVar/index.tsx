import {
  ArgTypesControl, StoryArgTypes, UnknownObj, Wrapper,
} from '../../types';

type CssVar = `--${string}`

/**
 * @param { string } name - name of css variable
 * @param { ArgTypesControl } [control = { type: 'text' }] - control config
 * @returns wrapper for component that have css params
 */
export const getCssVarWrapper = <
  F extends CssVar,
  Props extends UnknownObj = { [p in F]: string }
>(
    name: F,
    control: ArgTypesControl = { type: 'text' },
  ): [Wrapper<Props>, StoryArgTypes<Props>] => [
    Elem => props => {
      const { [name]: value } = props;

      return (
        <div style={{
          [name]: value,
        }}
        >
          <Elem {...props} />
        </div>
      );
    },
    {
      [name]: { control },
    } as StoryArgTypes<Props>,
  ];
