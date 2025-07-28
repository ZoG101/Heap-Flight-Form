import { useState } from "react";
import FormHandler from "./FormHandler";
import AddressType from "@/components/form/AddressType";
import Priority from "@/class/Priority";
import FormOnNext from "@/class/FormOnNext";
import Person from "@/class/Person";
import Address from "@/class/Address";


const Form = (props:FormOnNext) => {
    /**
     * States for user's the personal data
     */
    const [name,setName] = useState<string>("");
    const [CPF, setCPF] = useState<string>("");
    const [birthDate, setBD] = useState<string>("");
    const [phoneNumber, setPN] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [priority, setPriority] = useState<Priority>(Priority.DEFAULT);

    /**
     * Error states for the user's personal data
     */
    const [invalidName, setNameError] = useState<boolean>(false);
    const [CPFError, setCPFERR] = useState<boolean>(false);
    const [BDError, setBDError] = useState<boolean>(false);
    const [PNError, setPNError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);

    /**
     * States for the user's address
     */
    const [cep, setCep] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [neighbor, setNeighbor] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    const [complement, setComplement] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [city, setCity] = useState<string>("");

    /**
     * Error states for the address
     */
    const [CEPError, setCEPError] = useState<boolean>(false);
    const [streetError, setStreetError] = useState<boolean>(false);
    const [neighborError, setNeighborError] = useState<boolean>(false);
    const [numberError, setNumberError] = useState<boolean>(false);
    const [complementError, setComplementError] = useState<boolean>(false);
    const [stateError, setStateError] = useState<boolean>(false);
    const [cityError, setCityError] = useState<boolean>(false);

    /**
     * Age control states
     */
    const [underage, setUderage] = useState<boolean>(false);
    const [elderly, setElderly] = useState<boolean>(false);

    const[sendError, setSendError] = useState<boolean>(false);

    const verifyName = (value:string) => {
    setName(value);

        if (!FormHandler.verifyName(value)) setNameError(true);
        else setNameError(false);
    }

    const formatCPF = (value:string) => {
        try {
            setCPF(FormHandler.CPFFormat(value));
            setCPFERR(false);
        } catch (error) {
            console.log(error);
            if (CPF.length > 14) setCPFERR(true);
        }
    }

    const formatDB = (value:string) => {
        try {
            if (FormHandler.verifyAge(value)) { 
                setBD(value);
                setUderage(false);
            } else { 
                setBD(value);
                setUderage(true);
                setPriority(Priority.MINOR)
            }

            if (FormHandler.isElderly(value)) {
                setBD(value);
                setElderly(true);
                setPriority(Priority.ELDER);
            } else { 
                setBD(value);
                setElderly(false);
            }

            setBDError(false);
        } catch (error) {
            if (!FormHandler.verifyBlankContent(birthDate)) setBDError(true);
            console.log(error);
        }
    }

    const formatPN = (value:string) => {
        try {
            setPN(FormHandler.formatPhoneNumber(value));
            setPNError(false);
        } catch (error) {
            console.log(error);
            if (phoneNumber.length > 15) setPNError(true);
        }
    }

    const verifyEmail = (value:string) => {
        setEmail(value);

        if (!FormHandler.verifyEmail(value)) setEmailError(true);
        else setEmailError(false);
    }

    const formatCep = (value:string) => {
        try {
            setCep(FormHandler.formatCEP(value));
            setCEPError(false);
        } catch (error) {
            setCEPError(true);
            console.log(error); 
        }
    }

    const inputData = (formData: AddressType) => {
        handleStreet(formData.logradouro); 
        handleNeighbor(formData.bairro);
        handleComplement(formData.complemento);
        handleState(formData.estado);
        handleCity(formData.localidade);
    }

    const searchAddres = async (value:string) => {
        if (!(value.length === 9)) return;

        try {
            const formData = await FormHandler.fetchAddress(value) as AddressType;
            if (formData && typeof formData.logradouro === "string") {
                inputData(formData);
            } else {
                inputData({ 
                logradouro: "",
                bairro: "",
                complemento: "",
                estado: "",
                localidade: "", 
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleStreet = (data:string) => {
        try {
            setStreet(data);
            setStreetError(false);
        } catch (error) {
            setStateError(true);
            console.log(error);
        }
    }

    const handleNeighbor = (data:string) => {
        try {
            setNeighbor(data);
            setNeighborError(false);
        } catch (error) {
            setNeighborError(true);
            console.log(error);
        }
    }

    const handleNumber = (data:string) => {
        try {
            setNumber(data);
            setNumberError(false);
        } catch (error) {
            setNumberError(true);
            console.log(error);
        }
    }

    const handleComplement = (data:string) => {
        try {
            setComplement(data);
            setComplementError(false);
        } catch (error) {
            setComplementError(true);
            console.log(error);
        }
    }

    const handleState = (data:string) => {
        try {
            setState(data);
            setStateError(false);
        } catch (error) {
            setStateError(true);
            console.log(error);
        }
    }

    const handleCity = (data:string) => {
        try {
            setCity(data);
            setCityError(false);
        } catch (error) {
            setCityError(true);
            console.log(error);
        }
    }

    const handleSelection = (priority:Priority) => {
        if ((elderly || underage)) return;

        setPriority(priority);
    }

    const verifyAllFields = () => {
        if (!FormHandler.verifyBlankContent(name)) { 
            setNameError(true);
            return true;
        } else if (!FormHandler.verifyBlankContent(CPF)) {
            setCEPError(true);
            return true;
        } else if (!FormHandler.verifyBlankContent(birthDate)) {
            setBDError(true);
            return true;
        } else if (!FormHandler.verifyBlankContent(phoneNumber)) {
            setPNError(true);
            return true;
        } else if (!FormHandler.verifyBlankContent(email)) {
            setEmailError(true);
            return true;
        } else if (!FormHandler.verifyBlankContent(cep)) {
            setCEPError(true);
            return true;
        } else if (!FormHandler.verifyBlankContent(street)) {
            setStreetError(true);
            return true;
        } else if (!FormHandler.verifyBlankContent(neighbor)) {
            setNeighborError(true);
            return true;
        } else if (!FormHandler.verifyBlankContent(number)) {
            setNumberError(true);
            return true;
        } else if (!FormHandler.verifyBlankContent(complement)) {
            setComplementError(true);
            return true;
        } else if (!FormHandler.verifyBlankContent(state)) {
            setStateError(true);
            return true;
        } else if (!FormHandler.verifyBlankContent(city)) {
            setCityError(true);
            return true;
        }
        return false;
    }

    const cleanAllFields = () => {
        setName('');
        setCPF('');
        setBD('');
        setPN('');
        setEmail('');
        setCep('');
        setStreet('');
        setNeighbor('');
        setNumber('');
        setComplement('');
        setState('');
        setCity('');
        setPriority(Priority.DEFAULT);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();

        if (verifyAllFields()) return;

        try {
            if (props.passengers) {
                props.passengers.push(new Person(
                                                name, 
                                                CPF, 
                                                birthDate, 
                                                phoneNumber, 
                                                email, 
                                                new Address(
                                                    cep, 
                                                    street, 
                                                    neighbor, 
                                                    number, 
                                                    complement, 
                                                    state, 
                                                    city), 
                                                priority));
            } else {
                throw Error("Não há como armazenar passageiro!");
            }
            console.log(props.passengers);
            props.onNext();
        } catch (error) {
            setSendError(true);
            console.log(error);
        }
    }

    const addButton = () => {
        if (verifyAllFields()) return;

        try {
            if (props.passengers) {
                props.passengers.push(new Person(
                                                name, 
                                                CPF, 
                                                birthDate, 
                                                phoneNumber, 
                                                email, 
                                                new Address(
                                                    cep, 
                                                    street, 
                                                    neighbor, 
                                                    number, 
                                                    complement, 
                                                    state, 
                                                    city), 
                                                priority));
            } else {
                throw Error("Não há como armazenar passageiro!");
            }
            console.log(props.passengers);
            cleanAllFields();
        } catch (error) {
            setSendError(true);
            console.log(error);
        }
    }

    return (
        <form action="#" method="POST" onSubmit={handleSubmit}>
            <h2>Dados Pessoais</h2>
            <div className="formInput">
                <label htmlFor="nameForm">Nome Completo</label>
                <input type="text" name="nameForm" id="nameForm" placeholder="Fulano de Tal" value={name} onChange={(e) => verifyName(e.target.value)} required />
            </div>
            {invalidName && <span className="error">Nome inválido</span>}
            <div className="formInput">
                <label htmlFor="CPFForm">CPF</label>
                <input type="text" name="CPFForm" id="CPFForm" value={CPF} onChange={(e) => formatCPF(e.target.value)} placeholder="111.111.111-11" required />
            </div>
            {CPFError && <span className="error">Erro no formato do CPF</span>}
            <div className="formInput">
                <label htmlFor="birthDateForm">Data de nascimento</label>
                <input type="date" name="birthDateForm" id="birthDateForm" value={birthDate} onChange={(e) => formatDB(e.target.value)} required />
            </div>
            {BDError && <span className="error">Data inválida</span>}
            <div className="formInput">
                <label htmlFor="telForm">Telefone</label>
                <input type="tel" name="telForm" id="telForm" placeholder="(11) 11111-1111" value={phoneNumber} onChange={(e) => formatPN(e.target.value)} required />
            </div>
            {PNError && <span className="error">Formato do número de telefone inadequado</span>}
            <div className="formInput">
                <label htmlFor="emailForm">E-mail</label>
                <input type="email" name="emailForm" id="emailForm" placeholder="nome@dominio.com" value={email} onChange={(e) => verifyEmail(e.target.value)} required />
            </div>
            {emailError && <span className="error">Formato do E-mail inadequado</span>}
            <h2>Endereço</h2>
            <div className="formInput">
                <label htmlFor="CEPForm">CEP</label>
                <input type="text" name="CEPForm" id="CEPForm" placeholder="01001-000" value={cep} onChange={(e) => formatCep(e.target.value)} onBlur={(e) => searchAddres(e.target.value)} required />
            </div>
            {CEPError && <span className="error">Formato do CEP é inadequado</span>}
            <div className="formInput">
                <label htmlFor="streetForm">Rua</label>
                <input type="text" name="streetForm" id="streetForm" placeholder="Praça da Sé" value={street} onChange={(e) => handleStreet(e.target.value)} required />
            </div>
            {streetError && <span className="error">Formato do nome da rua é inadequado</span>}
            <div className="formInput">
                <label htmlFor="neighborForm">Bairro</label>
                <input type="text" name="neighborForm" id="neighborForm" placeholder="Sé" value={neighbor} onChange={(e) => handleNeighbor(e.target.value)} required />
            </div>
            {neighborError && <span className="error">Formato do ome do bairro é inadequado</span>}
            <div className="formInput">
                <label htmlFor="numberForm">Número</label>
                <input type="text" name="numberForm" id="numberForm" placeholder="11111" value={number} onChange={(e) => handleNumber(e.target.value)} required />
            </div>
            {numberError && <span className="error">Formato do número é inadequado</span>}
            <div className="formInput">
                <label htmlFor="complementForm">Complemento</label>
                <input type="text" name="complementForm" id="complementForm" placeholder="lado ímpar" value={complement} onChange={(e) => handleComplement(e.target.value)} required />
            </div>
            {complementError && <span className="error">Formato do complemento é inadequado</span>}
            <div className="formInput">
                <label htmlFor="stateForm">Estado</label>
                <input type="text" name="stateForm" id="stateForm" placeholder="São Paulo" value={state} onChange={(e) => handleState(e.target.value)} required />
            </div>
            {stateError && <span className="error">Formato do nome do estado é inadequado</span>}
            <div className="formInput">
                <label htmlFor="cityForm">Cidade</label>
                <input type="text" name="cityForm" id="cityForm" placeholder="São Paulo" value={city} onChange={(e) => handleCity(e.target.value)} required />
            </div>
            {cityError && <span className="error">Formato do nome da cidade é inadequado</span>}
            <h2>Prioridade</h2>
            <div className="formInput">
                <input className="radioBtt" type="radio" name="priorityForm" id="default" value={Priority.DEFAULT} onChange={()=>handleSelection(Priority.DEFAULT)} checked={(priority === Priority.DEFAULT)} required />
                <label htmlFor="default">Padrão</label>
                <input className="radioBtt" type="radio" name="priorityForm" id="minor" value={Priority.MINOR} checked={((underage) && (priority === Priority.MINOR))} required readOnly />
                <label htmlFor="minor">Menor de idade</label>
                <input className="radioBtt" type="radio" name="priorityForm" id="pregnant" value={Priority.PREGNANT} onChange={()=>handleSelection(Priority.PREGNANT)} checked={(priority === Priority.PREGNANT)} required />
                <label htmlFor="pregnant">Grávida</label>
                <input className="radioBtt" type="radio" name="priorityForm" id="elderly" value={Priority.ELDER} checked={((elderly) && (priority === Priority.ELDER))} required readOnly />
                <label htmlFor="elderly">Idoso</label>
            </div>
            <div className="formButton">
                <button type="button" onClick={() => addButton()}>Adicionar</button>
                <button type="submit">Enviar</button>
            </div>
            {sendError && <span className="error">Não foi possível enviar o formulário...</span>}
        </form>
    );
}

export default Form;
