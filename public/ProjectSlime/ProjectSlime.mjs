const projectSlimeTemplate = `
  <link rel="stylesheet" type="text/css" href="./ProjectSlime/ProjectSlime.css" />
`
customElements.define('project-slime', 
  class projectSlime extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = projectSlimeTemplate

      this.remainingClassPoints = 0
      this.remainingTalentPoints = 45
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
        },
        classSkills: {}
      }
    }

    connectedCallback () {
      this.initClassList()
      const intialClassView = this.checkInitialClass()
      this.initClassDetails(initialClassView)
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

    initClassDetails(name) {
      for (const tier in this.savedCharacter.classesChosen) {
        for (const className in this.savedCharacter.classesChosen[tier]) {
          const classDetailsNode = document.createElement(`${className}-details`)
          if (name === className)
            classDetailsNode.toggleAttribute('viewing')
          this.shadowRoot.appendChild(classDetailsNode)
        }
      }
      
    }

    checkInitialClass() {
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
      const className = e.detail
  //    this.children[2].setAttribute('name', e.detail)
    }
  }


)