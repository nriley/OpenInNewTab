function handleMessage(event) {
	var sourceTab = event.target;
	var thisWindow = sourceTab.browserWindow;

	switch (event.name) {
    case 'openInNewBackgroundTab':
		newTab = thisWindow.openTab('background');
		newTab.url = event.message.href;
        break;
    }
}

var sa = safari.application;
sa.addEventListener("message", handleMessage, false);
