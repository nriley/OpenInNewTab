window.addEventListener('openInNewTab', function(e) {
    var message = {
        href: e.target.href,
        background: e.detail.background
    };
    safari.self.tab.dispatchMessage('openInNewTab', message);
    e.preventDefault();
});
