const projectSlimeTemplate = `
  <link rel="stylesheet" type="text/css" href="./ProjectSlime/ProjectSlime.css" />
  `
import { classesChosen, classSkills } from "../DummyData/DummyData.mjs"
customElements.define('project-slime', 
  class projectSlime extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = projectSlimeTemplate
      this.activateClass = this.activateClass.bind(this)
      
      this.remainingClassPoints = 0
      this.remainingTalentPoints = 45
      this.classesChosen = classesChosen
      this.classSkills = classSkills
      // from the db
      this.savedCharacters = []
    }

    connectedCallback () {
      this.initClassList()
      const initialClassView = this.checkInitialClass()
      this.initClassPreview(initialClassView)
      this.addEventListeners()
    }

    disconnectedCallback () {
      this.shadowRoot.removeEventListener('class-view', this.changeClassView)
    }

    addEventListeners () {
      this.shadowRoot.addEventListener('class-view', this.changeClassView)
      this.shadowRoot.addEventListener('activate-class', this.activateClass)
    }

    initClassList () {
      const classList = document.createElement('class-list')
      const classesChosen = JSON.stringify(this.classesChosen)
      classList.setAttribute('classes-chosen', classesChosen)
      this.shadowRoot.appendChild(classList)
    }

    initClassPreview (name) {
      const classPreview = document.createElement('class-preview')
      classPreview.setAttribute('name', name)
      // if (this.isUnlocked)
        classPreview.toggleAttribute('unlocked')
      this.shadowRoot.appendChild(classPreview)
    }

    checkInitialClass () {
      let initialClass
      for (let name in this.classesChosen.t1) {
        if (this.classesChosen.t1[name]) {
          initialClass = name
          break
        }
      }
      return initialClass || 'Fighter'
    }

    changeClassView (e) {
      const className = e.detail
      this.children[2].setAttribute('name', className)
    }

    activateClass (e) {
      const className = e.detail
      this.classesChosen.t1[className] = true
      this.shadowRoot.children[1].setAttribute('activate-class', className)
    }
  }
)