import { geistSans, geistMono } from "@/font/fonts"
import MainBox from "@/components/MainBox";
import Form from "@/components/form/Form";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";
import BookForm from "@/components/bookForm/BookForm";
import HeapData from "@/class/HeapData";
import Person from "@/class/Person";
import RepeatForm from "@/components/RepeatForm/RepeatForm";
import FormTrasitionType from "@/class/FormTrasitionType";
import Result from "@/components/result/Result";

export default function Home() {
  const [currentForm, setCurrentForm] = useState<FormTrasitionType>(FormTrasitionType.FORM_A);
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
          {
            (currentForm === FormTrasitionType.FORM_A)
            && 
            <Form 
              passengers={passengers} 
              onNext={() => setCurrentForm(FormTrasitionType.FORM_B)} />
          }
          {
            (currentForm === FormTrasitionType.FORM_B) 
            && 
            <BookForm 
            passengers={passengers} 
            heapData={data} 
            onNext={() => {
                            setCurrentForm(FormTrasitionType.FORM_C); 
                            setPassengers(new Array<Person>())}} />
          }
          {
            currentForm === FormTrasitionType.FORM_C 
            && 
            <RepeatForm onNext={setCurrentForm} />
          }
          {
            currentForm === FormTrasitionType.RESULT
            &&
            <Result onNext={setCurrentForm} heapData={data} />
          }
        </MainBox>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Footer />
      </footer>
    </div>
  );
}
