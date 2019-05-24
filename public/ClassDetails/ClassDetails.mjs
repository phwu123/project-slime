const classDetailsTemplate = `
<template
<link rel="stylesheet" type="text/css" href="./ClassDetails/ClassDetails.css" />
<article>
  <slot name="class-circle"></slot>
  <slot name="class-name"></slot>
</article>
<slot name="utility-skills"></slot>
<slot name="weapon-skills"></slot>
<slot name="magic-skills"></slot>
<article>
  <span class="add-button"></span>
  <p>Add Class</p>
</article>
</template>
`

customElements.define('class-details', 
  class classDetails extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = classDetailsTemplate; 
    }

    static get observedAttributes () {
      return ['selected', 'name']
    }

    attributeChangedCallback(name, oldVal, newVal) {
      switch (name) {
        case 'name':
          const className = this.getAttribute('name');
          const header = this.shadowRoot.children[1];
            header.children[1].textContent = className;
          break
      }
    }

    connectedCallback () {
      const className = this.getAttribute('name');
      const header = this.shadowRoot.children[1];
      header.children[1].textContent = className;
    }
  }
)