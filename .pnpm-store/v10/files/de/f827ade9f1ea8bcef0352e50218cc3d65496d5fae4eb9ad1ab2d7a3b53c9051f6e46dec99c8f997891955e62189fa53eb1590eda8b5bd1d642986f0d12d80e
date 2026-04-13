var protection = (function (need) {
    if (typeof window === 'undefined') {
        return;
    }
    if (need) {
        Object.defineProperty(window, 'MutationObserver', {
            writable: false,
            configurable: false,
        });
    }
});

export { protection as default };
