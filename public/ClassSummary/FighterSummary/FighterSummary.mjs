const fighterSummaryTemplate = `
  <link rel="stylesheet" type="text/css" href="./ClassSummary/FighterSummary/FighterSummary.css" />
  <class-summary>
  </class-summary>
`
import { classSkills } from '../../DummyData/DummyData.mjs'
customElements.define('fighter-summary', 
  class FighterSummary extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = fighterSummaryTemplate
    }

    connectedCallback () {

    }
  }
)