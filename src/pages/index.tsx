import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import MainBox from "@/components/MainBox";
import Form from "@/components/form/Form";

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
          href="https://github.com/ZoG101/Heap-Flight-Form"
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
          <h1 className="mainTitle">Zaviation</h1>
        </a>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <MainBox>
          <Form />
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
