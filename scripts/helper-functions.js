//HELPER FUNCTIONS

//GENERAL HELPERS

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

/*
//calculating normal distributions for dropzones

// Models the normal distribution
var Gaussian = function (mean, variance){
    if (variance <= 0) {
        throw new Error('Variance must be > 0 (but was ' + variance + ')');
    }
    this.mean = mean;
    this.variance = variance;
    this.standardDeviation = Math.sqrt(variance);
}

// Generate [num] random samples
Gaussian.prototype.random = function(num){
    let mean = this.mean;
    let std = this.standardDeviation;
    return Array(num).fill(0).map(() => {
        return generateGaussian(mean,std)
    })
};

var gaussian = function(mean, variance) {
    return new Gaussian(mean, variance);
};

var fromPrecisionMean = function(precision, precisionmean) {
    return gaussian(precisionmean / precision, 1 / precision);
};

exports(gaussian);
})
/*var distribution = gaussian(mean, variance);
// Take a random sample using inverse transform sampling method.
var sample = distribution.ppf(Math.random());

function dropZone (nPoints, mu, sigma) {
    distribution = (1/(Math.sqrt(2*Math.PI)))*Math.log*Math.exp((-1/2)(((x - mu)/sigma)*Math.exp(2)))

    numbers.random.distribution.boxMuller(n, mu, sigma, rc)
}
*/



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