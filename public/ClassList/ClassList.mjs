<template id="class-list-template">
  <link rel="stylesheet" type="text/css" href="./ClassList/ClassList.css" />
  <section class="class-list">

  </section>
</template>


customElements.define('class-list',
  class classList extends HTMLElement {
    constructor() {
      super()
      const template = document.getElementById('class-list-template').content;
      this.shadowRoot.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true));
    }


  }
)