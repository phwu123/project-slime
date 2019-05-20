const classDetailsTemplate = `
<link rel="stylesheet" type="text/css" href="./ClassDetails/ClassDetails.css" />
<header>
  <class-node selected></class-node>
  <p></p>
</header>
`

customElements.define('class-details', 
  class classDetails extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = classDetailsTemplate;
    }

    static get observedAttributes () {
      return ['selected']
    }

    connectedCallback () {
      const className = this.getAttribute('name');
      const header = this.shadowRoot.children[1];
      header.children[1].textContent = className;
    }
  }
)