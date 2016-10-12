var newsBlurDomain = undefined;

safari.self.addEventListener('message', function(e) {
    if (e.name != 'newsBlurDomain')
        return;

    newsBlurDomain = e.message;
});
safari.self.tab.dispatchMessage('getNewsBlurDomain');

window.addEventListener('openInNewTab', function(e) {
    // Only work from NewsBlur domain
    var documentDomain = e.srcElement.ownerDocument.domain.toLowerCase();
    if (documentDomain != newsBlurDomain && !documentDomain.endsWith('.' + newsBlurDomain))
        return;

    // dispatchEvent returns false when extension is installed, true otherwise
    e.returnValue = false;
    var message = {
        href: e.target.href,
        background: e.detail.background
    };
    safari.self.tab.dispatchMessage('openInNewTab', message);
});

