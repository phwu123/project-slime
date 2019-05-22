const classNodeTemplate = `
  <link rel="stylesheet" type="text/css" href="./ClassNode/ClassNode.css" />
`

customElements.define('class-node', 
  class classNode extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = classNodeTemplate;
    }

    static get observedAttributes() {
      return ['selected']
    }

    attributeChangedCallback(name, oldVal, newVal) {
      switch (name) {
      }
    }

    connectedCallback() {
  //    this.addEventListener('click', this.selectClass);
    }

    disconnectedCallback() {
  //    this.removeEventListener('click', this.selectClass);
    }

    selectClass() {
      this.toggleAttribute('selected');
    }
  }
)