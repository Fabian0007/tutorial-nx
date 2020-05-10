import * as React from 'react';
import * as PropTypes from 'prop-types';

/* eslint-disable-next-line */
export interface ReactHeaderProps {
  creator: string
}

export const ReactHeader = ({ creator }: ReactHeaderProps) => {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <img
        alt="Nx logo"
        width="75"
        src="https://nx.dev/assets/images/nx-logo-white.svg"
      />
      <h1>Header {creator}</h1>
    </div>
  );
};

ReactHeader.propTypes = { creator: PropTypes.string };

export default ReactHeader;
