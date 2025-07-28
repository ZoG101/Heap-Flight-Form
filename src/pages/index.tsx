import { geistSans, geistMono } from "@/font/fonts"
import MainBox from "@/components/MainBox";
import Form from "@/components/form/Form";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";
import BookForm from "@/components/bookForm/BookForm";
import HeapData from "@/class/HeapData";
import Person from "@/class/Person";

export default function Home() {
  const [currentForm, setCurrentForm] = useState<'formA' | 'formB' | 'formC'>('formA');
  const [data, setData] = useState<HeapData>(new HeapData());
  const [passengers, setPassengers] = useState<Array<Person>>(new Array<Person>());

  useEffect(() => {
    if (data === null || data === undefined) setData(new HeapData());
    setPassengers(new Array<Person>());
  }, []);

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-30 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <header className="flex flex-wrap items-center justify-center">
          <Header />
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <MainBox>
          {currentForm === 'formA' && <Form passengers={passengers} onNext={() => setCurrentForm('formB')} />}
          {currentForm === 'formB' && <BookForm heapData={data} onNext={() => setCurrentForm('formC')} />}
        </MainBox>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Footer />
      </footer>
    </div>
  );
}
