parseWiki = (document, port)=> {
    title = $('div#body h2', document).text().replace(/Problem\s\d{1,3}|「|」|\s|†/g, '')
    body = $.makeArray($('div#body p', document)).reduce((str, node)=> { return str += node.innerText + '<br>' }, '')
    port.postMessage({status: 'parsed', title: title, body: body})
}

chrome.extension.onConnect.addListener(function(port) {
    console.assert(port.name === 'eulertrans');
    port.onMessage.addListener(function(msg) {
        if(msg.status === 'start'){
            $.get('http://odz.sakura.ne.jp/projecteuler/index.php', {cmd: 'read', page: `Problem ${msg.number}`}, (res)=> {parseWiki(res, port)})
        }
    })
})
