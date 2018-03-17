function pasteIntoTextArea() {
    document.addEventListener("paste", (event) => {
        document.querySelector("#urls").value = event.clipboardData.getData("text");
        event.preventDefault();
    }, { once: true });
    document.execCommand("paste");
}

function openFromTextArea() {
    let urlsElem = document.querySelector("#urls");
    let urlsArray = urlsElem.value.split("\n");
    let absUrl = null;
    console.log(urlsArray)
    for (url of urlsArray) {
        if (url.length > 0) {
            url = encodeURI(url);
            if (url.match(/^(https?|ftp):\/\//)) {
                absUrl = url;
            } else {
                absUrl = "http://" + url;
            }
            chrome.tabs.create({ url: absUrl });
        }
    }
    window.close();
}

document.querySelector("#openFromTextArea").addEventListener("click", (event) => {
    openFromTextArea();
    event.preventDefault();
}, true);

document.querySelector("#pasteAndOpenFromTextArea").addEventListener("click", (event) => {
    pasteIntoTextArea();
    openFromTextArea();
}, true);

document.addEventListener("keypress", (event) => {
    if ((window.navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey) && (event.key == "Enter")) {
        if (event.shiftKey) {
            pasteIntoTextArea();
        }
        openFromTextArea();
        event.preventDefault();
    }
}, true);

document.addEventListener("load", (event) => {
    document.querySelector("#urls").focus();
});
