import FormTrasitionType from "@/class/FormTrasitionType";
import RepeatFormProps from "./RepeatFormProps";

const RepeatForm = (props:RepeatFormProps) => {
    const repeat = () => {
        props.onNext(FormTrasitionType.FORM_A);
    }

    const showResult = () => {
        props.onNext(FormTrasitionType.RESULT);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <form action="#" method="POST" onSubmit={handleSubmit}>
            <h2 className="success">SUCESSO!</h2>
            <p>Deseja marcar mais um voo?</p>
            <div className="formButton">
                <button type="button" onClick={() => repeat()}>Repetir</button>
                <button type="button" onClick={() => showResult()}>Prosseguir</button>
            </div>
        </form>
    );
}

export default RepeatForm;
