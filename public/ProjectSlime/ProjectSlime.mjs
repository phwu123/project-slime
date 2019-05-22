const projectSlimeTemplate = `
  <link rel="stylesheet" type="text/css" href="./ProjectSlime/ProjectSlime.css" />
`
customElements.define('project-slime', 
  class projectSlime extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = projectSlimeTemplate

      // from the db
      this.savedCharacter = {
        classesChosen: {
          t1: {
            Fighter: false,
            Rogue: false,
            Elementalist: true,
            Cleric: false
          },
          t2: {}
        }
      }
    }

    connectedCallback () {
      this.initClassList()
      this.initClassDetails()
      this.shadowRoot.addEventListener('class-view', this.changeClassView)
    }

    disconnectedCallback () {
      this.shadowRoot.removeEventListener('class-view', this.changeClassView)
    }

    initClassList() {
      const classList = document.createElement('class-list')
      const classesFromSaved = JSON.stringify(this.savedCharacter.classesChosen)
      classList.setAttribute('classesFromSaved', classesFromSaved)
      this.shadowRoot.appendChild(classList)
    }

    initClassDetails() {
      const classDetails = document.createElement('class-details')
      const className = this.checkIfInitialClass()
      this.shadowRoot.appendChild(classDetails)
      classDetails.setAttribute('name', className)
    }

    checkIfInitialClass() {
      let initialClass
      for (let name in this.savedCharacter.classesChosen.t1) {
        if (this.savedCharacter.classesChosen.t1[name]) {
          initialClass = name
          break
        }
      }
      return initialClass || 'Fighter'
    }

    changeClassView(e) {
      console.log('this ', this.children[1])
      this.children[2].setAttribute('name', e.detail)
    }
  }


)