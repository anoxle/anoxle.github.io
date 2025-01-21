const loaderStyle = document.createElement('style');
loaderStyle.textContent = `
  body.loading {
    overflow: hidden;
  }
  .loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--loader-bg, rgba(255, 255, 255, 1));
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
    color: rgba(0, 0, 0, 0.6);
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
  .error-popup.hidden {
    display: none;
  }
`;
document.head.appendChild(loaderStyle);

document.body.classList.add('loading');

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

function updateLoadingText(text) {
  loadingText.textContent = text;
}

function showErrorPopup(message) {
  errorPopup.textContent = message;
  errorPopup.style.display = 'block';
}

function hideErrorPopup() {
  errorPopup.style.display = 'none';
}

function checkInternetConnection() {
  if (!navigator.onLine) {
    updateLoadingText('No Internet Connection');
    showErrorPopup('Check Your Internet Connection');
  }
}

function finishLoading() {
  clearTimeout(timeoutId);
  loader.classList.add('hidden');
  document.body.classList.remove('loading');
}

timeoutId = setTimeout(() => {
  updateLoadingText('Taking Longer Than Usual');
}, 5000);

window.addEventListener('load', () => {
  checkInternetConnection();
  finishLoading();
});

window.addEventListener('online', () => {
  updateLoadingText('Loading...');
  hideErrorPopup();
});

window.addEventListener('offline', () => {
  updateLoadingText('No Internet Connection');
  showErrorPopup('Check Your Internet Connection');
});

window.addEventListener('error', (event) => {
  updateLoadingText('An Error Occurred');
  showErrorPopup('An error occurred while loading the site.');
});

window.addEventListener('unhandledrejection', (event) => {
  updateLoadingText('An Error Occurred');
  showErrorPopup('An error occurred while loading the site.');
});