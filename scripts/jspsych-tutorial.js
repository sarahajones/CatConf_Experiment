jsPsych.plugins['jspsych-tutorial'] = (function () {

    var plugin = {};

    plugin.info = {
        name: 'jspsych-tutorial',
        prettyName: 'Study Tutorial',
        parameters: {}
    };

    plugin.trial = function (display_element, trial) {
        // clear display element and apply default page styles
        display_element.innerHTML = '';

        if (trial.isFirstTime) {
            var tutorial_text =
                '<p> During this study, you will play a game where different spaceships drop packages down to the earth. You can decide whether or not to retrieve a package when it lands safely. ' +
                'The packages will contain either coins or a bomb. Collected coins will accumulate in your reward jar, whereas retrieving bombs will lose you coins from your jar. </p> ' +
                '<p>Your goal is to collect as many coins as possible by the end of the game. </p>';
            var header_text =
                '<h1>The following pages will help guide you through the upcoming study, please read them carefully. </h1>'
            var imageID = 'demo_instruction';
        } else if(trial.isSecondTime)
        {var tutorial_text =
                '<p> Let\'s start with some "quick-fire" rounds to get things moving. ' +
                'You will see an image of a spaceship flash on screen followed by a package which it has "dropped" to earth. ' +
                'Press "retrieve" to collect the contents -  "zap" the package to destroy the contents. </p>' +
                '</p>Remember, packages could contain coins or may hold bombs that will lose you coins from your jar. ' +
                'You must decide whether or not to retrieve the package that has been dropped. This game round will help teach you about the different spaceships and their packages. </p>';
            var header_text =
                '<h1>Let\'s get started!</h1>'
            var imageID = 'demo_instruction2';
        } else if(trial.isThirdTime)
        { var tutorial_text =
            '<p> Press the continue button to start the round. ' +
            'Remember, you will see an image of a spaceship flash on screen followed by a package which it has "dropped" to earth. ' +
            'Press "retrieve" to collect the contents -  "zap" the package to destroy the contents. </p>' +
            '<p>You are trying to collect coins and avoid bombs - good luck!</p>';
            var header_text =
                '<h1>Ready to begin? </h1>'
            var imageID = 'demo_instruction3';
        } else if(trial.isFourthTime)
        { var tutorial_text =
            '<p> Well done so far - now it is time to see the spaceships in action. ' +
            'Please watch the next screen closely to see where each spaceship is dropping their packages to earth. ' +
            'You will not have to press any buttons, or respond in any way. </p>' +
            '<p>This information will help you in the upcoming rounds!</p>';
            var header_text =
                '<h1>Time to level up... </h1>'
            var imageID = 'demo_instruction4';
        }
        else if(trial.isFifthTime)
        { var tutorial_text =
            '<p> Now that you\'ve seen the spaceships dropping their packages to earth - it is time to level up again. ' +
            'In the next rounds you will see the packages dropping from a cloudy sky, the spaceships themselves will be hidden from view. ' +
            'You will have to decide whether to retrieve the packages or not based on their drop location alone. </p>' +
            '<p>Remember - you are trying to retrieve coins and zap the bombs!</p>';
            var header_text =
                '<h1>Read the following instructions to learn more about the next stage of the game.</h1>'
            var imageID = 'demo_instruction5';
        }

        else if(trial.isSixthTime)
        { var tutorial_text =
            '<p> After each choice you make, you will be asked to rate your confidence on a sliding scale. ' +
            'When making this rating, think about how sure you are that you made the right decision on that choice. ' +
            'Submit your confidence rating by pressing the confirm button on screen to move onto the next trial. </p>' +
            '<p>Good luck!</p>'
            var header_text =
                '<h1>Read the following instructions to learn more about the next stage of the game.</h1>'
        }

        else if(trial.isSeventhTime)
        { var tutorial_text =
            '<p> Let\'s see if you can improve your score this time around! ' +
            'Watch the screen carefully again and then try to beat your last score! ' +
            'Keep an eye on where the spaceships are dropping their parcels!</p>' +
            '<p>Good luck!</p>'
            var header_text =
                '<h1>Ready for the next round?</h1>'
        }


        else if(trial.isEighthTime)
        { var tutorial_text =
            '<p> After each choice you make, you will be asked to rate your confidence on a sliding scale. ' +
            'When making this rating, think about how sure you are that you made the right decision on that choice. ' +
            'Submit your confidence rating by pressing the confirm button on screen to move onto the next trial. </p>' +
            '<p>Good luck!</p>'
            var header_text =
                '<h1>Read the following instructions to learn more about the next stage of the game.</h1>'
        }



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

        var logo = createGeneral(
            logo,
            instructHeader,
            'div',
            'header-logo',
            imageID,
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
            '<div>Press to continue</div>'
        );


        // define what happens when people click on the final submit button
        $('#tutorial-submit').on('click', function() {
            // save the data to data object
            jsPsych.finishTrial();
            return;

        });


    };

    return plugin;
})();