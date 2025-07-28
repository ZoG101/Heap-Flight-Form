import HeapData from "@/class/HeapData";
import person from "./Person";

type FormOnNext = {
    passengers?:Array<person>,
    heapData?:HeapData,
    onNext:() => void;
};

export default FormOnNext;