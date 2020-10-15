jsPsych.plugins['jspsych-lastScreen'] = (function () {

    var plugin = {};

    plugin.info = {
        name: 'jspsych-lastScreen',
        prettyName: 'Last Screen of study',
        parameters: {}
    };

    plugin.trial = function (display_element) {
        // clear display element and apply default page styles
        display_element.innerHTML = '';
        var tutorial_text =
            '<p> Thank you for taking the time to complete this study in full. ' +
            'If you are prolific user please press the button below to submit your completion code via redirection. ' +
            'If you have any concerns or issues regarding this study please do not hesitate to get in touch with the researchers either via the prolific platform or using the emails from the information sheet at teh start of this study. ' +
            '</p> ';
        var header_text =
            '<h2>The study is now over - thank you for you time.  ' +
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
            '</h2>';
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
            '<div>Press to escape full screen mode</div>'
        );


        // define what happens when people click on the final submit button
        $('#tutorial-submit').on('click', function() {
            //location.href = "https://app.prolific.co/submissions/complete?cc=55E8C45F";
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            // save the data to data object
            jsPsych.finishTrial();
            return;

        });


    };

    return plugin;
})();