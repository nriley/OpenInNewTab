var lastTabOpenedForTab = new WeakMap();

function handleMessage(event) {
    var sourceTab = event.target;
    var lastTab = lastTabOpenedForTab.get(sourceTab);
    if (lastTab === undefined || lastTab.page === undefined)
        lastTab = sourceTab;
    var thisWindow = sourceTab.browserWindow;
    var lastTabIndex = thisWindow.tabs.indexOf(lastTab);

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
}

var sa = safari.application;
sa.addEventListener("message", handleMessage, false);
