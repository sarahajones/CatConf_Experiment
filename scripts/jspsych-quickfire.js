jsPsych.plugins['jspsych-quickfire'] = function () {

    var plugin = {};

    jsPsych.pluginAPI.registerPreload('same-different-image', 'stimuli', 'image')

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

            trial_number: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Trial Number',
                default: undefined,
                array: true,
                description: 'Number of trials to be looped.'
            },

            answer: {
                type: jsPsych.plugins.parameterType.SELECT,
                pretty_name: 'Answer',
                options: ['retrieve', 'leave'],
                default: 75,
                description: 'Either "retrieve" or "leave".'
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

            prompt: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Prompt',
                default: null,
                description: 'Any content here will be displayed under the button.'
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
    plugin.trial = function (display_element, trial) {
for (i)
        display_element.innerHTML = '<img class="jspsych-quickfire-stimulus" src="' + trial.stimuli[0] + '"</img>';

        var first_stim_info;
        if (trial.stimulus1_duration > 0) {
            jsPsych.pluginAPI.setTimeout(function () {
                showBlankScreen();
            }, trial.stimulus1_duration);
        } else {
            function afterKeyboardResponse(info) {
                first_stim_info = info;
                showBlankScreen();
            }
            jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: afterKeyboardResponse,
                valid_responses: trial.advance_key,
                rt_method: 'performance',
                persist: false,
                allow_held_key: false
            });
        }

            function showBlankScreen() {
                display_element.innerHTML = '';
                jsPsych.pluginAPI.setTimeout(function () {
                    showSecondStim();
                }, trial.gap_duration);
            }


        function showSecondStim() {
            display_element.innerHTML = '<img class="jspsych-quickfire_stimulus" src="' + trial.stimuli[1] + '"></img>';
            //show prompt
            if (trial.prompt !== null) {
                html += trial.prompt;
            }

            if (trial.stimulus2_duration > 0) {
                jsPsych.pluginAPI.setTimeout(function () {
                    display_element.querySelector('.jspsych-quickfire-stimulus').style.visibility = 'hidden';
                }, trial.stimulus2_duration);
            }

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


            var start_time = performance.now();

            for (var i = 0; i < trial.choices.length; i++) {
                display_element.querySelector('#jspsych-quickfire-button-' + i).addEventListener('click', function (e) {
                    var choice = e.currentTarget.getAttribute('data-choice'); // don't use dataset for jsdom compatibility
                    after_response(choice);
                });
            }

        }
            // store response
            var response = {
                rt: null,
                button: null
            };

            // function to handle responses by the subject
            function after_response(choice) {

                // measure rt
                var end_time = performance.now();
                var rt = end_time - start_time;
                response.button = choice;
                response.rt = rt;


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

        // function to end trial when it is time
        function end_trial() {

            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();

            // gather the data to store for the trial
            var trial_data = {
                "rt": response.rt,
                "stimulus": trial.stimulus,
                "button_pressed": response.button
            };

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

    };


        return plugin;
}();
