const loaderStyle = document.createElement('style');
loaderStyle.textContent = `
  .loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--loader-bg, rgba(255, 255, 255, 1)); /* Start with white background */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(5px);
  }
  .loader-text {
    margin-top: 20px;
    font-size: 16px;
    color: #2d3436;
  }
  .loader-spinner {
    width: 80px;
    height: 80px;
    border: 4px solid rgba(108, 92, 231, 0.2);
    border-top: 4px solid #6c5ce7;
    border-radius: 50%;
    animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
    box-shadow: 0 0 20px rgba(108, 92, 231, 0.1);
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .loader.hidden {
    display: none;
  }
  .loader-credit {
    position: absolute;
    bottom: 20px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6); /* Small and readable */
    text-align: center;
    width: 100%;
  }
  .error-popup {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #ff6b6b;
    color: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: none;
    z-index: 10000;
  }
`;
document.head.appendChild(loaderStyle);

const loader = document.createElement('div');
loader.className = 'loader';
loader.innerHTML = `
  <div class="loader-spinner"></div>
  <div class="loader-text">Loading...</div>
  <div class="loader-credit">A Project Made By Anoxle 💖</div>
`;
document.body.appendChild(loader);

const errorPopup = document.createElement('div');
errorPopup.className = 'error-popup';
errorPopup.textContent = 'Check Your Internet Connection';
document.body.appendChild(errorPopup);

let loadingText = loader.querySelector('.loader-text');
let timeoutId;

// Function to update the loading text
function updateLoadingText(text) {
  loadingText.textContent = text;
}

// Function to show the error popup
function showErrorPopup() {
  errorPopup.style.display = 'block';
}

// Function to check internet connection
function checkInternetConnection() {
  if (!navigator.onLine) {
    updateLoadingText('No Internet Connection');
    showErrorPopup();
  }
}

// Function to handle loading completion
function finishLoading() {
  clearTimeout(timeoutId); // Clear the timeout if the page loads before 5 seconds
  loader.classList.add('hidden');
}

// If loading takes more than 5 seconds, update the text
timeoutId = setTimeout(() => {
  updateLoadingText('Taking Longer Than Usual');
}, 5000);

// Check internet connection on page load
window.addEventListener('load', () => {
  checkInternetConnection();
  finishLoading();
});

// Check internet connection if it changes while loading
window.addEventListener('online', () => {
  updateLoadingText('Loading...');
  errorPopup.style.display = 'none';
});

window.addEventListener('offline', () => {
  updateLoadingText('No Internet Connection');
  showErrorPopup();
});