document.addEventListener('DOMContentLoaded', () => {
    // Initialize the selected page from sessionStorage, default to "Home"
    if (!sessionStorage.getItem("selectedPage")) {
        sessionStorage.setItem("selectedPage", "Home");
    }

    const pages = document.querySelectorAll('.nav-link');

    // Highlight the active page
    setPage(sessionStorage.getItem("selectedPage"));

    pages.forEach((page) => {
        page.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent immediate navigation

            const newPage = page.innerHTML;
            setPage(newPage); // Update active state

            // Navigate to the href after updating the active state
            window.location.href = page.href;
        });
    });   
});

function setPage(newPage) {
    sessionStorage.setItem("selectedPage", newPage); // Store selected page in sessionStorage

    const pages = document.querySelectorAll('.nav-link');

    pages.forEach((page) => {
        // Clear active state from all items
        page.classList.remove('active', 'text-white');
        page.classList.add('text-white');

        // Add active state to the matching page
        if (page.innerHTML === newPage) {
            page.classList.add('active'); // Bootstrap class for active item
            page.classList.remove('text-white'); // Ensure selected item stands out
        }
    });
}
