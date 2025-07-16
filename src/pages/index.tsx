import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import MainBox from "@/components/MainBox";
import { useState } from "react";
import FormHandler from "@/components/form/FormHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [name,setName] = useState<string>("");
  const [CPF, setCPF] = useState<string>("");
  const [birthDate, setBD] = useState<string>("");
  const [phoneNumber, setPN] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [invalidName, setNameError] = useState<boolean>(false);
  const [CPFErro, setCPFERR] = useState<boolean>(false);
  const [underage, setUderage] = useState<boolean>(false);
  const [elderly, setElderly] = useState<boolean>(false);
  const [PNError, setPNError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

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
  
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <header className="flex flex-wrap items-center justify-center">
          <a
          className="flex flex-col items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/golden-icon.png"
            alt="Golden bird icon"
            width={140}
            height={140}
          />
          <h1>Zaviation</h1>
        </a>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <MainBox>
          <form action="#" method="post">
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
              <input type="text" name="CEPForm" id="CEPForm" required />
            </div>
            <div className="formInput">
              <label htmlFor="streetForm">Rua</label>
              <input type="text" name="streetForm" id="streetForm" required />
            </div>
            <div className="formInput">
              <label htmlFor="neighborForm">Bairro</label>
              <input type="text" name="neighborForm" id="neighborForm" required />
            </div>
            <div className="formInput">
              <label htmlFor="numberForm">Número</label>
              <input type="text" name="numberForm" id="numberForm" required />
            </div>
            <div className="formInput">
              <label htmlFor="complementForm">Complemento</label>
              <input type="text" name="complementForm" id="complementForm" required />
            </div>
            <div className="formInput">
              <label htmlFor="UFForm">UF</label>
              <input type="text" name="UFForm" id="UFForm" required />
            </div>
            <div className="formInput">
              <label htmlFor="stateForm">Estado</label>
              <input type="text" name="stateForm" id="stateForm" required />
            </div>
            <div className="formInput">
              <label htmlFor="cityForm">Cidade</label>
              <input type="text" name="cityForm" id="cityForm" required />
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
              <button type="button">Adicionar</button>
              <button type="button">Enviar</button>
            </div>
          </form>
        </MainBox>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn Next
        </a>
        
      </footer>
    </div>
  );
}
