jsPsych.plugins['jspsych-splashmessage'] = (function () {

    var plugin = {};

    plugin.info = {
        name: 'jspsych-splashmessage',
        prettyName: 'Splash message',
        parameters: {
            trial_type: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'trial type',
                default: undefined,
                description: 'what type of splash trial this is'
            },
            display_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Splash duration',
                default: null,
                description: 'How long to show the splash.'
            },
            trial_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Trial duration',
                default: undefined,
                description: 'How long to show the trial.'
            }
        }
    };

    plugin.trial = function (display_element, trial) {

        //HELPER FUNCTION SHOW BLANK SCREEN
        function showBlankScreen(duration, callback) {
            // Blank out the screen
            display_element.innerHTML = '';
            // Callback after delay
            if(typeof callback === 'function')
                setTimeout(callback, duration);
        }

        // clear display element and apply default page styles
        display_element.innerHTML = '';

        if (trial.trial_type === 'Loading') {
            var splash_text =
                '<p> LOADING ... PLEASE WAIT </p>'
        } else if (trial.trial_type === 'Next') {
            var splash_text =
                '<p> THE NEXT ROUND WILL BEGIN SHORTLY... GET READY</p>'
        }

        // create page elements
        var intro = createGeneral(
            intro,
            display_element,
            'div',
            'banner',
            'banner',
            splash_text
        );


        if (trial.display_duration !== null) {
            jsPsych.pluginAPI.setTimeout(function () {
                showBlankScreen(250, end_trial());
            }, trial.display_duration);
        }

// timeout: end trial if time limit is set
        if (trial.trial_duration !== null) {
            jsPsych.pluginAPI.setTimeout(function () {
                end_trial();
            }, trial.trial_duration);
        }

        function end_trial() {

            // clear the display
            display_element.innerHTML = '';

            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();

            // move on to the next trial
            jsPsych.finishTrial();
        }
    }
    ;

    return plugin;
})();