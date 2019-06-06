const projectSlimeTemplate = `
  <link rel="stylesheet" type="text/css" href="./ProjectSlime/ProjectSlime.css" />
`
customElements.define('project-slime', 
  class projectSlime extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = projectSlimeTemplate
      this.activateClass = this.activateClass.bind(this)
      
      this.remainingClassPoints = 0
      this.remainingTalentPoints = 45
      this.classesChosen = {
        t1: {
          Fighter: false,
          Scout: false,
          Elementalist: false,
          Cleric: false
        },
        t2: {}
      }
      this.classSkills = {
        Fighter: {
          w1: {
            wo1: {
              1: false,
              2: false,
              3: false
            },
            wc1: {
              1: false,
              2: false
            },
            wf1: {
              1: false,
              2: false
            },
          },
          w2: {
            wo2: {
              1: false,
              2: false
            },
            wc2: {
              1: false,
              2: false
            },
            wf2: {
              1: false,
              2: false,
              3: false
            },
          },
          u1: {
            1: false,
            2: false
          },
          p1: {
            1: false,
            2: false,
            3: false
          }
        },
        Scout: {
          w1: {
            wo1: {
              1: false,
              2: false,
              3: false
            },
            wc1: {
              1: false,
              2: false
            },
            wf1: {
              1: false,
              2: false
            }
          },
          w2: {
            wo2: {
              1: false,
              2: false
            },
            wc2: {
              1: false,
              2: false
            },
            wf2: {
              1: false,
              2: false,
              3: false
            }
          },
          u1: {
            1: false,
            2: false
          },
          p1: {
            1: false,
            2: false,
            3: false
          }
        },
        Elementalist: {
          'm-fire1': {
            'm-fire-q1-1': false,
            'm-fire-q1-2': false,
            'm-fire-q1-3': false,
            'm-fire-q1-4': false,
            'm-fire-q1-5': false,
            'm-fire-s1-1': false,
            'm-fire-s1-2': false,
            'm-fire-s1-3': false,
            'm-fire-s1-4': false
          },
          'm-fire2': {
            'm-fire-q2-1': false,
            'm-fire-q2-2': false,
            'm-fire-q2-3': false,
            'm-fire-q2-4': false
          },
          'm-ice1': {
            'm-ice-q1-1': false,
            'm-ice-q1-2': false,
            'm-ice-q1-3': false,
            'm-ice-q1-4': false,
            'm-ice-q1-5': false,
            'm-ice-s1-1': false,
            'm-ice-s1-2': false,
            'm-ice-s1-3': false,
            'm-ice-s1-4': false
          },
          'm-ice2': {
            'm-ice-q2-1': false,
            'm-ice-q2-2': false,
            'm-ice-q2-3': false,
            'm-ice-q2-4': false
          },
          'm-wind1': {
            'm-wind-q1-1': false,
            'm-wind-q1-2': false,
            'm-wind-q1-3': false,
            'm-wind-q1-4': false,
            'm-wind-q1-5': false,
            'm-wind-s1-1': false,
            'm-wind-s1-2': false,
            'm-wind-s1-3': false,
            'm-wind-s1-4': false
          },
          'm-wind2': {
            'm-wind-q2-1': false,
            'm-wind-q2-2': false,
            'm-wind-q2-3': false,
            'm-wind-q2-4': false
          },
          'm-earth1': {
            'm-earth-q1-1': false,
            'm-earth-q1-2': false,
            'm-earth-q1-3': false,
            'm-earth-q1-4': false,
            'm-earth-q1-5': false,
            'm-earth-s1-1': false,
            'm-earth-s1-2': false,
            'm-earth-s1-3': false,
            'm-earth-s1-4': false
          },
          'm-earth2': {
            'm-earth-q2-1': false,
            'm-earth-q2-2': false,
            'm-earth-q2-3': false,
            'm-earth-q2-4': false
          },
          u1: {
            'u1-1': false,
            'u1-2': false
          },
          u2: {
            'u2-1': false,
            'u2-2': false
          },
          p1: {
            'p1-1': false,
            'p1-2': false
          },
          p2: {
            'p2-1': false,
            'p2-2': false
          }
        },
        Cleric: {
          w1: {
            'wo1-1': false,
            'wo1-2': false,
            'wo1-3': false,
            'wc1-1': false,
            'wc1-2': false,
            'wf1-1': false,
            'wf1-2': false,
            'wf1-3': false
          },
          'm-holy1': {
            'm-holy-q1-1': false,
            'm-holy-q1-2': false,
            'm-holy-s1-1': false,
            'm-holy-s1-2': false,
          },
          'm-holy2': {
            'm-holy-q2-1': false,
            'm-holy-q2-2': false
          },
          u1: {
            'u1-1': false,
            'u1-2': false,
          },
          u2: {
            'u2-1': false,
            'u2-2': false
          },
          p1: {
            'p1-1': false,
            'p1-2': false
          }
        }
      }
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