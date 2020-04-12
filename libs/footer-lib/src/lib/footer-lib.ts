export class FooterLib extends HTMLElement {
  public static observedAttributes = ['creator'];
 
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
 
  attributeChangedCallback() {
    const template = document.getElementById('template-test');
    template.innerHTML =
      `<style>h1 {text-align: center; }</style>` + template.innerHTML;
    const templateContent = template['content'];
    this.shadowRoot.appendChild(templateContent);
  }
}
 
customElements.define('footer-lib', FooterLib);
