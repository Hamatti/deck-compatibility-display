setTimeout(() => {
  const steamDeckNode = document.querySelector(
    'div[data-featuretarget="deck-verified-results"]'
  );

  if (!steamDeckNode) {
    browser.runtime.sendMessage({
      action: "setBadge",
      content: "unknown",
    });
    return;
  }

  const verificationStatus = Object.values(
    steamDeckNode.querySelectorAll("span")
  ).filter((span) => {
    return Object.values(span.classList).some((_class) =>
      _class.startsWith("deckverified")
    );
  });

  if (verificationStatus.length != 1) {
    console.log("Could not find information");
    console.log(verificationStatus);
  } else {
    const status = verificationStatus[0].textContent;
    if (status == "Verified") {
      browser.runtime.sendMessage({
        action: "setBadge",
        content: "✅",
      });
    } else if (status == "Playable") {
      browser.runtime.sendMessage({
        action: "setBadge",
        content: "⚠️",
      });
    } else if (status === "Unsupported") {
      browser.runtime.sendMessage({
        action: "setBadge",
        content: "❌",
      });
    } else {
      browser.runtime.sendMessage({
        action: "setBadge",
        content: "unknown",
      });
    }
  }
}, 500);
