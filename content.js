// content.js
function showStartScreen() {
  console.log("document.body:", document.body); // ADD THIS LINE
  const style = document.createElement('style');
  style.textContent = startScreenCSS;
  document.head.appendChild(style);

  const startScreen = document.createElement('div');
  startScreen.innerHTML = startScreenHTML;
  document.body.appendChild(startScreen);
}
// --- Start Screen HTML and CSS ---
const startScreenHTML = `
<div id="youtube-tv-start-screen" style="
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0f0f0f;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif; /* Use YouTube's font */
">
    <div class="logo-container" style="text-align: center;">
        <svg width="90" height="64" viewBox="0 0 90 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M88.64 7.37C87.39 2.81 84 0 79.56 0H10.43C6 0 2.61 2.81 1.35 7.37C0 11.93 0 22.19 0 32.44C0 42.69 0 52.94 1.35 57.56C2.61 62.19 6 64 10.43 64H79.56C84 64 87.39 62.19 88.64 57.56C89.94 53 89.94 42.69 89.94 32.44C89.94 22.19 89.94 11.93 88.64 7.37ZM36 46.5V18.5L59.77 32.5L36 46.5Z" fill="#fff"></path>
       </svg>
        <div class="loading-dots" style="margin-top: 20px;">
            <span class="dot" style="animation-delay: 0s;"></span>
            <span class="dot" style="animation-delay: 0.2s;"></span>
            <span class="dot" style="animation-delay: 0.4s;"></span>
        </div>
    </div>
</div>
`;

const startScreenCSS = `
.loading-dots .dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  margin: 0 5px;
  animation: pulse 1.2s infinite;
  opacity: 0.3
}

@keyframes pulse {
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
}
`;

// --- Function to add the start screen ---
function showStartScreen() {
  const style = document.createElement('style');
  style.textContent = startScreenCSS;
  document.head.appendChild(style);

  const startScreen = document.createElement('div');
  startScreen.innerHTML = startScreenHTML;
  document.body.appendChild(startScreen);
}

// --- Function to remove the start screen ---
function hideStartScreen() {
    const startScreen = document.getElementById('youtube-tv-start-screen');
    if (startScreen) {
        startScreen.remove();
    }
}
// --- The original pop-up effect code ---
function addPopEffect() {
    const style = document.createElement('style');
    style.textContent = `
        ytd-thumbnail-overlay-time-status-renderer[overlay-style="DEFAULT"] {
          pointer-events: none;
        }

        ytd-rich-grid-media:not([is-slim-media]) > div > ytd-thumbnail > a > .ytp-inline-preview-ui,
        ytd-grid-video-renderer > div > ytd-thumbnail > a > .ytp-inline-preview-ui,
        ytd-compact-video-renderer > div > a > .ytp-inline-preview-ui,
        ytd-rich-item-renderer:not([is-slim-media]) > div > ytd-rich-grid-media > div > ytd-thumbnail > a > .ytp-inline-preview-ui,
        ytd-rich-grid-slim-media > div > ytd-thumbnail > a > .ytp-inline-preview-ui
        {
          transition: transform 0.1s ease, z-index 0.1s ease;
          transform-origin: bottom;
          z-index: 9999 !important;
        }

        ytd-rich-grid-media:not([is-slim-media]):hover > div > ytd-thumbnail > a > .ytp-inline-preview-ui,
        ytd-grid-video-renderer:hover > div > ytd-thumbnail > a > .ytp-inline-preview-ui,
        ytd-compact-video-renderer:hover > div > a >  .ytp-inline-preview-ui,
        ytd-rich-item-renderer:not([is-slim-media]):hover > div > ytd-rich-grid-media > div > ytd-thumbnail > a > .ytp-inline-preview-ui,
        ytd-rich-grid-slim-media:hover > div > ytd-thumbnail > a >.ytp-inline-preview-ui
         {
          transform: scale(1.1);
          z-index: 10000 !important;
          overflow: visible !important;
        }

         ytd-rich-grid-media:not([is-slim-media]):hover > div > .text-wrapper.style-scope.ytd-rich-grid-media,
         ytd-grid-video-renderer:hover > div > .text-wrapper.style-scope.ytd-grid-video-renderer,
         ytd-compact-video-renderer:hover > div > .details.style-scope.ytd-compact-video-renderer,
         ytd-rich-item-renderer:not([is-slim-media]):hover > div > ytd-rich-grid-media > div > .text-wrapper.style-scope.ytd-rich-grid-media,
         ytd-rich-grid-slim-media:hover > div > .text-wrapper
          {
          z-index: 9998 !important;
        }

        .ytp-inline-preview-scroller-container {
            overflow: hidden !important;
        }
    `;
    document.head.appendChild(style);
}

// --- Mutation Observer (as before) ---
const observer = new MutationObserver(() => {
    addPopEffect(); // Re-apply styles when new content is loaded.
});


// --- Wait for window.onload and simulate a loading delay ---
window.addEventListener('load', () => {
    // Simulate a loading delay (adjust as desired)
    setTimeout(() => {
        hideStartScreen();  // Remove the start screen
        addPopEffect();      // Add the pop-up effect

        // Start observing for dynamic content *after* the start screen is removed
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }, 3000); // 3 seconds delay (3000 milliseconds)
});

// --- Show the start screen immediately (at document_start) ---
document.addEventListener('DOMContentLoaded', showStartScreen);