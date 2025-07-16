class FormHandler {
    /**
     * @param content is the content
     * @return `true` if everything is not blank
     * @return `false` if there is something blank
    */
    static verifyBlankContent(content:string) : boolean {
        if (content.length == 0) return false;
        return true;
    };

    /**
     * @param content is the array of content
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
    *   @param birthDate is the user's birth date
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
    *   Verify if the person is an elder
    *   @param birthDate is the user's birth date
    *   @throws An `error` if the age is invalid, it's going to return
    *   @return If the person is under-age, it's going to return `false`
    *   @return If the person is 18+, it's going to return `true`
    */ 
    static isElderly(birthDate:string) : boolean {
        const pAge:Date = new Date(birthDate);
        const now:Date = new Date();
        const pElderlyAge:Date = new Date(birthDate);

        pElderlyAge.setFullYear(pAge.getFullYear() + 60);

        if ((pElderlyAge.getFullYear() - now.getFullYear()) <= 0) {
            if ((pElderlyAge.getFullYear() - now.getFullYear()) === 0) {
                if ((pElderlyAge.getMonth() - now.getMonth()) <= 0) {
                    if ((pElderlyAge.getMonth() - now.getMonth()) === 0) {
                        if ((pElderlyAge.getDate() - now.getDate()) <= 0) {
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
     * @param value is the value that is going to be formated
     * @returns A `string`
     * @throws Error if the format is inadequate
     */
    static CPFFormat(value:string) : string {
        if (value.length === 11) {
            value = value.replaceAll('.', '');
            value = value.replaceAll('-', '');

            return value.slice(0, 3) + '.' + 
            value.slice(3, 6) + '.' + 
            value.slice(6, 9) + '-' + 
            value.slice(9, 11);
        } else if (value.length > 14) {
            throw Error("Tamanho inadequado para CPF!");
        } else {
            value = value.replaceAll('.', '');
            value = value.replaceAll('-', '');
            return value.replaceAll(/[^0-9.-]/g, '');
        }
    }

    /**
     * Method that verifies the name
     * @param value is the value that is going to be verified
     * @returns `true` if the name have an acceptable pattern
     * @returns `false` is the name doesn't have an acceptable pattern
     * @throws Error if the format is inadequate
     */
    static verifyName(value:string) : boolean {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ'´`^çÇ]{2,}(?: [A-Za-zÀ-ÖØ-öø-ÿ'´`^çÇ]{2,})*$/;
        if (regex.test(value)) return true;
        else return false;
    }

    /**
     * Method that formats the user's phone number
     * @param value is the value that is going to be formated
     * @returns `string` of the formated phone number
     * @throws Error if the format is inadequate
     */
    static formatPhoneNumber(value:string) : string {
        if (value.length === 11) {
            value = value.replaceAll('(', '');
            value = value.replaceAll(')', '');
            value = value.replaceAll('-', '');
            value = value.replaceAll(' ', '');

            return '(' + value.slice(0, 2) + ')' + 
            ' ' + 
            value.slice(2, 7) + 
            '-' + 
            value.slice(7, 11);
        } else if (value.length > 15) {
            throw Error("Formato inadequado para o número de telefone");
        } else {
            value = value.replaceAll('(', '');
            value = value.replaceAll(')', '');
            value = value.replaceAll('-', '');
            value = value.replaceAll(' ', '');
            return value.replaceAll(/[^0-9)(-]/g, '');
        }
    }

    /**
     * Method that verifies the email format
     * @param value is the value that is going to be verified
     * @returns `true` if the email have an acceptable pattern
     * @returns `false` is the email doesn't have an acceptable pattern
     */
    static verifyEmail(value:string) : boolean {
        const regex = /^[A-Za-z0-9.\-]{2,}\@[A-Za-z0-9]{2,}(\.[a-z]{2,})+$/;
        if (regex.test(value)) return true;
        else return false;
    }
        
}

export default FormHandler;
