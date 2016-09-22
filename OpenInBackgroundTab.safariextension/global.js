function handleMessage(event) {
	var sourceTab = event.target;
	var thisWindow = sourceTab.browserWindow;

	switch (event.name) {
    case 'openInNewTab':
		newTab = thisWindow.openTab(event.message.background ? 'background' : 'foreground');
		newTab.url = event.message.href;
        break;
    }
}

var sa = safari.application;
sa.addEventListener("message", handleMessage, false);
