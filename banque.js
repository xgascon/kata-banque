module.exports = class Compte {

solde = 0;
messageErreur = '';
historique = []
today = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()

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
        this.historique.push({date: this.today})
    }
}

consulterMessageErreur() {
    return this.messageErreur;
}

consulterHistorique() {
    return this.historique
}

} 