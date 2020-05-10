import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactHeader } from './ReactHeader';
export class HeaderLib extends HTMLElement {
  public mountPoint: HTMLDivElement;
  public static observedAttributes = ['creator'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
  }
  
  connectedCallback() {
    this.mountReactApp('');
  }

  attributeChangedCallback() {
    const creator: string = this.getAttribute('creator');
    this.mountReactApp(creator);
  }
  
  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this.mountPoint);
  }
  
  mountReactApp(creator: string) {
    if (!this.mountPoint) {
      this.mountPoint = document.createElement('div');
      this.shadowRoot.appendChild(this.mountPoint);
    }

    ReactDOM.render(<ReactHeader creator={creator}/>, this.mountPoint);
  }
}
 
customElements.define('header-lib', HeaderLib);