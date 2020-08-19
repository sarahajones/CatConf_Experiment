//this relies on css animation

jsPsych.plugins['jspsych-experimentscreen'] = (function() {

    var plugin = {};

    plugin.info = {
        name: 'jspsych-experimentscreen',
        description: '',

        parameters: {

            trial_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Trial duration',
                default: null,
                description: 'How long to show the trial.'
            },
            stimulus_duration:{
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Stimulus duration',
                default: null,
                description: 'How long the parcel rests on the ground for'
            },
            xPosition1st: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'xPosition of spaceship1',
                default: null,
                description: 'where to drop the spaceship1 from'
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
                default: '<button class="experiment-btn">%choice%</button>',
                array: true,
                description: 'The html of the button.'
            },
            spaceship: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Stimulus CSS',
                default: null,
                array: true,
                description: 'The css for the spaceship.'
            },
                d: {
                    type: jsPsych.plugins.parameterType.INT,
                    pretty_name: 'distribution used to draw position',
                    default: null,
                    description: 'distribution used to make xPosition'
                }
            }
        };


    plugin.trial = function(display_element, trial) {
        display_element.innerHTML = '';

        const response = {
            stimulus: null,
            number: null,
            start_time: performance.now(),
            response_time: null,
            end_time: null,
            delta_response_time: null,
            delta_feedback_time: null,
            button: null,
            button_label: trial.choices,
        };

        //draw "canvas" to screen
        var canvasDiv = document.createElement("div", id="jspsych-experimentscreen");
        canvasDiv.classList.add('gameboard');
        display_element.appendChild(canvasDiv);


        //spaceship
        var spaceship = document.createElement("div");
        spaceship.classList.add('spaceship');
        spaceship.style.left = `${trial.xPosition1st}px`;
        canvasDiv.appendChild(spaceship);
        //drop spaceship at specific x position



        //draw buttons to screen
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
            display_element.innerHTML += '<div class="jspsych-quickfire-button-" style= "display: inline-block; margin:' + trial.margin_vertical + ' ' + trial.margin_horizontal + '" id="jspsych-quickfire-button-' + i + '" data-choice="' + i + '">' + str + '</div>';
        }
        display_element.innerHTML += '</div>';

        awaitResponse();


        /**
         * waits for button response until response or timeout
         * remove the box from screen on stimulus duration is reached but hold trial to wait on buttons and/or trial timeout.
         */

        function awaitResponse() {


            for (var i = 0; i < trial.choices.length; i++) {
                display_element.querySelector('#jspsych-quickfire-button-' + i).addEventListener('click', function (e) {
                    var choice = e.currentTarget.getAttribute('data-choice');
                    afterResponse(parseInt(choice));
                });
            }



            // timeout: end trial if time limit is set
            if (trial.trial_duration !== null) {
                jsPsych.pluginAPI.setTimeout(function () {
                    end_trial();
                }, trial.trial_duration);
            }
        }

        /**
         * do stuff after button press
         * @param choice {int} tells us which button was pressed
         */
        function afterResponse(choice) {
            // measure response information
            response.response_time = performance.now();
            response.delta_response_time = response.response_time - response.start_time;
            response.button = choice;
            response.button_label = trial.choices[choice];

            // disable all the buttons after a response
            var btns = document.querySelectorAll('#jspsych-quickfire-button-');
            for (var i = 0; i < btns.length; i++) {
                btns[i].setAttribute('disabled', 'disabled');
            }
            end_trial()
        }

        /**
         * Cleanly end a jsPsych trial
         */
        function end_trial() {
            // clear the display
            display_element.innerHTML = '';

            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();

            // move on to the next trial
            jsPsych.finishTrial(response);
        }
    };

    return plugin;
})();