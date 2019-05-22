const classListTemplate = `
  <link rel="stylesheet" type="text/css" href="./ClassList/ClassList.css" />
`

customElements.define('class-list',
  class classList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = classListTemplate;
      this.selectClass = this.selectClass.bind(this)

      this.classesChosen = {};
    }

    static get observedAttributes() {
      return ['classesFromSaved'];
    }

    connectedCallback() {
      const parsedClasses = JSON.parse(this.getAttribute('classesFromSaved'))
      this.classesChosen = parsedClasses
      this.setClassNodes()
    }

    setClassNodes() {
      // order the classes already chosen first
      for (let tier in this.classesChosen) {
        for (let className in this.classesChosen[tier]) {
          if (this.classesChosen[tier][className]) this.createClassNode(className, true);
        }
      }
      // order the classes not chosen last
      for (let tier in this.classesChosen) {
        for (let className in this.classesChosen[tier]) {
          if (!this.classesChosen[tier][className]) this.createClassNode(className);
        }
      }
    }

    checkClassChosen (name) {
      for (let tier in this.classesChosen) {
        if (this.classesChosen[tier].hasOwnProperty(name)) {
          return this.classesChosen[tier][name]
        }
        else
          continue
      }
    }

    createClassNode(name, selected) {
      const node = document.createElement('class-node');
      node.setAttribute('name', name);
      if (selected)
        node.toggleAttribute('selected')
      node.addEventListener('click', this.selectClass)
      this.shadowRoot.appendChild(node);
    }

    selectClass(e) {
      const name = e.target.getAttribute('name');
      this.emitViewClass(name)
      for (let i = 1; i < this.shadowRoot.children.length; ++i) {
        const node = this.shadowRoot.children[i]
        const targetName = node.getAttribute('name')
        if (targetName !== name && !this.checkClassChosen(targetName)) {
          node.toggleAttribute('selected', false)
        } else {
          node.toggleAttribute('selected', true)
        }
      }
    }

    emitViewClass(name) {
      const event = new CustomEvent('class-view', {
        detail: name,
        bubbles: true
      })
      this.dispatchEvent(event)
    }
  }
)