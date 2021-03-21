/// <reference types="cypress" />

describe('social media example page', () => {

    beforeEach(() => {
        cy.visit('https://template3.booost.bg/newsfeed');
    })

    it('should have the "newsfeed" section selected in the sidebar', () => {
        cy.get('[data-title="Newsfeed"]').parent().should('have.class', 'active')
    });

    it('should have a banner with bolded font', () => {
        cy.get('.section-banner > .section-banner-title').should('have.css', 'font-weight');
        cy.get('.section-banner > .section-banner-text').should('have.css', 'font-weight');
    });

    it('should have a banner with title that has bigger size than text', () => {
        cy.get('.section-banner > .section-banner-title')
            .invoke('css', 'font-size')
            .then((fontTitleSize) => {
                cy.get('.section-banner > .section-banner-text').invoke('css', 'font-size').should((fontTextSize) => {
                    expect(parseInt(fontTextSize.substr(0, 2))).to.be.lessThan(parseInt(fontTitleSize.substr(0, 2)))
                })
            })
    });

    it('should allow users to enter text in the "post text" field', () => {
        cy.get('textarea[name="quick-post-text"]').type('This is random input');
        cy.get('textarea[name="quick-post-text"]').should('have.value', 'This is random input');
    });

    it.only('should be scrollable', () => {
        cy.get('.widget-box.no-padding').eq(4).scrollIntoView();

        cy.get('textarea[name="quick-post-text"]').should(($el) => {
            const bottom = Cypress.$(cy.state('window')).height();
            const right = Cypress.$(cy.state('window')).width();
            const rect = $el[0].getBoundingClientRect();

            expect(rect).to.satisfy((rect) => rect.top < 0 || rect.top > bottom || rect.left < 0 || rect.left > right);
        })
    })
})