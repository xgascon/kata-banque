const Compte = require('./banque.js')

const chai = require('chai');

const expect = chai.expect;

describe('consulterSolde',  () => {
    it('compte en banque donne le solde de notre argent', () => {
        const compteBancaire = new Compte()

        const solde = compteBancaire.consulterSolde(0)

        expect(solde).to.equal(0);
    });
    it('consulter solde une fois 10 € déposé dedans', () => {
        const compteBancaire = new Compte()

        const depot = 10
        const solde = compteBancaire.consulterSolde(depot)

        expect(solde).to.equal(10);
    });
});