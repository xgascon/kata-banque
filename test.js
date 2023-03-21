const Compte = require('./banque.js')

const chai = require('chai');

const expect = chai.expect;

describe('consulterSolde',  () => {
    it('compte en banque donne le solde de notre argent', () => {
        const compteBancaire = new Compte()

        const solde = compteBancaire.consulterSolde()

        expect(solde).to.equal(0);
    });
    it('consulter solde une fois 10 € déposé dedans', () => {
        const compteBancaire = new Compte()

        const depot = 10
        compteBancaire.crediter(depot)

        expect(compteBancaire.consulterSolde()).to.equal(10);
    });
    it('consulter solde une fois 10 € ajoutés puis 5 € débités dedans', () => {
        const compteBancaire = new Compte()
        const depotAvantRetrait = 10;
        const retrait = 5;
        compteBancaire.crediter(depotAvantRetrait);
        compteBancaire.debiter(retrait);

        expect(compteBancaire.consulterSolde()).to.equal(5);
    });
       it('Message d\'erreur si solde inférieur au retrait demandé.', () => {
        const compteBancaire = new Compte()
        const depotAvantRetrait = 5;
        const retrait = 10;
        compteBancaire.crediter(depotAvantRetrait);
        compteBancaire.debiter(retrait);

        expect(compteBancaire.consulterSolde()).to.equal(5);
        expect(compteBancaire.consulterMessageErreur()).to.equal('Solde insuffisant pour un retrait.');
    });
});