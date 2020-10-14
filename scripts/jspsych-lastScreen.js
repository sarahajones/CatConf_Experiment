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
            '<p> ' +
            ' ' +
            ' ' +
            ' ' +
            ' ' +
            ' ' +
            ' ' +
            ' ' +
            ' ' +
            ' ' +
            ' ' +
            '</p> ';
        var header_text =
            '<h2>The study is now over - you may exit the study screen.' +
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