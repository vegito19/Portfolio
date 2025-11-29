// Initializes the typing animation for the element with id "typing-role".
// Requires Typed.js to be loaded on the page (via CDN or bundler).
(function() {
    function initTyped() {
        if (typeof Typed === 'undefined') return; // Typed.js not loaded yet
        var el = document.querySelector('#typing-role');
        if (!el) return; // Target not present

        new Typed('#typing-role', {
            strings: ['Front-End Developer', 'UI/UX Builder', 'Creative Designer'],
            typeSpeed: 60,
            backSpeed: 35,
            backDelay: 800,
            smartBackspace: true,
            loop: true,
            showCursor: true,
            cursorChar: '_'
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTyped);
    } else {
        initTyped();
    }
})();