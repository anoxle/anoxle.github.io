document.addEventListener('DOMContentLoaded', function() {
    // Check if we're already on the 404 page
    if (window.location.pathname === '/404') {
        // If URL parameter exists, stop further redirection
        const urlParams = new URLSearchParams(window.location.search);
        const originalUrl = urlParams.get('url');
        
        if (originalUrl) {
            // Prevent further redirection
            return;
        }
    }

    // Check if the requested page doesn't exist
    const currentPath = window.location.pathname;
    const isKnownPage = currentPath === '/' || 
                        currentPath.startsWith('/index.html') || 
                        currentPath === '/404' ||
                        // Add other known page paths here
                        false;

    if (!isKnownPage) {
        // Encode the current full URL
        const currentUrl = window.location.href;
        
        // Redirect to the 404 page with the URL as a parameter
        window.location.href = '/404?url=' + encodeURIComponent(currentUrl);
    }
});