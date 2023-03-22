const Compte = require('./banque.js')

const chai = require('chai');

const expect = chai.expect;

class HorlogeTest {
    today(){
        return '22/03/2023 12:05:098'
    }
}

class RepositoryTest {
    compteurAppels = 0;
    compteurRetour = 0;
    sauvegarder() {
        this.compteurAppels ++;
    }

    recupererSolde() {
        this.compteurRetour ++;
    }
}

describe('consulterSolde',  () => {
    let compteBancaire;
    let horlogeTest;
    let repositoryTest;
    beforeEach(function () {
        horlogeTest = new HorlogeTest()
        repositoryTest = new RepositoryTest();
        compteBancaire = new Compte(horlogeTest, repositoryTest);
    });
    it('compte en banque donne le solde de notre argent', () => {
        const solde = compteBancaire.consulterSolde()

        expect(solde).to.equal(0);
    });


    it('consulter solde une fois 10 € déposé dedans', () => {
        const depot = 10
        compteBancaire.crediter(depot)

        expect(compteBancaire.consulterSolde()).to.equal(10);
    });


    it('consulter solde une fois 10 € ajoutés puis 5 € débités dedans', () => {
        const depotAvantRetrait = 10;
        const retrait = 5;
        compteBancaire.crediter(depotAvantRetrait);
        compteBancaire.debiter(retrait);

        expect(compteBancaire.consulterSolde()).to.equal(5);
    });


       it('Message d\'erreur si solde inférieur au retrait demandé.', () => {
        const depotAvantRetrait = 5;
        const retrait = 10;
        compteBancaire.crediter(depotAvantRetrait);
        compteBancaire.debiter(retrait);

        expect(compteBancaire.consulterSolde()).to.equal(5);
        expect(compteBancaire.consulterMessageErreur()).to.equal('Solde insuffisant pour un retrait.');
    });

    it('Vérifier absence transaction', () => {

        expect(compteBancaire.consulterHistorique()).to.eql([])
    });

    it('Vérifier date jusqu\'à la milliseconde, montant et balance de la transaction dans histo après crédit et débit', () => {
        compteBancaire.crediter(10)
        compteBancaire.debiter(5)

        expect(compteBancaire.consulterHistorique()[0].date).to.eql(horlogeTest.today())
        expect(compteBancaire.consulterHistorique()[0].montant).to.equal(10)
        expect(compteBancaire.consulterHistorique()[0].balance).to.equal(10)

        expect(compteBancaire.consulterHistorique()[1].date).to.eql(horlogeTest.today())
        expect(compteBancaire.consulterHistorique()[1].montant).to.equal(-5)
        expect(compteBancaire.consulterHistorique()[1].balance).to.equal(5)
    });

     it('Après un débit et un crédit sur le compte, je dois avoir mes 2 transactions sauvegardées.', () => {

        compteBancaire.crediter(2)
        compteBancaire.debiter(1)
        expect(compteBancaire.repository.compteurAppels).to.equal(2)
    });

     it('Après un débit et un crédit sur le compte, je dois avoir mes 2 transactions sauvegardées quand le solde est insuffisant pour le second débit.', () => {
        compteBancaire.crediter(2)
        compteBancaire.debiter(2)
        compteBancaire.debiter(5)
        expect(compteBancaire.repository.compteurAppels).to.equal(2)
    });

     it('Vérifier que l\'on passe par la fonction de récupération.', () => {
        compteBancaire.crediter(2)
        compteBancaire.debiter(2)
        compteBancaire.debiter(5)
        expect(compteBancaire.repository.compteurRetour).to.equal(1)
    });

});