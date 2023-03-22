

class Horloge {
    today(){
        return new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()
        + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()
    }
}

class Repository {
    sauvegarder(transaction) {
        
    }

    recupererSolde() {

    }
}

module.exports = class Compte {

solde = 0;
messageErreur = '';
historique = [];
transaction = {};

constructor(horloge = new Horloge(), repository = new Repository()){
    this.horloge = horloge.today();
    this.repository = repository;
    this.repository.recupererSolde();
}

consulterSolde () {
    return this.solde;
}

crediter (depot) {
    this.solde += depot;
    this.transaction = {date: this.horloge, montant: depot, balance: this.solde}
    this.historique.push(this.transaction);
    this.repository.sauvegarder(this.transaction);
}

debiter(retrait) {
    if(this.solde < retrait) {
        this.messageErreur = 'Solde insuffisant pour un retrait.'
    } else {
        this.solde -= retrait;
        this.transaction = {date: this.horloge, montant: -retrait, balance: this.solde}
        this.historique.push(this.transaction);
        this.repository.sauvegarder(this.transaction);
    }
}

consulterMessageErreur() {
    return this.messageErreur;
}

consulterHistorique() {
    return this.historique
}

} 