jsPsych.plugins['jspsych-dropTrials'] = (function() {

    var plugin = {};

    /*------ Define plugin information ----- */
    plugin.info = {
        name: 'jspsych-dropTrials',
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
        display_element.innerHTML = '';

        const response = {
        }

         //SHOW IMAGE:  generalised function for use and reuse
        function displayCanvas(canvas, duration, callback) {
            const img = display_element.appendChild(document.createElement('img'));
            img.src = imgSrc;
            img.className = 'canvas';
            img.style = display_element;
        setTimeout(callback, duration);
        }

        //STATIONARY

        // display canvas



        function startGame() {
            myGamePiece = new component(30, 30, "red", 80, 75);
            myGameArea.start();
        }
        var gameboardSize: '70vmin',
        var myGameArea = {
            canvas : document.createElement("canvas"),
            start : function() {
                this.canvas.width = 480;
                this.canvas.height = 270;
                this.context = this.canvas.getContext("2d");
                document.body.insertBefore(this.canvas, document.body.childNodes[0]);
                this.interval = setInterval(updateGameArea, 20);
            },
            stop : function() {
                clearInterval(this.interval);
            },
            clear : function() {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        };

        // display background


        // display ruler on x axis

        //display clouds

        //display buttons

        //ANIMATION
        // define box
        function component(width, height, color, x, y, type) {
            this.type = type;
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.speedX = 0;
            this.speedY = 0;
            this.gravity = 0.1;
            this.gravitySpeed = 0;
            this.bounce = 0.6;
            this.update = function () {
                ctx = myGameArea.context;
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
            //drop box
            this.newPos = function () {
                this.gravitySpeed += this.gravity;
                this.x += this.speedX;
                this.y += this.speedY + this.gravitySpeed;
                this.hitBottom();
            }
            //box bounces
            this.hitBottom = function () {
                var rockbottom = myGameArea.canvas.height - this.height;
                if (this.y > rockbottom) {
                    this.y = rockbottom;
                    this.gravitySpeed = -(this.gravitySpeed * this.bounce);
                }
            }
        }
        //box stops


        //RESPONSE
        //wait for button response

        //on response display confidence slider


        function updateGameArea() {
            myGameArea.clear();
            myGamePiece.newPos();
            myGamePiece.update();
        }

        startGame()
        //
        // data saving
        var trial_data = {
            parameter_name: 'parameter value'
        };


    };

    $(document).ready(drawFixation(
        display_element,
        trial.canvasWidth,
        trial.canvasHeight,

    ));
    // end trial
    jsPsych.finishTrial(trial_data);
};


return plugin;
})();
