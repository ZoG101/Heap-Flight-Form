import BookFormHandler from "./BookFormHandler";
import FormOnNext from "@/class/FormOnNext";
import TravelType from "./TravelType";
import { useEffect, useState } from "react";
import Country from "./CountryType";
import Flight from "@/class/Flight";

const BookForm = (props:FormOnNext) => {
    const [travelType, setTravelType] = useState<TravelType>(TravelType.GOONLY);
    const [countries, setCountries] = useState<Map<number, Country>>(new Map<number, Country>());

    const [detiny, setDestiny] = useState<string>('');
    const [departureDate, setDepartureDate] = useState<string>('');
    const [returnDate, setReturnDate] = useState<string>('');

    const [detinyError, setDestinyError] = useState<boolean>(false);
    const [departureDateError, setDepartureDateError] = useState<boolean>(false);
    const [returnDateError, setReturnDateError] = useState<boolean>(false);
    const [sendFormError, setSendFormError] = useState<boolean>(false);

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

    const verifyAllFields = () => {
        if (!(BookFormHandler.verifyBlankContent(detiny))) {
            setDestinyError(true);
            return true;
        } else if (!(BookFormHandler.verifyBlankContent(departureDate))) {
            setDepartureDateError(true);
            return true;
        } else if (travelType === TravelType.GOANDBACK && (!(BookFormHandler.verifyBlankContent(returnDate)))) {
            setReturnDateError(true);
            return true;
        }

        return false;
    }

    const prepareFlight = () => {
        if (props.heapData && props.passengers) {
            let flight:Flight;
            if (travelType === TravelType.GOONLY) {
                flight = new Flight((Math.random()*10000).toFixed(0).toString(), 
                                    departureDate, 
                                    ((new Date(departureDate).getTime() + 1) - (new Date(departureDate).getTime())).toString(), 
                                    10, undefined);
            } else {
                flight = new Flight((Math.random()*10000).toFixed(0).toString(), 
                                    departureDate, 
                                    ((new Date(departureDate).getTime() + 1) - (new Date(departureDate).getTime())).toString(), 
                                    10, returnDate);
            }
            
            if (props.passengers.length > 0) {
                props.passengers.forEach((e) => {
                    flight.addPassengers(e);
                });
                props.heapData.addFlight(flight);
            } else {
                throw new Error("Não há passageiros");
            }
            console.log(props.heapData);
        } else {
            throw new Error("Não foi possível adicionar voo");
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (verifyAllFields()) return;

        try {
            prepareFlight();
            setSendFormError(false);
            props.onNext();
        } catch (error) {
            setSendFormError(true);
            console.log(error);
            return;
        }
    }

    const handleSelection = (data:string) => {
        try {
            setDestiny(data);
            setDestinyError(false);
        } catch (error) {
            console.log(error);
            setDestinyError(true);
        }
    }

    const checkDepartureDate = (date:string) => {
        try {
            if (BookFormHandler.checkDepartureDate(date)) {
                setDepartureDate(date);
                setDepartureDateError(false);
            }
        } catch (error) {
            if (departureDate.length === 0) setDepartureDateError(true);
            console.log(error);
        }
    }

    const checkReturnDate = (date:string) => {
        if (departureDate.length === 0) return;
        try {
            if (BookFormHandler.checkBackDate(departureDate, date)) {
                setReturnDate(date);
                setReturnDateError(false);
            }
        } catch (error) {
            if (returnDate.length === 0) setReturnDateError(true);
            console.log(error);
        }
    }

    return (
        <form action="#" method="POST" onSubmit={handleSubmit}>
            <h2>Dados da Viagem</h2>
            <div className="formInput">
                <label htmlFor="destinyForm">Destino</label>
                <select className="formSelect" name="destinyForm" id="destinyForm" value={detiny} onChange={(e) => handleSelection(e.target.value)} required>
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
            {(detinyError) && <span className="error">Seleção inválida</span>}
            <div className="formInput">
                <input className="radioBtt" type="radio" name="goAndBackForm" id="go" value={travelType} onChange={() => setTravelType(TravelType.GOONLY)} checked={(travelType === TravelType.GOONLY)} required />
                <label htmlFor="go">Somente ida</label>
                <input className="radioBtt" type="radio" name="goAndBackForm" id="goAndBack" value={travelType} onChange={() => setTravelType(TravelType.GOANDBACK)} checked={(travelType === TravelType.GOANDBACK)} required />
                <label htmlFor="goAndBack">Ida e volta</label>
            </div>
            {
                (travelType === TravelType.GOONLY) && 
                (
                    <>
                        <div className="formInput">
                            <label htmlFor="departureForm">Data de ida</label>
                            <input type="date" name="departureForm" id="departureForm" value={departureDate} onChange={(e) => checkDepartureDate(e.target.value)} required />
                        </div>
                        {(departureDateError) && <span className="error">Data inserida é inválida</span>}
                    </>
                )
            }
            {
                (travelType === TravelType.GOANDBACK) && 
                (
                    <>
                        <div className="formInput">
                            <label htmlFor="departureForm">Data de ida</label>
                            <input type="date" name="departureForm" id="departureForm" value={departureDate} onChange={(e) => checkDepartureDate(e.target.value)} required />
                        </div>
                        {(departureDateError) && <span className="error">Data inserida é inválida</span>}
                        <div className="formInput">
                            <label htmlFor="backForm">Data de volta</label>
                            <input type="date" name="backForm" id="backForm" value={returnDate} onChange={(e) => checkReturnDate(e.target.value)} required disabled={(departureDate.length === 0)} />
                        </div>
                        {(returnDateError) && <span className="error">Data de volta é inválida</span>}
                    </>
                )
            }
            <div className="bookFormButton">
                <button type="submit">Marcar</button>
            </div>
            {(sendFormError) && <span className="error">Data de volta é inválida</span>}
        </form>
    );
}

export default BookForm;
