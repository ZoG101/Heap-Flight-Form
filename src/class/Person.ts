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

    getName() : string {
        return this.name;
    }
    
    getCPF() : string {
        return this.CPF;
    }

    getBirthDate() : string {
        return this.birthDate;
    }

    getPhoneNumber() : string {
        return this.phoneNumber;
    }

    getEmail() : string {
        return this.email;
    }

    getAddress() : Address {
        return this.address;
    }

    getPriority() : Priority {
        return this.priority;
    }
}

export default person;