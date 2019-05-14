const classListTemplate = `
  <link rel="stylesheet" type="text/css" href="./ClassList/ClassList.css" />
  <section class="class-list">
  aaa
  </section>
`

customElements.define('class-list',
  class classList extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = classListTemplate
    }


  }
)