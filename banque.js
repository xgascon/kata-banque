

class Horloge{
    today(){
        return new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()
        + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()
    }
}


class Compte {

solde = 0;
messageErreur = '';
historique = []

constructor(typeHorloge = new Horloge()){
    this.horloge = typeHorloge
}

consulterSolde () {
    return this.solde;
}

crediter (depot) {
    this.solde += depot;
    this.historique.push({date: this.horloge.today(), montant: depot, balance: this.solde})
}

debiter(retrait) {
    if(this.solde < retrait) {
        this.messageErreur = 'Solde insuffisant pour un retrait.'
    } else {
        this.solde -= retrait;
        this.historique.push({date: this.horloge.today(), montant: -retrait, balance: this.solde})
    }
}

consulterMessageErreur() {
    return this.messageErreur;
}

consulterHistorique() {
    return this.historique
}

} 

module.exports = {Horloge, Compte}