// Listens to all type of actions
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: request.action }, function (response) {
      sendResponse(response)
    })
  })
  return true // Keep the message port open for async response
})
