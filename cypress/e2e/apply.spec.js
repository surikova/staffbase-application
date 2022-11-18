/// <reference types="cypress" />

describe('Application for Quality Assurance Engineer', () => {

    before(() => {

        cy.visit('/')
        cy.get('#onetrust-accept-btn-handler').click()
        cy.frameLoaded('#grnhse_iframe')

      })

    it('fills in the application fields', () => {

        cy.contains('.bg-beige-staffbase', 'Quality Assurance Engineer')

        cy.enter('#grnhse_iframe').then(getBody => {
            getBody().find('[for="first_name"]').should('contain', 'First Name')
            getBody().find('#first_name').type('Kateryna')

            getBody().find('[for="last_name"]').should('contain', 'Last Name')
            getBody().find('#last_name').type('Surikova')

            getBody().find('[for="email"]').should('contain', 'Email')
            getBody().find('#email').type('surikova.cat@gmail.com')

            getBody().find('[for="phone"]').should('contain', 'Phone')
            getBody().find('#phone').type('+491625233389')

        })
    })

    it('attaches file with the CV', () => {

        cy.enter('#grnhse_iframe').then(getBody => {
            getBody().find('#resume').should('contain', 'Resume/CV')
            getBody().find('#s3_upload_for_resume').then(fileUpload => {
                cy.wrap(fileUpload).find('input[type=file]')
                    .selectFile('cypress/fixtures/KaterynaSurikova_QAEngineer.pdf', { force: true })
            })
        })
    })

    it('confirms legal work authorization status', () => {

        cy.enter('#grnhse_iframe').then(getBody => {
            getBody().find('[name="job_application[answers_attributes][0][text_value]"]')
                .type('I have unlimited residence and work permit in Germany. I do not require any kind of sponsorship now or in the future.')
        })


    })

    it('accepts privacy policy', () => {

        cy.enter('#grnhse_iframe').then(getBody => {
            getBody().find('select[name="job_application[answers_attributes][1][answer_selected_options_attributes][1][question_option_id]"]')
                .select('Yes', {force: true}).should('have.value', '95567109002')
        })


    })

    it('adds the link to the repository with the solution', () => {

        cy.enter('#grnhse_iframe').then(getBody => {
            getBody().find('textarea[name="job_application[answers_attributes][2][text_value]"]')
                .type('https://github.com/surikova/staffbase-application')
        })


    })

    it('submits the application', () => {

        cy.enter('#grnhse_iframe').then(getBody => {
            getBody().find('#submit_app')
                .click()
        })


    })
})