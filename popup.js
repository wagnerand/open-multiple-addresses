function openFromTextArea() {
    let urlsElem = document.querySelector("#urls");
    let urlsArray = urlsElem.value.split("\n");
    let absUrl = null;
    for (url of urlsArray) {
        if (url.match(/^(https?|ftp):\/\//)) {
            absUrl = url;
        } else {
            absUrl = "http://" + url;
        }
        chrome.tabs.create({url: absUrl});
    }
    window.close();
}

window.addEventListener("keypress", function(event) {
    if ((window.navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey) && (event.key == "Enter")) {
       openFromTextArea();
       event.preventDefault();
    }
}, true);

document.querySelector("#openFromTextArea").addEventListener("click", function(event) {
    openFromTextArea();
    event.preventDefault();
}, true);
