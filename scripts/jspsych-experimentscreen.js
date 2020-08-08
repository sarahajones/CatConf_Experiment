//this relies on css animation

jsPsych.plugins["jspsych-experimentscreen"] = (function() {

    var plugin = {};

    plugin.info = {
        name: "jspsych-experimentscreen",
        parameters: {
            trial_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Trial duration',
                default: null,
                description: 'How long to show the trial.'
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
        }
    };

    plugin.trial = function(display_element, trial) {
        display_element.innerHTML = '';

        //draw "canvas" to screen
        var canvasDiv = document.createElement("div", id="jspsych-experimentscreen");
        canvasDiv.classList.add('gameboard');
        display_element.appendChild(canvasDiv);



        // set up positions for drops
        function getDropPosition() {
            position = Math.floor(Math.random() * trial.xPosition1st)
            return position
        }
        //spaceship
        var spaceship = document.createElement("div");
        spaceship.classList.add('spaceship');
        document.documentElement.style.setProperty('--xPosition', getDropPosition());
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

        //wait until trial times out or response is given
        function awaitResponse() {
            for (var i = 0; i < trial.choices.length; i++) {
                display_element.querySelector('#jspsych-quickfire-button-' + i).addEventListener('click', function (e) {
                    var choice = e.currentTarget.getAttribute('data-choice');
                    afterResponse(choice);
                });
            }
            // end trial if time limit is set
            if (trial.trial_duration !== null) {
                jsPsych.pluginAPI.setTimeout(function () {
                    end_trial();
                }, trial.trial_duration);
            }

            // data saving
            var trial_data = {
                parameter_name: 'parameter value'
            };
        }
        // end trial
        jsPsych.finishTrial(trial_data);
    };

    return plugin;
})();