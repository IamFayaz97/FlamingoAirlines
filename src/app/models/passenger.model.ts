export class Passenger{
    public passengerName: string;
    public passengerAddress: string;
    public passportNo: number;
    public passengerdob: string;
    public passengerMeals = [];
    public passengerServices = [];
    public passengerPurchases = [];
    public checkedin: boolean;
    public hasInfant: boolean;
    public seat: string;
    public needWheelChair: boolean;
    constructor( passengerName: string, passportNo: number,
                 passengerdob: string, passengerAddress: string,
                 passengerMeals= [], passengerServices= [], passengerPurchases= [],
                 checkedin: boolean, hasInfant: boolean, seat: string, needWheelChair: boolean ){
        this.passengerName = passengerName;
        this.passportNo = passportNo;
        this.passengerdob = passengerdob;
        this.passengerAddress = passengerAddress;
        this.passengerMeals = passengerMeals;
        this.passengerServices = passengerServices;
        this.passengerPurchases = passengerPurchases;
        this.checkedin = checkedin;
        this.hasInfant = hasInfant;
        this.seat = seat;
        this.needWheelChair = needWheelChair;
    }
}
