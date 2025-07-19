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

    getCep() : string {
        return this.cep;
    }

    getStreet() : string {
        return this.street;
    }

    getNeighbor() : string {
        return this.neighbor;
    }

    getNumber() : string {
        return this.number;
    }

    getComplement() : string {
        return this.complement;
    }

    getState() : string {
        return this.state;
    }

    getCity() : string {
        return this.city;
    }
}

export default Address;