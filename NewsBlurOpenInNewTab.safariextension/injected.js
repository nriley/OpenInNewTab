window.addEventListener('openInNewTab', function(e) {
    // only work from newsblur.com
    if (!e.srcElement.ownerDocument.domain.toLowerCase().endsWith('.newsblur.com'))
        return;

    // Can use return value of dispatchEvent to determine whether extension is installed
    e.returnValue = false;
    var message = {
        href: e.target.href,
        background: e.detail.background
    };
    safari.self.tab.dispatchMessage('openInNewTab', message);
});
