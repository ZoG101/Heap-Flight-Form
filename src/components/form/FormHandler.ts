class FormHandler {
    /*Returns true if everything is not blank
    * Returns false if there is something blank
    */
    static verifyBlankContent(content:string) : boolean {
        if (content.length == 0) return false;
        return true;
    };

    static verify(...content:Array<string>) : boolean {
        let ret = true;
        content.forEach((e) => {
            if (!FormHandler.verifyBlankContent(e)) ret = false;
        });

        return ret
    }

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
}

export default FormHandler;
