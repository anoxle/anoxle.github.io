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
                        parsedOriginalUrl.href === currentUrl.href
                    )
                ) {
                    console.warn('Preventing recursive redirect');
                    return;
                }
                
                window.location.replace(originalUrl);
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