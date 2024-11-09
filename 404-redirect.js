document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the 404 page
    if (window.location.pathname === '/404') {
        const urlParams = new URLSearchParams(window.location.search);
        const originalUrl = urlParams.get('url');
        
        if (originalUrl) {
            try {
                const parsedOriginalUrl = new URL(originalUrl);
                const currentUrl = new URL(window.location.href);

                // Prevent redirecting to 404 page again or to itself
                if (
                    parsedOriginalUrl.hostname === currentUrl.hostname &&
                    (
                        parsedOriginalUrl.pathname === '/404' || 
                        parsedOriginalUrl.search.includes('url=') ||
                        new URL(parsedOriginalUrl.pathname, window.location.origin).href === 
                        new URL(currentUrl.pathname, window.location.origin).href
                    )
                ) {
                    console.warn('Preventing recursive redirect');
                    return;
                }
                
                // If the original URL is just a path, construct full URL
                const redirectUrl = parsedOriginalUrl.hostname ? 
                    parsedOriginalUrl.href : 
                    window.location.origin + parsedOriginalUrl.pathname;

                // Use window.location.replace to avoid adding to history
                window.location.replace(redirectUrl);
            } catch (error) {
                console.error('Invalid URL:', originalUrl);
            }
            return;
        }
    }

    // For non-404 pages
    const currentPath = window.location.pathname;
    const isKnownPage = [
        '/', 
        '/404'
    ].includes(currentPath);

    if (!isKnownPage) {
        const currentUrl = window.location.href;
        window.location.replace('/404?url=' + encodeURIComponent(currentUrl));
    }
});