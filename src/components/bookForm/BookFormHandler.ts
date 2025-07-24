class BookFormHandler {
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
            if (!BookFormHandler.verifyBlankContent(e)) ret = false;
        });
        return ret
    }

    /**
     * Method that fetches the countries names
     * @returns `Promise<object[]>` that contains their names and other infos
     * @throws Error if the fetch fails
     */
    static async fetchCountries() : Promise<object[]> {
        const url = 'https://servicodados.ibge.gov.br/api/v1/paises/ALL';
        const options: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json; charset=utf-8',
            },
        };

        const res = await fetch(url, options);
        if (!res.ok) throw Error("Erro na requisição");
        const data = await res.json();
        return data;
    }

    /**
    *   Verifies if the date of departure is valid or not
    *   @param date is the departures's date
    *   @throws An `error` if the date is invalid
    *   @return If the date is valid, it's going to return `true`
    */ 
    static checkDepartureDate(departureDate:string) : boolean {
        const departure:Date = new Date(departureDate);
        const now:Date = new Date();

        if (departure.getTime() < now.getTime()) throw Error("Data de ida inválida");
        
        return true;
    }

    /**
    *   Verifies if the date of back flight is valid or not
    *   @param date is the back flight's date
    *   @throws An `error` if the date is invalid
    *   @return If the date is valid, it's going to return `true`
    */ 
    static checkBackDate(departureDate:string, backDate:string) : boolean {
        const departure:Date = new Date(departureDate);
        const back:Date = new Date(backDate);

        if ((departure.getTime() + 1) > back.getTime()) throw Error("Data de volta inválida");
        
        return true;
    }
}

export default BookFormHandler;
