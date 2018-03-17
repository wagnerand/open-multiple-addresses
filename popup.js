function openFromTextArea() {
    let urlsElem = document.querySelector("#urls");
    let urlsArray = urlsElem.value.split("\n");
    let absUrl = null;
    for (url of urlsArray) {
        if (url.length > 0) {
            if (url.match(/^(https?|ftp):\/\//)) {
                absUrl = url;
            } else {
                absUrl = "http://" + url;
            }
            chrome.tabs.create({url: absUrl});
        }
    }
    window.close();
}

document.addEventListener("keypress", (event) => {
    if ((window.navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey) && (event.key == "Enter")) {
       openFromTextArea();
       event.preventDefault();
    }
}, true);

document.querySelector("#openFromTextArea").addEventListener("click", (event) => {
    openFromTextArea();
    event.preventDefault();
}, true);

document.addEventListener("load", (event) => {
    document.querySelector("#urls").focus();
});
