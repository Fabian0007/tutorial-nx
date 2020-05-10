import * as ReactDOM from 'react-dom';
import * as React from 'react';
import reactToWebComponent from 'react-to-webcomponent';
import { ReactHeader } from './ReactHeader';
 
export const webcomponent = reactToWebComponent(ReactHeader, React, ReactDOM);
customElements.define('header-fast-lib', webcomponent);