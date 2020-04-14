jsPsych.plugins['jspsych-tutorial'] = (function () {

    var plugin = {};

    plugin.info = {
        name: 'jspsych-tutorial',
        prettyName: 'Study Tutorial',
        parameters: {}
    };

    plugin.trial = function (display_element, trial) {
        // clear display element and apply default page styles
        display_element.innerHTML = '';

        if (trial.isFirstTime) {
            var tutorial_text =
                '<p> During this study, you will see a game-screen with spaceships dropping packages to the earth. You can use your mouse to click on a package when it lands safely. </p>' +
                '<p>Clicking on a package when it has landed will retrieve its contents. The packages will contain either coins or a bomb. Collected coins will collect in your reward jar, whereas retrieving bombs will lose you coins from your jar. Your goal is to figure out which of the packages to retrieve and to collect as many coins as possible by the end of the game. </p>';
        } else {
            var tutorial_text =
                '<p> To practice the retrieval process and become familiar with the kinds of images you will see in the game we will begin with some quick-fire rounds. ' +
                'In these rounds you will see an image of a spaceship flash on screen followed by a package which it has "dropped" to earth.  </p>' +
                '<p> You must decide whether or not to retrieve the package that has been dropped - this round will help teach you about the different spaceships. </p>';
        }

        // create page elements
        var intro = createGeneral(
            intro,
            display_element,
            'div',
            'titlepage document-intro',
            'tutorial-intro',
            '<h1>The following pages will help guide you through the upcoming experiment, please read them carefully. </h1>'
        );

        var ethicsForm = createGeneral(
            ethicsForm,
            display_element,
            'div',
            'document-in-document',
            'tutorial-form',
            ''
        );
        var instructHeader = createGeneral(
            instructHeader,
            ethicsForm,
            'div',
            'document-header',
            'tutorial-header',
            ''
        );

        var logo = createGeneral(
            logo,
            instructHeader,
            'div',
            'header-logo',
            'demo_instruction',
            ''
        );
        var instructText = createGeneral(
            instructText,
            instructHeader,
            'div',
            'document-text',
            'tutorial-text',
            tutorial_text
        );
        var footer = createGeneral(
            footer,
            ethicsForm,
            'div',
            'document-footer',
            'tutorial-footer',
            ''
        );
        var instructAcknowledge = createGeneral(
            instructAcknowledge,
            display_element,
            'button',
            'large-button',
            'tutorial-submit',
            '<div>Press to continue</div>'
        );


        // define what happens when people click on the final submit button
        $('#tutorial-submit').on('click', function() {
            // save the data to data object
            dataObject['tutorial_acknowledged']   = true;
            jsPsych.finishTrial();
            return;

        });


    };

    return plugin;
})();