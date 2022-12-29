const POPUPS = {
  "✅": "popups/verified.html",
  "⚠️": "popups/playable.html",
  "❌": "popups/unsupported.html",
};

browser.browserAction.setBadgeBackgroundColor({
  color: [0, 0, 0, 0],
});

browser.runtime.onMessage.addListener((message, sender) => {
  if (message.action == "setBadge") {
    if (message.content === "unknown") {
      browser.browserAction.setPopup({
        popup: null,
        tabId: sender.tab.tabId,
      });
    } else {
      browser.browserAction.setBadgeText({
        text: message.content,
        tabId: sender.tab.id,
      });

      browser.browserAction.setPopup({
        popup: POPUPS[message.content],
        tabId: sender.tab.tabId,
      });
    }
  }
});
