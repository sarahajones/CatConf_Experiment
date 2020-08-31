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
                '<p> During this study, you will play a game where different spaceships drop packages down to the earth. You can decide whether or not to retrieve a package when it lands safely. ' +
                'The packages will contain either coins or a bomb. Collected coins will accumulate in your reward jar, whereas retrieving bombs will lose you coins from your jar. </p> ' +
                '<p>Your goal is to collect as many coins as possible by the end of the game. </p>';
        } else if(trial.isSecondTime)
        {var tutorial_text =
                '<p> Let\'s start with some "quick-fire" rounds to get things moving. ' +
                'You will see an image of a spaceship flash on screen followed by a package which it has "dropped" to earth. ' +
                'Press "retrieve" to collect the contents -  "zap" the package to destroy the contents. </p>' +
                '</p>Remember, packages could contain coins or may hold bombs that will lose you coins from your jar. ' +
                'You must decide whether or not to retrieve the package that has been dropped. This game round will help teach you about the different spaceships and their packages. </p>';
        } else if(trial.isThirdTime)
        { var tutorial_text =
            '<p> Press the continue button to start the round. ' +
            'Remember, you will see an image of a spaceship flash on screen followed by a package which it has "dropped" to earth. ' +
            'Press "retrieve" to collect the contents -  "zap" the package to destroy the contents. </p>' +
            '<p>You are trying to collect coins and avoid bombs - good luck!</p>'

        }

        // create page elements
        var intro = createGeneral(
            intro,
            display_element,
            'div',
            'titlepage document-intro',
            'tutorial-intro',
            '<h1>The following pages will help guide you through the upcoming study, please read them carefully. </h1>'
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