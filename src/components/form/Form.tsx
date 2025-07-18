import { useState } from "react";
import FormHandler from "./FormHandler";
import Address from "@/components/form/Address";

const Form = () => {
    /**
     * States for user's the personal data
     */
    const [name,setName] = useState<string>("");
    const [CPF, setCPF] = useState<string>("");
    const [birthDate, setBD] = useState<string>("");
    const [phoneNumber, setPN] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    /**
     * Error states for the user's personal data
     */
    const [invalidName, setNameError] = useState<boolean>(false);
    const [CPFErro, setCPFERR] = useState<boolean>(false);
    const [underage, setUderage] = useState<boolean>(false);
    const [elderly, setElderly] = useState<boolean>(false);
    const [PNError, setPNError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);

    /**
     * States for the user's addres 
     */
    const [cep, setCep] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [neighbor, setNeighbor] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    const [complement, setComplement] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [city, setCity] = useState<string>("");

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
        setBD(value);

        if (FormHandler.verifyAge(value)) setUderage(false);
        else setUderage(true);

        if (FormHandler.isElderly(value)) setElderly(true);
        else setElderly(false);
        } catch (error) {
        console.log(error);
        }

        console.log(underage);
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
        } catch (error) {
        console.log(error); 
        }
    }

    const inputData = (formData: Address) => {
        setStreet(formData.logradouro); 
        setNeighbor(formData.bairro);
        setComplement(formData.complemento);
        setState(formData.estado);
        setCity(formData.localidade);
    }

  const searchAddres = async (value:string) => {
    if (!(value.length === 9)) return;

        try {
        const formData = await FormHandler.fetchAddress(value) as Address;
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => event.preventDefault();

    return (
        <form action="#" method="post" onSubmit={handleSubmit}>
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
            {CPFErro && <span className="error">Erro no formato do CPF</span>}
            <div className="formInput">
                <label htmlFor="birthDateForm">Data de nascimento</label>
                <input type="date" name="birthDateForm" id="birthDateForm" value={birthDate} onChange={(e) => formatDB(e.target.value)} required />
            </div>
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
                <input type="text" name="CEPForm" id="CEPForm" value={cep} onChange={(e) => formatCep(e.target.value)} onBlur={(e) => searchAddres(e.target.value)} required />
            </div>
            <div className="formInput">
                <label htmlFor="streetForm">Rua</label>
                <input type="text" name="streetForm" id="streetForm" value={street} onChange={(e) => setStreet(e.target.value)} required />
            </div>
            <div className="formInput">
                <label htmlFor="neighborForm">Bairro</label>
                <input type="text" name="neighborForm" id="neighborForm" value={neighbor} onChange={(e) => setNeighbor(e.target.value)} required />
            </div>
            <div className="formInput">
                <label htmlFor="numberForm">Número</label>
                <input type="text" name="numberForm" id="numberForm" value={number} onChange={(e) => setNumber(e.target.value)} required />
            </div>
            <div className="formInput">
                <label htmlFor="complementForm">Complemento</label>
                <input type="text" name="complementForm" id="complementForm" value={complement} onChange={(e) => setComplement(e.target.value)} required />
            </div>
            <div className="formInput">
                <label htmlFor="stateForm">Estado</label>
                <input type="text" name="stateForm" id="stateForm" value={state} onChange={(e) => setState(e.target.value)} required />
            </div>
            <div className="formInput">
                <label htmlFor="cityForm">Cidade</label>
                <input type="text" name="cityForm" id="cityForm" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <h2>Prioridade</h2>
            <div className="formInput">
                <input className="radioBtt" type="radio" name="priorityForm" id="default" required />
                <label htmlFor="default">Padrão</label>
                <input className="radioBtt" type="radio" name="priorityForm" id="minor" required checked={underage} />
                <label htmlFor="minor">Menor de idade</label>
                <input className="radioBtt" type="radio" name="priorityForm" id="pregnant" required />
                <label htmlFor="pregnant">Grávida</label>
                <input className="radioBtt" type="radio" name="priorityForm" id="elderly" required checked={elderly} />
                <label htmlFor="elderly">Idoso</label>
            </div>
            <div className="formButton">
                <button type="submit">Adicionar</button>
                <button type="button">Enviar</button>
            </div>
        </form>
    );
}

export default Form;
