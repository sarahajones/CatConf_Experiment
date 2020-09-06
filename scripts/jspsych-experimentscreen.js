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
            confidence_response_time: null,
            end_time: null,
            delta_response_time: null,
            delta_confidence_response_time: null,
            delta_feedback_time: null,
            button: null,
            button_label: trial.choices,
            confidence: null,
            correct: null,
            incorrect: null,
        };


        //draw "canvas" to screen
        var canvasDiv = document.createElement("div");
        canvasDiv.id = "jspsych-experimentscreen";
        canvasDiv.classList.add('gameboard');
        display_element.appendChild(canvasDiv);

        var grassbank = document.createElement("div");
        grassbank.id = "grassbank";
        grassbank.classList.add('grassbank');
        canvasDiv.appendChild(grassbank)

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
        //overlay with image of spaceship

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

            //figure out scoring
            if (trial.spaceship_class === 'blue'){
                if (response.button_label === 'Zap'){
                    response.correct = 1;
                    response.incorrect = 0;
                } else {
                    response.correct = 0;
                    response.incorrect = 1;
                }
            } else if(trial.spaceship_class === 'orange'){
                if (response.button_label === 'Zap'){
                    response.correct = 0;
                    response.incorrect = 1;
                } else {
                    response.correct = 1;
                    response.incorrect = 0;
                }
            }
            console.log(response.correct);
            console.log(response.incorrect);

            Block_score_correct.push(response.correct);
            Block_score_incorrect.push(response.incorrect);

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

            //clear buttons and realign button group to fit confidence question
            buttons.innerHTML = `
<div id = 'confidence'>
<p class='confidenceQuestion' id="confidenceQuestion" fontsize="xx-large">
<strong>How confident are you of your choice?</strong>
</p>

<div class="slider_area">
    <div class="label"> Sure<br>INCORRECT </div>
    <input type="range" class="slider" id="slider" min=0 max=100 step="1" value="50"/>
    <div class="label"> Sure<br>CORRECT </div>
</div>
<div id="experiment-btn" class="experiment-btn" data-disabled="1">Confirm</div>
</div>
            `;

            //insert a slider for the confidence report
            var confidenceSlider = document.getElementById('slider');
            confidenceSlider.requireInteraction = true;
            confidenceSlider.addEventListener("change", ()=>document.getElementById('experiment-btn').dataset.disabled='0')

            var confirm = document.getElementById('experiment-btn');
            confirm.style.backgroundColor= 'rgba(155, 242, 236, .7)'
            confidenceSlider.addEventListener('change',()=>document.getElementById('experiment-btn').style.backgroundColor = 'rgba(155, 242, 236, 1)')
            confirm.addEventListener('click',(e)=> {
                if(e.currentTarget.dataset.disabled === '0')
                    end_trial()
            });

            response.confidence_response_time = performance.now();
            response.delta_confidence_response_time = response.confidence_response_time - response.response_time;
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

            //save data
            dataObject.testtrial_stimulus.push(response.stimulus);
            dataObject.testtrial_trial_type.push(response.trial_type);
            dataObject.testtrial_distribution_name.push(response.distribution_name);
            dataObject.testtrial_spaceship_class.push(response.stimulus);
            dataObject.testtrial_stimulus.push(response.stimulus);
            dataObject.testtrial_stimulus_location.push(response.location);
            dataObject.testtrial_response_time.push(response.response_time);
            dataObject.testtrial_confidence_response_time.push(response.confidence_response_time);
            dataObject.testtrial_delta_response_time.push(response.delta_response_time);
            dataObject.testtrial_delta_confidence_response_time.push(response.delta_confidence_response_time);
            dataObject.testtrial_response.push(response.button);
            dataObject.testtrial_response_button_label.push(response.button_label);
            dataObject.testtrial_confidence.push(response.confidence);
            dataObject.testtrial_correct.push(response.correct);
            dataObject.testtrial_incorrect.push(response.incorrect);
        }
    }
    ;

    return plugin;

}
();