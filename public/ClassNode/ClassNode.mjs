const classNodeTemplate = `
  <link rel="stylesheet" type="text/css" href="./ClassNode/ClassNode.css" />
  <div class="class-node">
  </div>
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
        case 'selected':
          this.hasAttribute('selected') ? this.shadowRoot.children[1].classList.add('selected') : this.shadowRoot.children[1].classList.remove('selected');
          break;
      }
    }

    connectedCallback() {
      this.addEventListener('click', this.selectClass);
    }

    selectClass() {
      this.toggleAttribute('selected');
    }
  }
)