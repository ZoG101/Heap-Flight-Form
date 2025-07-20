import FormOnNext from "@/class/FormOnNext";

const BookForm = ({ onNext } : FormOnNext) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        onNext();
    }

    return (
        <form action="#" method="POST" onSubmit={handleSubmit}>
            <h2>Dados da Viagem</h2>
            <div className="formInput">
                <label htmlFor="destinyForm">Destino</label>
                <select name="destinyForm" id="destinyForm" required>
                    <option value="" disabled selected hidden>Selecione uma opção</option>
                </select>
            </div>
            <div className="formInput">
                <input className="radioBtt" type="radio" name="goAndBackForm" id="go" required />
                <label htmlFor="go">Somente ida</label>
                <input className="radioBtt" type="radio" name="goAndBackForm" id="goAndBack" required />
                <label htmlFor="goAndBack">Ida e volta</label>
            </div>
            <div className="formInput">
                <label htmlFor="departureForm">Data de ida</label>
                <input type="date" name="departureForm" id="departureForm" required />
            </div>
            <div className="formInput">
                <label htmlFor="backForm">Data de volta</label>
                <input type="date" name="backForm" id="backForm" required />
            </div>
            <div className="bookFormButton">
                <button type="submit">Marcar</button>
            </div>
        </form>
    );
}

export default BookForm;
