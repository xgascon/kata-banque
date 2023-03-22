module.exports = class Compte {

solde = 0;
messageErreur = '';
historique = []
today = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()
+ ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

consulterSolde () {
    return this.solde;
}

crediter (depot) {
    this.solde += depot;
    this.historique.push({date: this.today, montant: depot, balance: this.solde})
}

debiter(retrait) {
    if(this.solde < retrait) {
        this.messageErreur = 'Solde insuffisant pour un retrait.'
    } else {
        this.solde -= retrait;
        this.historique.push({date: this.today, montant: -retrait, balance: this.solde})
    }
}

consulterMessageErreur() {
    return this.messageErreur;
}

consulterHistorique() {
    return this.historique
}

} 