document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname === '/404') {
        const urlParams = new URLSearchParams(window.location.search);
        const originalUrl = urlParams.get('url');
        
        if (originalUrl) {
            try {
                const parsedUrl = new URL(originalUrl);
                
                if (parsedUrl.hostname === window.location.hostname && 
                    (parsedUrl.pathname === '/404' || parsedUrl.search.includes('url='))) {
                    console.warn('Preventing recursive redirect');
                    return;
                }
                
                window.location.href = originalUrl;
            } catch (error) {
                console.error('Invalid URL:', originalUrl);
            }
            return;
        }
    }

    const currentPath = window.location.pathname;
    const isKnownPage = [
        '/', 
        '/404'
    ].includes(currentPath);

    if (!isKnownPage) {
        const currentUrl = window.location.href;
        window.location.href = '/404?url=' + encodeURIComponent(currentUrl);
    }
});