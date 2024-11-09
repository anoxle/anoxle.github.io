document.addEventListener('DOMContentLoaded', function() {
    // Prevent redirection if already on 404 page
    if (window.location.pathname === '/404') {
        const urlParams = new URLSearchParams(window.location.search);
        const originalUrl = urlParams.get('url');
        
        if (originalUrl) {
            // Parse the original URL
            try {
                const parsedUrl = new URL(originalUrl);
                
                // Additional checks to prevent recursive redirects
                if (parsedUrl.hostname === window.location.hostname && 
                    (parsedUrl.pathname === '/404' || parsedUrl.search.includes('url='))) {
                    // If it's a recursive 404 or contains another URL parameter, stop here
                    console.warn('Preventing recursive redirect');
                    return;
                }
                
                // Attempt to redirect to the original URL
                window.location.href = originalUrl;
            } catch (error) {
                console.error('Invalid URL:', originalUrl);
            }
            return;
        }
    }

    // Check if the requested page doesn't exist
    const currentPath = window.location.pathname;
    const isKnownPage = [
        '/', 
        '/404'
        // Add other known page paths here
    ].includes(currentPath);

    if (!isKnownPage) {
        // Encode the current full URL
        const currentUrl = window.location.href;
        
        // Redirect to the 404 page with the URL as a parameter
        window.location.href = '/404?url=' + encodeURIComponent(currentUrl);
    }
});