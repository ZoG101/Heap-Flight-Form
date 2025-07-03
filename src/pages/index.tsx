import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import MainBox from "@/components/MainBox";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
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
              <label htmlFor="">Nome Completo</label>
              <input type="text" name="" id="" />
            </div>
            <div className="formInput">
              <label htmlFor="">CPF</label>
              <input type="text" name="" id="" />
            </div>
            <div className="formInput">
              <label htmlFor="">Data de nascimento</label>
              <input type="date" name="" id="" />
            </div>
            <div className="formInput">
              <label htmlFor="">Telefone</label>
              <input type="tel" name="" id="" />
            </div>
            <div className="formInput">
              <label htmlFor="">E-mail</label>
              <input type="email" name="" id="" />
            </div>
            <h2>Endereço</h2>
            <div className="formInput">
              <label htmlFor="">CEP</label>
              <input type="text" name="" id="" />
            </div>
            <div className="formInput">
              <label htmlFor="">Rua</label>
              <input type="text" name="" id="" />
            </div>
            <div className="formInput">
              <label htmlFor="">Bairro</label>
              <input type="text" name="" id="" />
            </div>
            <div className="formInput">
              <label htmlFor="">Número</label>
              <input type="text" name="" id="" />
            </div>
            <div className="formInput">
              <label htmlFor="">Complemento</label>
              <input type="text" name="" id="" />
            </div>
            <div className="formInput">
              <label htmlFor="">UF</label>
              <input type="text" name="" id="" />
            </div>
            <div className="formInput">
              <label htmlFor="">Cidade</label>
              <input type="text" name="" id="" />
            </div>
              <button type="button">Enviar</button>
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
          Learn
        </a>
        
      </footer>
    </div>
  );
}
