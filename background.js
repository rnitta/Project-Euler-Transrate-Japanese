(function() {
  chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.query({
        'url': 'https://www.youtube.com/watch*'
      },
      (tabs) => {
        window.youtube_tab = tabs[0]
        if (command == 'play-stop') {
          click_btn('ytp-play-button')
        } else if (command == 'next-video') {
          click_btn('ytp-next-button')
        } else if (command == 'previous-video') {
          click_btn('ytp-prev-button')
        } else if (command == 'show-title') {
          show_title()
        }
      }
    )
  })
})()

function click_btn(class_name) {
  chrome.tabs.executeScript(window.youtube_tab.id, {
    'code': 'document.getElementsByClassName("' + class_name + '")[0].click()'
  })
}

function show_title() {
  chrome.tabs.executeScript(window.youtube_tab.id, {
      'code': 'document.getElementsByClassName("title ytd-video-primary-info-renderer")[0].innerText;'
    },
    (ret_arr) => {
      console.log(ret_arr)
      var opt = {
        type: 'basic',
        title: 'Command Youtube Controller',
        message: ret_arr[0],
        iconUrl: "icons/icon128.png"
      }

      chrome.notifications.create("", opt, function(id) {})
    }
  )
}
