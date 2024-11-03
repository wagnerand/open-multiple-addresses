let isMac = window.navigator.platform.match("Mac");

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

document.addEventListener("keydown", (event) => {
    if ((isMac ? event.metaKey : event.ctrlKey) && (event.key == "Enter")) {
        if (event.shiftKey) {
            pasteIntoTextArea();
        }
        openFromTextArea();
        event.preventDefault();
    }
}, true);

document.addEventListener("DOMContentLoaded", (event) => {
    let modifier = isMac ? "\u2318" : "\u2303";
    document.querySelector("#openFromTextArea .text-shortcut").textContent = `(${modifier}\u23ce)`
    document.querySelector("#pasteAndOpenFromTextArea .text-shortcut").textContent = `(${modifier}\u21e7\u23ce)`
});
