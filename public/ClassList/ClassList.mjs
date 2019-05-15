const classListTemplate = `
  <link rel="stylesheet" type="text/css" href="./ClassList/ClassList.css" />
  <section class="class-list">
    <class-node name="Fighter"></class-node>
    <class-node name="Rogue"></class-node>
  </section>
`

customElements.define('class-list',
  class classList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = classListTemplate;
    }


  }
)