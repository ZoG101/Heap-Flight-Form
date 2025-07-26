import Address from './Address';
import Priority from './Priority';

class person {
    private name:string;
    private CPF:string;
    private birthDate:string;
    private phoneNumber:string;
    private email:string;
    private address:Address;
    private priority:Priority;

    constructor(name:string, CPF:string, birthDate:string, phoneNumber:string, email:string, address:Address, priority:Priority) {
        this.name = name;
        this.CPF = CPF;
        this.birthDate = birthDate;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.priority = priority;
    }

    public getName() : string {
        return this.name;
    }
    
    public getCPF() : string {
        return this.CPF;
    }

    public getBirthDate() : string {
        return this.birthDate;
    }

    public getPhoneNumber() : string {
        return this.phoneNumber;
    }

    public getEmail() : string {
        return this.email;
    }

    public getAddress() : Address {
        return this.address;
    }

    public getPriority() : Priority {
        return this.priority;
    }
}

export default person;