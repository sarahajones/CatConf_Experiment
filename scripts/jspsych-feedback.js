jsPsych.plugins['jspsych-feedback'] = (function () {

    var plugin = {};

    plugin.info = {
        name: 'jspsych-feedback',
        prettyName: 'Block feedback',
        parameters: {

        }
    };

    plugin.trial = function (display_element, trial) {
        // clear display element and apply default page styles
        display_element.innerHTML = '';

        if (trial.isFirstTime) {
            var tutorial_text =
                '<p> Well done on completing the first round, time to see how you did! ' +
                'A correct response is either when you retrieved collected coins or correctly zapped a bomb. </p> ' +
                '<p>In total you got <strong>' + trial.correct + '</strong> right and <strong>' + trial.incorrect + '</strong> wrong. ' +
                'This means you got a total of <strong>' + trial.total + '</strong> points of a potential <strong>' + trial.trials + '</strong> Keep trying to improve your score each round! </p>';
            var header_text =
                '<h1>Round 1 complete - take a short break. </h1>'
        } else if(trial.isSecondTime)
        {var tutorial_text =
            '<p> Let\'s start with some "quick-fire" rounds to get things moving. ' +
            'You will see an image of a spaceship flash on screen followed by a package which it has "dropped" to earth. ' +
            'Press "retrieve" to collect the contents -  "zap" the package to destroy the contents. </p>' +
            '</p>Remember, packages could contain coins or may hold bombs that will lose you coins from your jar. ' +
            'You must decide whether or not to retrieve the package that has been dropped. This game round will help teach you about the different spaceships and their packages. </p>';
            var header_text =
                '<h1></h1>'
        }


        // create page elements
        var intro = createGeneral(
            intro,
            display_element,
            'div',
            'titlepage document-intro',
            'tutorial-intro',
            header_text
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
            '',
            '',
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