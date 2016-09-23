window.addEventListener('openInNewTab', function(e) {
    // Can use return value of dispatchEvent to determine whether extension is installed
    e.returnValue = false;
    var message = {
        href: e.target.href,
        background: e.detail.background
    };
    safari.self.tab.dispatchMessage('openInNewTab', message);
});
