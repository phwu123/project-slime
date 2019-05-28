const fighterDetailsTemplate = `
<link rel="stylesheet" type="text/css" href="./ClassDetails/FighterDetails/FighterDetails.css" />
<class-details name="Fighter">
<class-node slot="class-circle" name="Fighter" selected></class-node>
<p slot="class-name>Fighter</p>
</class-details>
`

customElements.define('Fighter-details', 
  class fighterDetails extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = fighterDetailsTemplate;
      this.utilitySkills = {}
      this.weaponSkills = {}
    }

    static get observedAttributes () {
      return ['selected', 'viewing']
    }
  }
)