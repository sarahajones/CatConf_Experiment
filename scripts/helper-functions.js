//HELPER FUNCTIONS
/* calculate RT to a certain number of decimal points */
function calculateRT(start, end) {
    start = parseFloat(start);
    end = parseFloat(end);
    var rt = end - start;
    return rt;
}

/* scroll to top of a page when page finishes loading. requires jQuery */
function scrollTop() {
    $(document).ready(function () {
        $(this).scrollTop(0);
    });
}


/* remove hash from URL without reloading the page */
function removeHash() {
    var scrollV, scrollH, loc = window.location;
    if ("pushState" in history) {
        history.pushState("", document.title, loc.pathname + loc.search);
    } else {
        // Prevent scrolling by storing the page's current scroll offset
        scrollV = document.body.scrollTop;
        scrollH = document.body.scrollLeft;

        loc.hash = "";

        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scrollV;
        document.body.scrollLeft = scrollH;
    }
}

/* remove the query string */
function removeQueryString() {
    var url = window.location.href;
    if (url.indexOf("?") > 0) {
        var updatedUri = url.substring(0, url.indexOf("?"));
        window.history.replaceState({}, document.title, updatedUri);
    }
}

//GENERAL HELPERS
//sum an array

function sum(input){

    if (toString.call(input) !== "[object Array]")
        return false;

    var total =  0;
    for(var i=0;i<input.length;i++)
    {
        if(isNaN(input[i])){
            continue;
        }
        total += Number(input[i]);
    }
    return total;
}


/* https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
* @param array {[]}
* @return {[]}*/
function shuffle(array) {
    let counter = array.length;

    if(counter === 2)
        return Math.random() < .5? array : array.reverse();

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

/*
 * Return a single array containing deckCount copies of deck shuffled together
 */
function shuffle_shoe(deck, deckCount=1) {
    let shoe = [];
    for (let d = 0; d < deck.length; d++) {
        let item = deck[d];
        for (let i = 0; i < deckCount; i++) {
            shoe.push(item);
        }
    }
    return shuffle(shoe);

}


//DISPLAY HELPERS
//create a doc/form on screen to fill
function createGeneral(name, parent, type, classNames, idName, innerHTML) {
    var name = parent.appendChild(document.createElement(type));
    if (classNames !== undefined) {
        name.setAttribute('class', classNames);
    }
    if (idName !== undefined) {
        name.setAttribute('id', idName);
    }
    name.innerHTML = innerHTML;
    return name;
}

// SHOW IMAGE:  generalised function for use and reuse
function displayImage(imgSrc, duration, callback) {
    const img = display_element.appendChild(document.createElement('img'));
    img.src = imgSrc;
    img.className = 'jspsych-quickfire-stimulus';
    img.style = display_element;
    setTimeout(callback, duration);
}

//SHOW BLANK SCREEN
function showBlankScreen(duration, callback) {
    // Blank out the screen
    display_element.innerHTML = '';
    // Callback after delay
    setTimeout(callback, duration);
}




//END OF HELPER FUNCTIONS