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

    it('Vérifier absence transaction', () => {
        const compteBancaire = new Compte()

        expect(compteBancaire.consulterHistorique()).to.eql([])
    });

    it('Vérifier date jusqu\'à la seconde, montant et balance de la transaction dans histo après crédit et débit', () => {
        const compteBancaire = new Compte()
        compteBancaire.crediter(10)
        compteBancaire.debiter(5)

        expect(compteBancaire.consulterHistorique()[0].date).to.eql(new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear() + ' ' + new Date().getHours()
        + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds())
        expect(compteBancaire.consulterHistorique()[0].montant).to.equal(10)
        expect(compteBancaire.consulterHistorique()[0].balance).to.equal(10)

        expect(compteBancaire.consulterHistorique()[1].date).to.eql(new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear() + ' ' + new Date().getHours()
        + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds())
        expect(compteBancaire.consulterHistorique()[1].montant).to.equal(-5)
        expect(compteBancaire.consulterHistorique()[1].balance).to.equal(5)
    });

});