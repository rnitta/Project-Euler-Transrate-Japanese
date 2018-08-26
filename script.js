const execute = ()=> {
    const problemNumber = location.pathname.match(/.+problem=(\d{1,3})/)[1]
    const port = chrome.extension.connect({name: 'eulertrans'});
    port.postMessage({number: problemNumber, status: 'start'})

    port.onMessage.addListener((msg)=> {
        if (msg.status === 'parsed'){
            appendElm = `<hr /><div><h2>${msg.title}</h2><p>${msg.body}</p></div>`
            $('div.problem_content').append(appendElm)
        }
    })
}

$(execute())
