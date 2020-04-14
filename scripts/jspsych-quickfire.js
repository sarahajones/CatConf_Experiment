jsPsych.plugins['jspsych-quickfire'] = (function () {

    var plugin = {};

    /*------ Define plugin information ----- */
    plugin.info = {
        name: "jspsych-quickfire",
        description: '',
        parameters: {

            stimuli: {
                type: jsPsych.plugins.parameterType.IMAGE,
                pretty_name: 'Stimuli',
                default: undefined,
                array: true,
                description: 'The images to be displayed.'
            },

            feedback: {
                type: jsPsych.plugins.parameterType.IMAGE,
                pretty_name: 'Trial Feedback',
                default: undefined,
                array: true,
                description: 'Trial by trial feedback.'
            },

            trial_number: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Trial Number',
                default: undefined,
                array: true,
                description: 'Number of trials to be looped.'
            },

            choices: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Choices',
                default: undefined,
                array: true,
                description: 'The labels for the buttons.'
            },

            button_html: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Button HTML',
                default: '<button class="large-button">%choice%</button>',
                array: true,
                description: 'The html of the button.'
            },

            stimulus1_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Stimulus1 duration',
                default: null,
                description: 'How long to hide the stimulus.'
            },

            gap_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Gap duration',
                default: 0,
                description: 'How long to show a blank screen in between the two stimuli.'
            },

            stimulus2_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Stimulus2 duration',
                default: null,
                description: 'How long to hide the stimulus.'
            },

            trial_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Trial duration',
                default: null,
                description: 'How long to show the trial.'
            },

            response_ends_trial: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Response ends trial',
                default: true,
                description: 'If true, then trial will end when user responds.'
            },

        }
    };

    /* ----- Start trial then showing stimulus 1, gap, 2 -----*/
    plugin.trial = (function (display_element, trial) {

        const response = {
            stimuli: trial.stimuli,
            number: trial_number,
            start_time: performance.now(),
            response_time: null,
            end_time: null,
            delta_response_time: null,
            delta_feedback_time: null,
            button: null,
            button_label: trial.choices,
        };

        // SHOW IMAGE:  generalised function for use and reuse
        function displayImage(imgSrc, duration, callback) {
            display_element.querySelector('img').src = imgSrc;
            setTimeout(callback, duration);
        }

        // SHOW FIRST STIMULUS (set by procedural code below)
        /*function showFirstStimulus() {
            displayImage(trial.stimuli[0], stimulus1_duration, showSecondStimulus);
        }*/

        // BLANK SCREEN
        function showBlankScreen() {
            displayImage(display_element.innerHTML = '', trial.gap_duration, showSecondStimulus);
        }

        // SHOW 2ND STIMULUS + BUTTON/s
        function showSecondStimulus() {
            displayImage(trial.stimuli[1], 1000, awaitResponse);

            //display buttons
            var buttons = [];
            if (Array.isArray(trial.button_html)) {
                if (trial.button_html.length == trial.choices.length) {
                    buttons = trial.button_html;
                } else {
                    console.error('Error in image-button-response plugin. The length of the button_html array does not equal the length of the choices array');
                }
            } else {
                for (var i = 0; i < trial.choices.length; i++) {
                    buttons.push(trial.button_html);
                }
            }
            display_element.innerHTML += '<div id="jspsych-quickfire-btngroup">';

            for (var i = 0; i < trial.choices.length; i++) {
                var str = buttons[i].replace(/%choice%/g, trial.choices[i]);
                display_element.innerHTML += '<div class="jspsych-quickfire-button-" style="display: inline-block; margin:' + trial.margin_vertical + ' ' + trial.margin_horizontal + '" id="jspsych-quickfire-button-' + i + '" data-choice="' + i + '">' + str + '</div>';
            }
            display_element.innerHTML += '</div>';

            for (var i = 0; i < trial.choices.length; i++) {
                display_element.querySelector('#jspsych-quickfire-button-' + i).addEventListener('click', function (e) {
                    var choice = e.currentTarget.getAttribute('data-choice'); // don't use dataset for jsdom compatibility
                    after_response(choice);
                });
            }
        }


        // BUTTON RESPONSE
        // function to handle responses by the subject
        function after_response(choice) {

            // measure response information
            response.response_time = performance.now();
            response.delta_response_time = response_time - start_time;
            response.button = choice;
            response.button_label = trial.choices[choice];


            // disable all the buttons after a response
            var btns = document.querySelectorAll('.jspsych-quickfire-button button');
            for (var i = 0; i < btns.length; i++) {
                //btns[i].removeEventListener('click');
                btns[i].setAttribute('disabled', 'disabled');
            }

            if (trial.response_ends_trial) {
                end_trial();
            }
        }
        // Feedback
        function showFeedback() {
            displayImage(trial.feedback, 1000, end_trial)


        //END TRIAL
        // function to end trial when it is time
        function end_trial() {

            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();

            // gather the data to store for the trial
            var trial_data = response;

            // clear the display
            display_element.innerHTML = '';

            // move on to the next trial
            jsPsych.finishTrial(trial_data);
        }

        // hide image if timing is set
        if (trial.stimulus2_duration !== null) {
            jsPsych.pluginAPI.setTimeout(function() {
                display_element.querySelector('jspsych-quickfire-stimulus').style.visibility = 'hidden';
            }, trial.stimulus2_duration);
        }

        // end trial if time limit is set
        if (trial.trial_duration !== null) {
            jsPsych.pluginAPI.setTimeout(function() {
                end_trial();
            }, trial.trial_duration);
        }

        // Procedural code
        // displayImage(trial.stimuli[0], trial.stimulus1_duration, showBlankScreen);
    };

    })();
    return plugin;
})();