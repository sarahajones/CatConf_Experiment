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

        console.log(trial.correct)

        if (trial.isFirstTime) {
            var tutorial_text =
                '<p> Well done on completing the first round, time to see how you did! ' +
                'Remember, a correct response is either when you retrieved collected coins or correctly zapped a bomb. </p> ' +
                '<p>In total you got <strong>' + trial.correct + '</strong> right and <strong>' + trial.incorrect + '</strong> wrong. ' +
                'This means you got a total of <strong>' + trial.correct + '</strong> points of a potential <strong>' + trial.trials + '</strong> Keep trying to improve your score each round! </p>';
            var header_text =
                '<h1>Round 1 complete - take a short break. </h1>'

            var button_label =
                '<div>Press to continue</div>'
            var imageID = 'demo_instruction';
        } else if(trial.isSecondTime)
        {var tutorial_text =
            '<p> Another round done - let\'s see how your scores are doing. ' +
            'Remember, a correct response is either when you retrieved collected coins or correctly zapped a bomb. </p> ' +
            '<p>In total you got <strong>' + trial.correct + '</strong> right and <strong>' + trial.incorrect + '</strong> wrong. ' +
            'This means you got a total of <strong>' + trial.correct + '</strong> points of a potential <strong>' + trial.trials + '</strong> Keep trying to improve your score each round! </p>';
            var header_text =
                '<h1>Round 2 complete - take a short break.</h1>'
            var button_label =
                '<div>Press to continue</div>'
        }
        else if(trial.isThirdTime)
        {var tutorial_text =
            '<p> Another round done - let\'s see how your scores are doing. ' +
            'Remember, a correct response is either when you retrieved collected coins or correctly zapped a bomb. </p> ' +
            '<p>In total you got <strong>' + trial.correct + '</strong> right and <strong>' + trial.incorrect + '</strong> wrong. ' +
            'This means you got a total of <strong>' + trial.correct + '</strong> points of a potential <strong>' + trial.trials + '</strong> Keep trying to improve your score each round! </p>';
            var header_text =
                '<h1>Round 3 complete - take a short break.</h1>'
            var button_label =
                '<div>Press to continue</div>'
        } else if(trial.isLastTime) {
            var tutorial_text =
                '<p> ' +
                ' ' +
                ' ' +
                ' ' +
                ' ' +
                ' ' +
                ' ' +
                ' ' +
                ' ' +
                ' ' +
                ' ' +
                '</p> ';
            var header_text =
                '<h1>The study is now over - you may exit the study screen.' +
                '' +
                '' +
                '' +
                '' +
                '' +
                '' +
                '' +
                '' +
                '' +
                '' +
                '' +
                '' +
                '</h1>';
            var button_label =
                '<div> Please close the experiment screen </div>'
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
            'header-logo',
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
            button_label
        );


        // define what happens when people click on the final submit button
        $('#tutorial-submit').on('click', function() {
            // save the data to data object
            jsPsych.finishTrial();
            return;

        });


    };

    return plugin;
})();