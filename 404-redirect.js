document.addEventListener('DOMContentLoaded', function() {
    // Check if the requested page doesn't exist
    // You might need to adjust this condition based on how your site is structured
    const currentPath = window.location.pathname;
    const isKnownPage = currentPath === '/' || 
                        currentPath.startsWith('/index.html') || 
                        // Add other known page paths here
                        false;

    if (!isKnownPage) {
        // Encode the current full URL
        const currentUrl = window.location.href;
        
        // Redirect to the 404 page with the URL as a parameter
        window.location.href = '/404?url=' + encodeURIComponent(currentUrl);
    }
});