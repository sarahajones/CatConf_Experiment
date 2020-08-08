jsPsych.plugins["trial"] = (function() {

    var plugin = {};

    plugin.info = {
        name: "trial",
        parameters: {
            canvasHTML: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name: 'Canvas HTML',
                default: null,
                description: 'HTML for drawing the canvas. ' +
                    'Overrides canvas width and height settings.'
            },
            canvasWidth: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Canvas width',
                default: 600,
                description: 'Sets the width of the canvas.'
            },
            canvasHeight: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Canvas height',
                default: 300,
                description: 'Sets the height of the canvas.'
            },

            goodSpaceship: {
                type: jsPsych.plugins.parameterType.IMAGE,
                pretty_name: 'Stimuli',
                default: undefined,
                array: true,
                description: 'The images to be displayed.'
            },

            badSpaceship: {
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
            button_html: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Button HTML',
                default: '<button class="small-button">%choice%</button>',
                array: true,
                description: 'The html of the button.'
            },
        }
    }

    plugin.trial = function(display_element, trial) {
        display_element.innerHTML = "<svg id='gameboard_canvas' width=" + trial.canvasWidth + " height=" + trial.canvasHeight + "></svg>";


        // data saving
       // var trial_data = {
       //     parameter_name: 'parameter value'
        //};

        // end trial
        jsPsych.finishTrial();
    };

    return plugin;
})();
