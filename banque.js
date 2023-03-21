module.exports = class Compte {

solde = 0;
messageErreur = '';

consulterSolde () {
    return this.solde;
}

crediter (depot) {
    this.solde += depot;
}

debiter(retrait) {
    if(this.solde < retrait) {
        this.messageErreur = 'Solde insuffisant pour un retrait.'
    } else {
        this.solde -= retrait;
    }
}

consulterMessageErreur() {
    return this.messageErreur;
}
} 