module.exports = class Compte {

solde = 0;

consulterSolde (depot) {
    this.solde += depot;
    return this.solde
}

// crediter (depot) {
//     this.solde += depot;
//     return this.solde
// }
} 