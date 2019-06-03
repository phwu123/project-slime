const classSummaryTemplate = `
  <link rel="stylesheet" type="text/css" href="./ClassSummary/ClassSummary.css" />
`

customElements.define('class-summary',
  class classSummary extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open '});
      this.shadowRoot.innerHTML = classSummaryTemplate;
    }

    static get observedAttributes () {
      return ['skills'];
    }

    get skills () {
      return this.getAttribute('skills');
    }

    connectedCallback () {

    }

    attributeChangedCallback (name, oldVal, newVal) {
      switch (name) {

      }
    }
  }
)