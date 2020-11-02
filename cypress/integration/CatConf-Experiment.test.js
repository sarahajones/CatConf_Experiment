const curecVersion = 'V1.0';
const trialNum = {
    quickfire: 20,
    fastdrop: 50,
    confTrials: 45,
};
function respond(hasConf = false) {
    const r = Math.random() < .5;
    if (r === true){
        cy.get('#jspsych-quickfire-button-0, #experiment-btn-0' )
            .click();
    } else {
        cy.get('#jspsych-quickfire-button-1, #experiment-btn-1')
            .click();
    }

    if(hasConf === true){
        cy.get('#confidence')
            .should('be.visible');
        cy.get('#slider')
            .click();
        cy.get('#experiment-btn')
            .should('be.visible')
            .click();
    }
}

describe('CatConf-Experiment full run', function () {

    it('Shows a splash screen', function () {
        cy.visit('http://localhost/CatConf_Experiment/');

        cy.get('#splashbanner')
            .should('be.visible')
            .contains('LOADING');
    });

    it('Shows PIS', function (){
        cy.get('h3')
            .should('be.visible')
            .contains(curecVersion);

        cy.get('#PIS-submit')
            .should('be.visible')
            .click();
    });

    it('Shows consent form', function (){
        cy.get('#consent-title > h3:nth-child(2)')
            .should('be.visible')
            .contains(curecVersion);

        cy.get('#consent-question0')
            .contains(curecVersion);

        cy.get('.document-form-question')
            .should('be.visible');

        cy.get('#consent-submit')
            .should('be.hidden');

        cy.get('.document-form-answer')
            .should('be.visible')
            .click({multiple: true});

        cy.get('#consent-submit')
            .should('be.visible')
            .click();

    });

    it('Shows demographic screen', function(){
        cy.wait(4000);

        cy.get('#demographics-section1')
            .should('be.visible')
            .get('.slider')
            .invoke('attr', 'value', '37')
            .trigger('change');

        cy.get('#demographics-proceed1')
            .should('be.visible')
            .click();

        cy.get('#demographics-section2')
            .should('be.visible')
            .get('#gender')
            .select('Other');

        cy.get('#demographics-proceed2')
            .should('be.visible')
            .click();

        cy.get('#demographics-section3')
            .should('be.visible')
            .get('#handedness')
            .select('Left');

        cy.get('#demographics-proceed3')
            .should('be.visible')
            .click();
    });

    const tutNum = 3;
    for(let t = 1; t <= tutNum; t++) {
        it(`Shows instruction screen ${t}`, function () {
            cy.get('#tutorial-submit')
                .should('be.visible')
                .click();
        });
    }


    it('Shows quickfire rounds', function(){
        cy.wait(4000)
    for(let t = 1; t <= trialNum.quickfire; t++) {
        respond();
    }});

    it(`Shows instruction screen ${tutNum + 1}`, function(){
        cy.get('#tutorial-submit')
            .should('be.visible')
            .click();
    });

    it('Shows a splash screen', function () {

        cy.get('#splashbanner')
            .should('be.visible')
            .contains('LOADING');
    });

    it ('Shows droptrials', function(){
        cy.wait(2000*trialNum.fastdrop);
        cy.wait(5000);
    });

    const tutNum2 = 6;
    for(let t = 5; t <= tutNum2; t++) {
        it(`Shows instruction screen ${t}`, function () {
            cy.get('#tutorial-submit')
                .should('be.visible')
                .click();
        });
    }

    it('Shows a splash screen', function () {

        cy.get('#splashbanner')
            .should('be.visible')
            .contains('LOADING');
    });


    it('Shows confidence trials', function () {
        for(let t = 1; t <= trialNum.confTrials; t++) {
        cy.wait(4000)
        respond(true)
    }});


    // it('does something', function() {
    //    // by doing this
    // });
});