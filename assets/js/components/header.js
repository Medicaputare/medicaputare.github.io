class MainHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar">
        <div class="nav-left">
          <a href="/" class="logo-link">
            <img src="/assets/images/Medicaputare_grey_logo_no_slogan_transparent_bg.png" 
                 alt="Medicaputare Logo" class="logo-icon">
            <span class="logo-text logo-text-gradient">Medicaputare</span>
          </a>
        </div>
        <div class="nav-links">
          <a href="/index.html">Home</a>
          <a href="/index.html#about">About Us</a>
          <a href="/products/index.html">Products</a>
          <a href="/articles.html">Resources</a>
          <a href="/index.html#contact">Contact</a>
        </div>
      </nav>
    `;
  }
}

// Register the custom element
customElements.define('main-header', MainHeader);
