import person from "./Person";
import Priority from "./Priority";

class Flight {
    private flightNumber:string;
    private departure:string;
    private returnDate?:string;
    private arrival:string;
    private duration:number;
    private passengers:Array<person>;
    private priority:Priority;

    constructor(flightNumber:string, departure:string, arrival:string, duration:number, _return?:string) {
        this.flightNumber = flightNumber;
        this.departure = departure;
        this.arrival = arrival;
        this.duration = duration;
        this.priority = Priority.DEFAULT;
        this.passengers = [];
        this.returnDate = _return;
    }

    public getFlightNumber() : string {
        return this.flightNumber;
    }

    public getDeparture() : string {
        return this.departure;
    }

    public getReturn() : string {
        if (this.returnDate != undefined) return this.returnDate;
        else return 'UNDEFINED';
    }

    public getArrival() : string {
        return this.arrival;
    }

    public getDuration() : number {
        return this.duration;
    }

    public addPassengers(passenger:person) : void {
        this.passengers.push(passenger);
        this.definePriority();
    }

    public getPriority() : Priority {
        return this.priority;
    }

    private definePriority() : void {
        this.passengers.forEach((e) => {
            if (e.getPriority() > this.priority) this.priority = e.getPriority();
        });
    }
}

export default Flight;
