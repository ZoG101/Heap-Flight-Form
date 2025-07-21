class BookFormHandler {
    /**
     * Method that fetches the countries names
     * @returns `object[]` that contains their names and other infos
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
        console.log(data);
        return data;
    }
}

export default BookFormHandler;
