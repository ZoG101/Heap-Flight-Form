import BookFormHandler from "./BookFormHandler";
import FormOnNext from "@/class/FormOnNext";
import TravelType from "./TravelType";
import { useEffect, useState } from "react";
import Country from "./CountryType";

const BookForm = ({ onNext } : FormOnNext) => {
    const [travelType, setTravelType] = useState<TravelType>(TravelType.GOONLY);
    const [countries, setCountries] = useState<Map<number, Country>>(new Map<number, Country>());

    const setDataIntoMap = (data:Array<Array<Country>>) => {
        const newMap = new Map<number, Country>();
        data.flat().forEach(country => {
            newMap.set(country.id.M49, country);
        });
        setCountries(newMap);
    }

    const fetchCountries = async () => {
        try {
            const formData = await BookFormHandler.fetchCountries() as Array<Array<Country>>;
            if (formData.length > 0) {
                setDataIntoMap(formData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCountries();
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        onNext();
    }

    return (
        <form action="#" method="POST" onSubmit={handleSubmit}>
            <h2>Dados da Viagem</h2>
            <div className="formInput">
                <label htmlFor="destinyForm">Destino</label>
                <select className="formSelect" name="destinyForm" id="destinyForm" required>
                    <option value="" disabled selected hidden>Selecione uma opção</option>
                    {
                        (countries.size > 0) ?
                        Array.from(countries.values()).map((country, idx) => (
                            <option className="formOption" key={country.id.M49 ?? idx} value={country.nome.abreviado}>
                                {country.nome.abreviado}
                            </option>
                        )) 
                        :
                        <option className="formOption" key={-1} value={"ERRO"}>
                            Erro ao buscar países
                        </option>
                    }
                </select>
            </div>
            <div className="formInput">
                <input className="radioBtt" type="radio" name="goAndBackForm" id="go" value={travelType} onChange={() => setTravelType(TravelType.GOONLY)} checked={(travelType === TravelType.GOONLY) && true} required />
                <label htmlFor="go">Somente ida</label>
                <input className="radioBtt" type="radio" name="goAndBackForm" id="goAndBack" value={travelType} onChange={() => setTravelType(TravelType.GOANDBACK)} checked={(travelType === TravelType.GOANDBACK) && true} required />
                <label htmlFor="goAndBack">Ida e volta</label>
            </div>
            {
                (travelType === TravelType.GOONLY) && 
                <div className="formInput">
                    <label htmlFor="departureForm">Data de ida</label>
                    <input type="date" name="departureForm" id="departureForm" required />
                </div>
            }
            {
                (travelType === TravelType.GOANDBACK) && 
                <>
                    <div className="formInput">
                        <label htmlFor="departureForm">Data de ida</label>
                        <input type="date" name="departureForm" id="departureForm" required />
                    </div>
                    <div className="formInput">
                        <label htmlFor="backForm">Data de volta</label>
                        <input type="date" name="backForm" id="backForm" required />
                    </div>
                </>
            }
            <div className="bookFormButton">
                <button type="submit">Marcar</button>
            </div>
        </form>
    );
}

export default BookForm;
