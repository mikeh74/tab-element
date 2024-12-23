
// Register the custom element
// customElements.define('tab-component', Tab);


// Trigger element that extends from HTML link element
class TabTrigger extends HTMLElement {

  constructor() {
    super();
    // this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    console.log('connected');

    this.setAttribute('role', 'tab');
    this.setAttribute('aria-selected', 'false');
    this.setAttribute('tabindex', '0');
    this.addEventListener('click', this.handleClick);
  }

  handleClick(event) {
    event.preventDefault();

    const tabId = this.getAttribute('target');
    console.log(tabId);
    const tab = document.getElementById(tabId);
    const tabs = this.closest('tab-group').querySelectorAll('tab-component');
    tabs.forEach(tab => {
      tab.style.display = 'none';
    });
    tab.style.display = 'block';
  }
}

customElements.define('tab-trigger', TabTrigger);

class TabContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .tag-content {
          display: none;
        }
      </style>
      <div class="tag-content">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('tab-content', TabContent);

class TabGroup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .tag-group {
          display: flex;
          gap: 0.5rem;
        }
      </style>
      <div class="tag-group">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('tab-group', TabGroup);