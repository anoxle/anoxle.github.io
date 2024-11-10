document.addEventListener('DOMContentLoaded', function() {
    // If we're already on the 404 page, handle displaying the original URL
    if (window.location.pathname === '/404') {
        const urlParams = new URLSearchParams(window.location.search);
        const originalUrl = urlParams.get('url');
        
        if (originalUrl) {
            try {
                const parsedUrl = new URL(originalUrl);
                // Don't redirect if we're already on 404 page
                return;
            } catch (error) {
                console.error('Invalid URL:', originalUrl);
            }
        }
        return;
    }

    // List of known valid pages/paths
    const knownPages = [
        '/', 
        '/404',
        // Add other valid paths here
    ];

    const currentPath = window.location.pathname;
    
    // Only redirect if the current path is not in knownPages
    if (!knownPages.includes(currentPath)) {
        const currentUrl = window.location.href;
        // Add a flag to prevent infinite redirects
        if (!currentUrl.includes('/404?')) {
            window.location.href = '/404?url=' + encodeURIComponent(currentUrl);
        }
    }
});