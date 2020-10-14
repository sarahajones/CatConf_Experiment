jsPsych.plugins['jspsych-feedback'] = (function () {

    var plugin = {};

    plugin.info = {
        name: 'jspsych-feedback',
        prettyName: 'Block feedback',
        parameters: {
            trial_type: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'the trial type',
                default: undefined,
                description: 'what feedback trial type is it e.g. first or last'
            },

            filter_fun: {
                type: jsPsych.plugins.parameterType.FUNCTION,
                pretty_name: 'Filter Function',
                default: undefined,
                description: 'The filter function to pull data for feedback calc'
            },
        }
    };

    plugin.trial = function (display_element, trial) {
        // clear display element and apply default page styles
        display_element.innerHTML = '';

        const data = JSON.parse(jsPsych.data.get().json())
            .filter(trial.filter_fun);

        let correct = 0;
        let incorrect = 0;
        let coins = 0;

        data.forEach((x) => {
            if(x.correct === 1){
                correct++;
            } else if(x.incorrect === 1)
                incorrect++;

            coins += x.coins;
        });


        // const tutorial_text = `
        // <p>Well done on completing round ${trial.round_number}.</p>
        // <p>Remember, a correct response is either when you retrieved collected coins or correctly zapped a bomb.</p>
        // <p>
        //     In total you got <strong>${correct}</strong> right and <strong>${incorrect}</strong> wrong.
        //     This means you got a total of <strong>${coins}</strong> points of a potential <strong>${data.length}</strong>
        // </p>
        // `;

        if (trial.trial_type === 'first') {
            var tutorial_text =
                '<p> Well done on completing the first round, time to see how you did! ' +
                'Remember, a correct response is either when you retrieved collected coins or correctly zapped a bomb. </p> ' +
                '<p>In total you got <strong>' + correct + '</strong> right and <strong>' + incorrect + '</strong> wrong. ' +
                'This means you got a total of <strong>' + correct + '</strong> points of a potential <strong>' + data.length + '</strong> Keep trying to improve your score each round! </p>';
            var header_text =
                '<h1>Round 1 complete - take a short break. </h1>'

            var button_label =
                '<div>Press to continue</div>'
            var imageID = 'demo_instruction';
        } else if(trial.trial_type ==='second')
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
        else if(trial.trial_type === 'third')
        {var tutorial_text =
            '<p> Another round done - let\'s see how your scores are doing. ' +
            'Remember, a correct response is either when you retrieved collected coins or correctly zapped a bomb. </p> ' +
            '<p>In total you got <strong>' + trial.correct + '</strong> right and <strong>' + trial.incorrect + '</strong> wrong. ' +
            'This means you got a total of <strong>' + trial.correct + '</strong> points of a potential <strong>' + trial.trials + '</strong> Keep trying to improve your score each round! </p>';
            var header_text =
                '<h1>Round 3 complete - take a short break.</h1>'
            var button_label =
                '<div>Press to continue</div>'
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