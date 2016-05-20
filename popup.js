function openFromTextArea() {
    let urlsElem = document.querySelector("#urls");
    let urlsArray = urlsElem.value.split("\n");
    for (url of urlsArray) {
        if (url.match(/^(https?|ftp):\/\//)) {
            chrome.tabs.create({url: url});
        }
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
