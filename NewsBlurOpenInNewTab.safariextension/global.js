var lastTabOpenedForTab = new WeakMap();

var newsBlurDomain = undefined;
function updateNewsBlurDomain() {
    newsBlurDomain = safari.extension.settings.NewsBlurDomain;
    if (newsBlurDomain)
        newsBlurDomain = newsBlurDomain.toLowerCase().replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    if (!newsBlurDomain)
        newsBlurDomain = 'newsblur.com';
}
safari.extension.settings.addEventListener('change', updateNewsBlurDomain);
updateNewsBlurDomain();

safari.application.addEventListener('message', function (event) {
    if (event.name == 'getNewsBlurDomain') {
        event.target.page.dispatchMessage('newsBlurDomain', newsBlurDomain);
        return;
    }

    var sourceTab = event.target;
    var lastTab = lastTabOpenedForTab.get(sourceTab);
    if (lastTab === undefined || lastTab.page === undefined)
        lastTab = sourceTab;
    var thisWindow = sourceTab.browserWindow;
    var lastTabIndex = thisWindow.tabs.indexOf(lastTab);
    if (lastTabIndex === -1)
        lastTabIndex = thisWindow.tabs.indexOf(sourceTab);

    if (event.name == 'openInNewTab') {
        // close "Untitled" tab if applicable
        if (thisWindow.tabs.length > lastTabIndex + 1) {
            var existingTab = thisWindow.tabs[lastTabIndex + 1];
            if (existingTab.url === "")
                existingTab.close();
        }
        var newTab = thisWindow.openTab(
                event.message.background ? 'background' : 'foreground',
                lastTabIndex + 1);
        lastTabOpenedForTab.set(sourceTab, newTab);
        newTab.url = event.message.href;
    }
});
