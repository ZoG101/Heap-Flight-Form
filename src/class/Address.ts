class Address {
    private cep:string;
    private street:string;
    private neighbor:string;
    private number:string;
    private complement:string;
    private state:string;
    private city:string;

    constructor(cep:string, street:string, neighbor:string, number:string, complement:string, state:string, city:string) {
        this.cep = cep;
        this.street = street;
        this.neighbor = neighbor;
        this.number = number;
        this.complement = complement;
        this.state = state;
        this.city = city;
    }

    public getCep() : string {
        return this.cep;
    }

    public getStreet() : string {
        return this.street;
    }

    public getNeighbor() : string {
        return this.neighbor;
    }

    public getNumber() : string {
        return this.number;
    }

    public getComplement() : string {
        return this.complement;
    }

    public getState() : string {
        return this.state;
    }

    public getCity() : string {
        return this.city;
    }
}

export default Address;