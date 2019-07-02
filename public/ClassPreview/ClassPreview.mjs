const classPreviewTemplate = `
<link rel="stylesheet" type="text/css" href="./ClassPreview/ClassPreview.css" />
<header class="name-desc">
  <class-node selected></class-node>
  <p></p>
</header>
<article class="equipment">
  <p>Preferred equipment:</p>
  <p></p>
</article>
<article class="class-skills">
  <p>Class Skills:</p>
  <p></p>
</article>
<article class="prerequisites">
  <p>Prerequisites:</p>
  <p></p>
</article>
<article class="name-desc">
  <p>Locked</p>
  <button class="add-button">Activate</button>
</article>
`

customElements.define('class-preview',
  class classDetails extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = classPreviewTemplate;
      this.activateClass = this.activateClass.bind(this)
    }

    static get observedAttributes () {
      return ['name', 'unlocked', 'chosen']
    }

    connectedCallback () {
      const activate = this.shadowRoot.children[5].children[1]
      activate.addEventListener('click', this.activateClass)
    }

    attributeChangedCallback (name, oldVal, newVal) {
      switch (name) {
        case 'name':
          this.setHeader(newVal);
          this.setEquipment(newVal);
          this.setClassSkills(newVal);
          this.setPrereqs(newVal);
          break
        case 'unlocked':
          const buttons = this.shadowRoot.children[5];
          buttons.children[0].textContent = 'Unlocked'
      }
    }

    activateClass () {
      const event = new CustomEvent('activate-class', {
        detail: this.getAttribute('name'),
        bubbles: true
      })
      this.dispatchEvent(event)
    }

    setHeader (className) {
      const header = this.shadowRoot.children[1];
      header.children[0].setAttribute('name', className);
      header.children[1].textContent = className;
    }

    setEquipment (name) {
      const equipArea = this.shadowRoot.children[2]
      while (equipArea.childElementCount > 1)
        equipArea.removeChild(equipArea.lastChild)
      const equip = this.getEquipment(name)
      for (let i = 0; i < equip.length; ++i) {
        const node = document.createElement('p')
        node.textContent = equip[i]
        equipArea.appendChild(node)
      }
    }

    getEquipment (name) {
      switch (name) {
        case 'Fighter':
          return ['Sword', 'Greatsword', 'Spear', 'Axe', 'Shield']
        case 'Scout':
          return ['Dagger', 'Bow']
        case 'Elementalist':
          return ['Staff', 'Wand', 'Orb']
        case 'Cleric':
          return ['Mace', 'Wand', 'Staff', 'Shield', 'Orb']
        default:
          return []
      }
    }

    setClassSkills (name) {
      const skillArea = this.shadowRoot.children[3]
      while (skillArea.childElementCount > 1)
        skillArea.removeChild(skillArea.lastChild)
      const skills = this.getClassSkills(name)
      for (let i = 0; i < skills.length; ++i) {
        const node = document.createElement('p')
        node.textContent = skills[i]
        skillArea.appendChild(node)
      }
    }

    getClassSkills (name) {
      switch (name) {
        case 'Fighter':
          return ['Active Regeneration', 'Heavy Armor Mastery']
        case 'Scout':
          return ['Swiftness', 'Medium Armor Mastery']
        case 'Elementalist':
          return ['Magical Conversion', 'Focus', 'Light Armor Mastery', 'Mental Concentration']
        case 'Cleric':
          return ['Increase Recovery', 'Prayer', 'Light Armor Mastery']
        default:
          return []
      }
    }

    setPrereqs (name) {
      const prereqArea = this.shadowRoot.children[4]
      while (prereqArea.childElementCount > 1)
        prereqArea.removeChild(prereqArea.lastChild)
      const prereqs = this.getPrereqs(name)
      for (let i = 0; i < prereqs.length; ++i) {
        const node = document.createElement('p')
        node.textContent = prereqs[i]
        prereqArea.appendChild(node)
      }
    }

    getPrereqs (name) {
      switch (name) {
        case 'Fighter':
        case 'Scout':
        case 'Elementalist':
        case 'Cleric':
          return ['N/A']
        default:
          return ['N/A']
      }
    }
  }
)