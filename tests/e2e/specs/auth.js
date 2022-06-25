describe('auth page test', () => {
    it('switch to sign up', () => {
        cy.visit('/#/auth');
        cy.get('.overlay-right > .ghost').click();
    });
    it('switch to sign in', () => {
        cy.get('.overlay-left > .ghost').click();
    });
    it('login', () => {
        // cy.get('')
    });
});