const classListTemplate = `
  <link rel="stylesheet" type="text/css" href="./ClassList/ClassList.css" />
`

customElements.define('class-list',
  class classList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = classListTemplate;
      this.classesChosen = {}
    }

    static get observedAttributes() {
      return ['classesFromSaved']
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

    createClassNode(name, selected) {
      const node = document.createElement('class-node');
      node.setAttribute('name', name);
      if (selected) node.toggleAttribute('selected')
      node.addEventListener('click', this.selectClass)
      this.shadowRoot.appendChild(node);
    }

    selectClass(e) {
      const classList = this.parentNode.host
      const className = e.target.getAttribute('name')
      const isSelected = e.target.hasAttribute('selected')
      const classSelected = {
        class: className,
        isSelected
      }
      classList.setAttribute('classSelected', classSelected)
     // e.target.getAttribute('name')
    }
  }
)