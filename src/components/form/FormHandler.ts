class FormHandler {
    /**
     * @param content Is the content
     * @return `true` if everything is not blank
     * @return `false` if there is something blank
    */
    static verifyBlankContent(content:string) : boolean {
        if (content.length == 0) return false;
        return true;
    };

    /**
     * @param content Is the array of content
     * @return `true` if everything is not blank
     * @return `false` if there is something blank
    */
    static verify(...content:Array<string>) : boolean {
        let ret = true;
        content.forEach((e) => {
            if (!FormHandler.verifyBlankContent(e)) ret = false;
        });
        return ret
    }

    /**
    *   Verify if the birth date is valid and if the person is under-age
    *   @param birthDate Is the user's birth date
    *   @throws An `error` if the age is invalid, it's going to return
    *   @return If the person is under-age, it's going to return `false`
    *   @return If the person is 18+, it's going to return `true`
    */ 
    static verifyAge(birthDate:string) : boolean {
        const pAge:Date = new Date(birthDate);
        const now:Date = new Date();

        if (pAge.getTime() > now.getTime()) throw Error("Idade inválida");
        
        const pAdultAge:Date = new Date(birthDate);
        pAdultAge.setFullYear(pAge.getFullYear() + 18);

        if ((pAdultAge.getFullYear() - now.getFullYear()) <= 0) {
            if ((pAdultAge.getFullYear() - now.getFullYear()) === 0) {
                if ((pAdultAge.getMonth() - now.getMonth()) <= 0) {
                    if ((pAdultAge.getMonth() - now.getMonth()) === 0) {
                        if ((pAdultAge.getDate() - now.getDate()) <= 0) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                }
            } else {
                return true;
            }
        }

        return false;
    }

    /**
     * Method that formats the CPF
     * @param value It`s the value that is going to be formated
     * @returns A `string`
     * @throws Error if the format is inadequate
     */
    static CPFFormat(value:string) : string {
        if (value.length > 10 && value.length < 14) {
            value = value.replaceAll('.', '');
            value = value.replaceAll('-', '');

            return value.slice(0, 3) + '.' + 
            value.slice(3, 6) + '.' + 
            value.slice(6, 9) + '-' + 
            value.slice(9, 11);
        } else if (value.length > 14) {
            throw Error("Tamanho inadequado para CPF!");
        } else {
            return value.replaceAll(/[^0-9.-]/g, '');
        }
    } 
        
}

export default FormHandler;
