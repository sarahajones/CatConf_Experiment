
jsPsych.plugins["jspsych-PIS"] = (function() {

    var plugin = {};

    plugin.info = {
        name: "jspsych-PIS",
        prettyName: 'Participant Information Sheet',
        parameters: {}
    };

    plugin.trial = function(display_element, trial) {
// clear display element and apply page default styles
        display_element.innerHTML = '';


        /* create an element in the DOM */
        var PIS_text =
            '<p>We would like to invite you to take part in a research project run by the Oxford Attention and Cognitive Control Lab (OxACClab) based at the University of Oxford’s Department of Experimental Psychology. ' +
            'Before you decide whether to take part in our study, it is important that you understand why the research is being done and what it will involve. ' +
            'Please take time to read this information carefully and discuss it with other people if you wish. If there is anything you do not understand, or if you would like more information, please ask us. ' +
            'Thank you for taking the time to read this.</p>'


            + '<br><h4>1. Why is this research being conducted?</h4>'

            + '<p> There are a number of theories about how humans use information from their senses to make decisions, how we detect our mistakes, and how we have confidence in our decisions. ' +
            'This study aims to put these theories to the test by examining peoples’ decisions and confidence. As a result, we hope the study will lead to a better understanding of decision-making and confidence.<\p>'


            + '<br><h4>2. Why have I been invited?</h4>'

            + '<p>You have been invited to take part in this research because you are healthy, have normal or corrected-to-normal vision, are above 18 years of age and are fluent English speaking.</p>'


            + '<br><h4>3. Do I have to take part?</h4>'

            + '<p>No. It is up to you to decide if you want to take part in this study.  We will go through this information sheet and describe the study to answer any questions you may have.  ' +
            'You can ask questions about the research before deciding whether or not to take part. If you agree to take part, we will ask you to complete a consent form.  ' +
            'However, you would still be free to withdraw from the study at any time, without needing to give a reason and without penalty, by advising us of this decision. ' +
            'If you withdraw early we will use the data you have provided up to that point in our research unless you contact us to specify otherwise. ' +
            'It may be impossible to withdraw your data after completing the study because of the anonymization and aggregation of the datasets.</p>'


            + '<br><h4>4. What will happen to me if I take part in the research</h4>'

            + '<p>After reading this information sheet, if you are still happy to take part we will asks you to complete the following.' +
            'If you have been invited to take part in the remote (online) version of our study, you will be asked to give electronic consent for participating in the study.  ' +
            'Then, if you are happy to take part in the research you would be asked to watch images presented on a computer, and to indicate certain responses to these images by pressing buttons. ' +
            'You will also be asked about your level of confidence in your responses to the images. The study would take place over multiple sessions: 5 sessions maximum of about 1 hour each. ' +
            'These sessions will be conducted over different days, with a maximum of one session per day. ' +
            'You would be asked to monitor the screen for periods of approximately 5 minutes at a time, with breaks between these periods. </p>'


            + '<br><h4>5. Are there any risks in taking part in the study?</h4>'

            + '<p>Prolonged focus on the computer screen may cause eye-strain or fatigue, you will have self-timed breaks throughout the study to help prevent this.</p>'


            + '<br><h4>6. Are there any benefits from taking part in the study?</h4>'

            + '<p>No. There will not be any direct or personal benefits to you in this study.  It is hoped that the results from this research will contribute to our understanding of decision-making, error detection and confidence.</p>'


            + '<br><h4>7. Expenses and payments</h4>'

            + '<p>You will be compensated £10.00 per session (approx. 1hour per session) of teh study with a bonus £10.00 for completing all sessions. </p>'


            + '<br><h4>8. What happens to the data I provide?</h4>'

            + '<p>The information you provide during the study is the <b>research data</b>. Any research data from which you can be identified such as your name, age, handedness and gender is known as <b>personal data</b>. </p>'
            + '<p><b>Personal data </b> including your age, gender and handedness will be stored as part of your research data and will not be linked directly to your name. ' +
            'It will be transferred from the testing computer to an encrypted hard-drive before final transfer to the researcher’s university owned computer. ' +
            'All extra copies of this data will be deleted. ' +
            'Once on the university-owned computer the data will be analysed and upon completion of the research project will be archived in an anonymised format on an open science repository – The Open Science Framework (OSF) in line with best research practices.  ' +
            'Therefore, we would like your permission to use anonymised data in future studies, and to share data with other researchers (e.g. in online databases).  ' +
            'All personal information that could identify you will be removed or changed before information is shared with other researchers or results are made public.</p>'
            + '<p><b>The anonymised dataset will be shared publicly on the internet on the Open Science Framework, in order to support open and transparent science.</b>' +
            'Hence, it will be publicly accessible and may be reused by researchers both inside and outside the European Union. Files on the university computer will be destroyed upon completion of upload to OSF. </p>'
            + '<p><b> Other research data:</b> Any required contact information will  be stored in a password-protected file on the researcher’s university computer and the file deleted once the results of the research have been communicated.' +
            'The researcher and supervisors will have access to the research data. Responsible members of the University of Oxford may be given access to data for monitoring and/or audit of the research. </p>'

            + '<br><h4>9. What will happen to the results of the research? Will the research be published?</h4>'

            + '<p>We aim to publish the results of the study in an open access scientific journal. We would really like to share the findings with you. ' +
            '<b>If you are interested in hearing the results and in following the progress of the research, please mention this at the end of the experiment so that we can take note of your email address.</b> </p>'
            + '<p>The University of Oxford is committed to the dissemination of its research for the benefit of society and the economy and, in support of this commitment, has established an online archive of research materials. ' +
            'This archive includes digital copies of student theses successfully submitted as part of a University of Oxford postgraduate degree programme.  ' +
            'Holding the archive online gives easy access for researchers to the full text of freely available theses, thereby increasing the likely impact and use of that research.</p>'
            + '<p>The research will be written up as a student’s doctoral thesis. On successful submission of the thesis, it will be deposited both in print and online in the University archives to facilitate its use in future research. ' +
            'If so, the thesis will be openly accessible.</p>'

            + '<br><h4>10. Who is funding the research?</h4>'

            + '<p>This research is funded by a Medical Research Council Doctoral Training Program (MRC DTP): Research Training Support Grant (RTSG).</p>'

            + '<br><h4>11. Who has reviewed this study?</h4>'

            + '<p>This research has been reviewed by and received ethics clearance through the University of Oxford Central Research Ethics Committee (approval code: ' + CUREC_ID + ').</p>'

            + '<br><h4>12. Who do I contact if I have a concern about the study or I wish to complain?</h4>'

            + '<p>If you have a concern about any aspect of this study, please contact Sarah Ashcroft-Jones (<a>sarah.ashcroft-jones@psy.ox.ac.uk</a>, 01865 271302) or her supervisor Nick Yeung (<a>nicholas.yeung@psy.ox.ac.uk</a>, 01865 271389), ' +
            'and we will do our best to answer your query.  We will acknowledge your concern within 10 working days and give you an indication of how it will be dealt with.  ' +
            'If you remain unhappy or wish to make a formal complaint, please contact the Chair of the Research Ethics Committee at the University of Oxford who will seek to resolve the matter as soon as possible: </p>'
            + '<p><i>Chair<br>Medical Sciences Inter-Divisional Research Ethics Committee<br>Research Services, University of Oxford<br>Wellington Square, Oxford OX1 2JD, United Kingdom<br>Email: <a>ethics@medsci.ox.ac.uk</a></i></p>'

            + '<br><h4>13. Data Protection</h4>'

            + '<p>The University of Oxford is the data controller with respect to your personal data, and as such will determine how your personal data is used in the study.\n' +
            'The University will process your personal data for the purpose of the research outlined above.  Research is a task that is performed in the public interest.\n' +
            'Further information about your rights with respect to your personal data is available from <a>http://www.admin.ox.ac.uk/councilsec/compliance/gdpr/individualrights/</a>.\n</p>'

            + '<br><h4>14. Further Information and Contact Details</h4>' +
            '<p>If you would like to discuss the research with someone beforehand (or if you have questions afterwards), please contact the lead investigator by email at <a>sarah.ashcroft-jones@psy.ox.ac.uk</a>.</p>';


// create page elements
        var intro = createGeneral(
            intro,
            display_element,
            'div',
            'titlepage document-intro',
            'PIS-intro',
            '<h1>Please read and acknowledge the following information about our research ethics before proceeding to the experiment.</h1>'
        );


        var ethicsForm = createGeneral(
            ethicsForm,
            display_element,
            'div',
            'document-in-document',
            'PIS-form',
            ''
        );
        var instructHeader = createGeneral(
            instructHeader,
            ethicsForm,
            'div',
            'document-header',
            'PIS-header',
            ''
        );

        var logo = createGeneral(
            logo,
            instructHeader,
            'div',
            'header-logo',
            'Oxford-logo',
            ''
        );
        var labInfo = createGeneral(
            labInfo,
            instructHeader,
            'div',
            'header-info',
            'header-lab-info',
            '<h2>DEPARTMENT OF EXPERIMENTAL PSYCHOLOGY</h2>'
            + '<h4>New Radcliffe House, Radcliffe Observatory Quarter, Oxford OX2 6GG</h4>'
            + '<b>Professor Nicholas Yeung</b>'
            + '<br>'
            + 'Principal Investigator, Attention & Cognitive Control Lab'
            + '<br>'
            + '<i>Email: nicholas.yeung@psy.ox.ac.uk | Tel: +44 (0)1865 271389</i>'
        );

        var title = createGeneral(
            title,
            ethicsForm,
            'div',
            'document-title',
            'PIS-title',
            '<h1 #PISH1 >PARTICIPANT INFORMATION SHEET</h1>'
            +
            '<h3>V' + PIS_version + ' (revised: ' + PIS_date + ')</h3>' + '<br>' +
            '<h2>"' + CUREC_studyName + '"</h2>'
        );

        var instructText = createGeneral(
            instructText,
            ethicsForm,
            'div',
            'document-text',
            'PIS-text',
            PIS_text
        );
        var footer = createGeneral(
            footer,
            ethicsForm,
            'div',
            'document-footer',
            'PIS-footer',
            ''
        );
        var instructAcknowledge = createGeneral(
            instructAcknowledge,
            display_element,
            'button',
            'large-button',
            'PIS-submit',
            '<div>I acknowledge that I have read and understood this Participant Information Sheet</div>'
        );


        // define what happens when people click on the final submit button
        $('#PIS-submit').on('click', function () {
            // save the data to data object
            dataObject['PIS_acknowledged'] = true;
            jsPsych.finishTrial();
            return;
        });
    }

    return plugin;
})();


