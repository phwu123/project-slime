const projectSlimeTemplate = `
  <link rel="stylesheet" type="text/css" href="./ProjectSlime/ProjectSlime.css" />
`
import { classesChosen, classSkills } from '../DummyData/DummyData.mjs'
customElements.define('project-slime', 
  class projectSlime extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = projectSlimeTemplate
      this.activateClass = this.activateClass.bind(this)
      this.changeClassView = this.changeClassView.bind(this)
      
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
      this.initClassSummaries()
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

    initClassSummaries () {
      // for (let classType in this.classesChosen.t1) {
      //   const classSummary = document.createElement(`${this.classesChosen.t1[classType].toLowerCase()}-summary`)
      //   if (this.classesChosen.t1[classSummary])
      //     classSummary.toggleAttribute('active', true)
      //   this.shadowRoot.appendChild(classSummary)
      // }
      const classSummary = document.createElement('fighter-summary')
        if (this.classesChosen.t1.Fighter)
          classSummary.toggleAttribute('active', true)
        this.shadowRoot.appendChild(classSummary)
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
      const classList = this.shadowRoot.children[2]
      classList.setAttribute('name', className)
      if (this.classesChosen.t1[className]) {
        // if chosen show summary
        classList.toggleAttribute('chosen', true)
      } else {
        // if not chosen show preview
        classList.toggleAttribute('chosen', false)
      }
    }

    activateClass (e) {
      const className = e.detail
      this.classesChosen.t1[className] = true
      this.shadowRoot.children[1].setAttribute('activate-class', className)
      const classList = this.shadowRoot.children[2]
      classList.toggleAttribute('chosen', true)
      this.showClassSummary(className)
      // console.log('this ', document.getElementsByTagName('fighter-summary'))
      // this.shadowRoot.getElementsByTagName(`${className.toLowerCase()}-summary`)[0].toggleAttribute('active', true)
    }

    showClassSummary (name) {
      const classSummary = this.shadowRoot.querySelector(`${name.toLowerCase()}-summary`)
      classSummary.toggleAttribute('chosen', true)
    }
  }
)