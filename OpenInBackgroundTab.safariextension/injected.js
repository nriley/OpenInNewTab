window.addEventListener('click', function(e) {
    var message = {
        href: e.target.href
    };
    safari.self.tab.dispatchMessage('openInNewBackgroundTab', message);
    e.preventDefault();
    // return true;
});