(function () {
    const STORAGE_KEY = 'mnichovice_popup_shown_v4';
    const PRIMARY_COLOR = '#006297';
    const BG_COLOR = '#f4f4f9';
    const HTML = `
    <div id="mnichovice-popup-overlay" class="mn-overlay" aria-hidden="true">
      <div class="mn-modal" role="dialog" aria-modal="true" aria-labelledby="mn-title" tabindex="-1">
        <button class="mn-close" aria-label="Zavřít oznámení">&times;</button>
        <div class="mn-content">
          <h2 id="mn-title">Slavnostní zahájení školního roku</h2>
          <p class="mn-body">
            Pro první studenty <strong>mnichovického gymnázia</strong><br/>
            <strong>1. září 2025 v 8.00</strong><br/>
            na Masarykově náměstí v Mnichovicích.
          </p>
          <div class="mn-actions">

            <a href="https://www.gymnaziummnichovice.cz/aktuality" class="animated-button-link">
                <button class="animated-button">
                    <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z">
                        </path>
                    </svg>
                    <span class="text">Více info</span>
                    <span class="circle"></span>
                    <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z">
                        </path>
                    </svg>
                </button>
            </a>
          </div>
        </div>
      </div>
    </div>
    `;
  
    const style = document.createElement('style');
    style.textContent = `
    /* mnichovice-popup styles (edit safely) */
    :root{
      --mn-primary: ${PRIMARY_COLOR};
      --mn-bg: ${BG_COLOR};
      --mn-overlay-bg: rgba(0,0,0,0.45);
      --mn-radius: 12px;
      --mn-max-width: 520px;
      --mn-gap: 1rem;
      --mn-font: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    }
    .mn-overlay{
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--mn-overlay-bg);
      z-index: 9999;
      opacity: 0;
      pointer-events: none;
      transition: opacity .22s ease;
    }
    .mn-overlay.show{
      opacity: 1;
      pointer-events: auto;
    }
    .mn-modal{
      width: calc(100% - 40px);
      max-width: var(--mn-max-width);
      background: linear-gradient(180deg, white 0%, var(--mn-bg) 100%);
      border-radius: var(--mn-radius);
      box-shadow: 0 8px 40px rgba(0,0,0,0.25);
      padding: 18px;
      font-family: var(--mn-font);
      color: #0b2540;
      position: relative;
      transform: translateY(8px);
      transition: transform .22s ease;
    }
    .mn-overlay.show .mn-modal{ transform: translateY(0); }
  
    .mn-close{
      position: absolute;
      right: 10px;
      top: 8px;
      border: none;
      background: transparent;
      font-size: 24px;
      line-height: 1;
      cursor: pointer;
      color: var(--mn-primary);
      padding: 6px;
    }
  
    .mn-content{ padding: 10px 16px 18px 16px; text-align: center; }
    .mn-content h2{
      margin: 6px 0 6px;
      font-size: 1.25rem;
      color: var(--mn-primary);
    }
    .mn-body{
      margin: 6px 0 14px;
      font-size: 1rem;
      line-height: 1.4;
    }
  
    .mn-actions{ display:flex; justify-content:center; gap:.5rem; }
    .mn-btn{
      padding: .55rem 1rem;
      border-radius: 8px;
      border: 1px solid rgba(0,0,0,0.08);
      background: white;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.95rem;
    }
    .mn-btn:focus{ outline: 3px solid rgba(0,0,0,0.08); outline-offset: 2px; }
    .mn-btn-primary{
      background: linear-gradient(180deg, var(--mn-primary) 0%, color-mix(in srgb, var(--mn-primary) 80%, white 20%) 100%);
      color: white;
      border: none;
      box-shadow: 0 6px 18px rgba(0,98,151,0.18);
    }
  
    /* Responsive */
    @media (max-width:420px){
      .mn-modal{ padding: 12px; border-radius: 10px; }
      .mn-content h2{ font-size: 1.1rem; }
    }
    `;
  
    document.head.appendChild(style);

    document.addEventListener('DOMContentLoaded', function () {
      if (localStorage.getItem(STORAGE_KEY)) {
        return;
      }
  
      document.body.insertAdjacentHTML('beforeend', HTML);
  
      const overlay = document.getElementById('mnichovice-popup-overlay');
      const modal = overlay && overlay.querySelector('.mn-modal');
      const closeBtn = overlay && overlay.querySelector('.mn-close');
      const primaryBtn = overlay && overlay.querySelector('.mn-btn-primary');
  
      requestAnimationFrame(() => overlay.classList.add('show'));
      overlay.setAttribute('aria-hidden', 'false');
  
      const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const focusables = modal ? Array.from(modal.querySelectorAll(focusableSelector)) : [];
      let lastFocused = document.activeElement;
      if (focusables.length) {
        focusables[0].focus();
      } else if (modal) {
        modal.focus();
      }
  
      function closePopup() {
        try { localStorage.setItem(STORAGE_KEY, Date.now().toString()); } catch (e) {}
        overlay.classList.remove('show');
        overlay.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
          overlay.remove();
        }, 240);
        if (lastFocused) lastFocused.focus();
      }
  
      closeBtn && closeBtn.addEventListener('click', closePopup);
      primaryBtn && primaryBtn.addEventListener('click', closePopup);
  
      overlay.addEventListener('click', function (ev) {
        if (ev.target === overlay) closePopup();
      });
  
      document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'Escape') {
          closePopup();
          document.removeEventListener('keydown', onKey);
        }

        if (e.key === 'Tab' && modal) {
          const focusedIndex = focusables.indexOf(document.activeElement);
          if (e.shiftKey && focusedIndex === 0) {
            e.preventDefault();
            focusables[focusables.length - 1].focus();
          } else if (!e.shiftKey && focusedIndex === focusables.length - 1) {
            e.preventDefault();
            focusables[0].focus();
          }
        }
      });
    });
  
    window.MnichovicePopup = {
      resetShown: function () { localStorage.removeItem(STORAGE_KEY); },
      markShown: function () { localStorage.setItem(STORAGE_KEY, Date.now().toString()); }
    };
  })();
  