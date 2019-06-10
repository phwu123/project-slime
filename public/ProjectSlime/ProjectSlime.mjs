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
          'm1-fire': {
            mq1: {
              1: false,
              2: false,
              3: false,
              4: false,
              5: false
            },
            ms1: {
              1: false,
              2: false,
              3: false,
              4: false
            }
          },
          'm2-fire': {
            mq2: {
              1: false,
              2: false
            },
            ms2: {
              1: false,
              2: false
            }
          },
          'm1-ice': {
            mq1: {
              1: false,
              2: false,
              3: false,
              4: false,
              5: false
            },
            ms1: {
              1: false,
              2: false,
              3: false,
              4: false
            }
          },
          'm2-ice': {
            mq2: {
              1: false,
              2: false
            },
            ms2: {
              1: false,
              2: false
            }
          },
          'm1-wind': {
            mq1: {
              1: false,
              2: false,
              3: false,
              4: false,
              5: false
            },
            ms1: {
              1: false,
              2: false,
              3: false,
              4: false
            }
          },
          'm2-wind': {
            mq2: {
              1: false,
              2: false
            },
            ms2: {
              1: false,
              2: false
            }
          },
          'm1-earth': {
            mq1: {
              1: false,
              2: false,
              3: false,
              4: false,
              5: false
            },
            ms1: {
              1: false,
              2: false,
              3: false,
              4: false
            }
          },
          'm2-earth': {
            mq2: {
              1: false,
              2: false
            },
            ms2: {
              1: false,
              2: false
            }
          },
          u1: {
            1: false,
            2: false
          },
          u2: {
            1: false,
            2: false
          },
          p1: {
            1: false,
            2: false
          },
          p2: {
            1: false,
            2: false
          }
        },
        Cleric: {
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
              2: false,
              3: false
            },
          },
          'm1-holy': {
            mq1: {
              1: false,
              2: false
            },
            ms1: {
              1: false,
              2: false
            }
          },
          'm2-holy': {
            mq2: {
              1: false,
              2: false
            }
          },
          u1: {
            1: false,
            2: false
          },
          u2: {
            1: false,
            2: false
          },
          p1: {
            1: false,
            2: false
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