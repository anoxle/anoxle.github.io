document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    
    if (!currentPath.includes('404') && !window.location.search.includes('url=')) {
        const currentUrl = window.location.href;
        window.location.href = '/404?url=' + encodeURIComponent(currentUrl);
    }
});