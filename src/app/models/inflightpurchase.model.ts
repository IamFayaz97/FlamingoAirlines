export class InflightPurchase{
    constructor(
        public purchaseId: number,
        public purchaseTitle: string,
        public purchaseCost: number,
        public purchaseURL: string,
        public purchaseDesc: string
    ){}
}
