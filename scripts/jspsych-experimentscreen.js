//this relies on css animation

jsPsych.plugins['jspsych-experimentscreen'] = function () {

    var plugin = {};

    plugin.info = {
        name: 'jspsych-experimentscreen',
        description: '',

        parameters: {

            trial_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Trial duration',
                default: undefined,
                description: 'How long to show the trial.'
            },
            stimulus_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Stimulus duration',
                default: undefined,
                description: 'How long the parcel rests on the ground for'
            },
            choices: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Choices',
                default: undefined,
                array: true,
                description: 'The labels for the buttons.'
            },
            location: {
                type: jsPsych.plugins.parameterType.FLOAT,
                pretty_name: 'position of the dropped parcel',
                default: undefined,
                description: 'horizontal position of the dropped parcel'
            },
            spaceship_class: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'color of spaceship',
                default: undefined,
                description: 'color of spaceship that links to d'
            },
            trial_type: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'type of trial',
                default: undefined,
                description: 'trial type, clear-training or cloudy-testing'
            },
            distribution_name: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'distribution from which location was drawn',
                default: undefined,
                description: 'names the distribution from which drop locations are drawn'
            },

            banner_text: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Banner text',
                default: null,
                array: true,
                description: 'if banner text is specified it overrides the buttons to be displayed.'
            },

            confidence_trial: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'confidence trial',
                default: undefined,
                description: 'whether confidence is collected or not'
            }
        }
    };


    plugin.trial = function (display_element, trial) {
        display_element.innerHTML = '';

        const response = {
            stimulus: null,
            number: null,
            trial_type: trial.trial_type,
            distribution_name: trial.distribution_name,
            spaceship_class: trial.spaceship_class,
            location: trial.location,
            start_time: performance.now(),
            response_time: null,
            end_time: null,
            delta_response_time: null,
            delta_feedback_time: null,
            button: null,
            button_label: trial.choices,
            confidence: null,
        };


        //draw "canvas" to screen
        var canvasDiv = document.createElement("div");
        canvasDiv.id = "jspsych-experimentscreen";
        canvasDiv.classList.add('gameboard');
        display_element.appendChild(canvasDiv);

        if (trial.trial_type !== 'clear') {
            var cloudbank = document.createElement('div');
            cloudbank.classList.add('cloudbank');
            display_element.appendChild(cloudbank);
        }



            //spaceship
            var spaceship = document.createElement("div");
            spaceship.classList.add('spaceship', trial.spaceship_class);
            spaceship.style.left = `${trial.location}px`;
            canvasDiv.appendChild(spaceship);
            //drop spaceship at specific x position


            //draw buttons to screen

            var buttons = document.createElement("div")
            buttons.id = 'jspsych-quickfire-btngroup';

            trial.choices.forEach((c, i) => {
                var button = document.createElement('div');
                button.id = 'experiment-btn';
                button.classList.add('experiment-btn');
                button.innerHTML = c;
                button.dataset.choice = i;
                buttons.appendChild(button);
                button.addEventListener(
                    'click',
                    (e) => afterResponse(parseInt(c))
                );
            });

            display_element.appendChild(buttons);
        // if fast learning trial display banner underneath screen.

        if (trial.banner_text !== null) {
            var banner = document.createElement("div");
            banner.classList.add('banner')
            banner.innerHTML = trial.banner_text;
            buttons.appendChild(banner);
        }
            // timeout: end trial if time limit is set
            if (trial.trial_duration !== null) {
                jsPsych.pluginAPI.setTimeout(function () {
                    end_trial();
                }, trial.trial_duration);
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
                var btns = document.querySelectorAll('jspsych-quickfire-btngroup');
                for (var i = 0; i < btns.length; i++) {
                    btns[i].setAttribute('disabled', 'disabled');
                }

                jsPsych.pluginAPI.clearAllTimeouts();

                if (trial.confidence_trial)
                    getConfidence();
                else
                    end_trial();
            }

            /**
             * display a confidence slider to collect a confidence report on confidence trials
             */
            function getConfidence() {

                buttons.innerHTML = '';

                var confidenceSlider = document.createElement("input");
                confidenceSlider.classList.add('slider');
                confidenceSlider.id = "slider";
                confidenceSlider.type = 'range';
                confidenceSlider.min = "0";
                confidenceSlider.max = "100";
                confidenceSlider.step = "1";
                confidenceSlider.requireInteraction = true;
                buttons.appendChild(confidenceSlider);

                var tooltips = document.createElement("div");
                tooltips.classList.add('tooltip');
                confidenceSlider.appendChild(tooltips)

                var confirm = document.createElement('div');
                confirm.id = "small-button"
                confirm.classList.add('button');
                confirm.style.position = 'flex';
                confirm.innerHTML = 'Confirm';
                buttons.appendChild(confirm);
                confirm.addEventListener('click', end_trial);


                var tooltip = $('<div id="tooltip" />').css({
                    position: 'absolute',
                    top: -25,
                    left: -10
                }).hide();
                $("#slider").slider({
                    value: 50,
                    min: 0,
                    max: 100,
                    step: 1,
                    slide: function(event, ui) {
                        tooltip.text(ui.value);
                    },
                    change: function(event, ui) {}
                }).find(".ui-slider-handle").append(tooltip).hover(function() {
                    tooltip.show()
                }, function() {
                    tooltip.hide()
                });
                response.confidence = display_element.querySelector('input.slider').value;
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
        }
        ;

        return plugin;

}
();