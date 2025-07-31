import { useEffect, useState } from "react";
import ResultProps from "./ResultProps";
import Flight from "@/class/Flight";
import Priority from "@/class/Priority";
import ResultBox from "./ResultBox";

const Result = (props:ResultProps) => {
    const [heap, setHeap] = useState<Array<Flight>>(Array.from<Flight>(props.heapData.getHeapSortedArray()));

    useEffect(() => {
        try {
            setHeap(Array.from<Flight>(props.heapData.getHeapSortedArray()));
        } catch (error) {
            console.log(error);   
        }
    }, [props.heapData]);

    return (
        <div className="w-[100%] h-[100%] flex flex-row gap-5 flex-wrap items-center justify-around">
            {
                heap.map((e, index) => (
                    <ResultBox key={index}>
                        <h2 className="text-center">{e.getFlightNumber()}</h2>
                        <p>Data de ida: {new Date(e.getDeparture()).toLocaleDateString()}</p>
                        <p>Data de volta: {(e.getReturn() === 'UNDEFINED') ? 'N/D' : new Date(e.getReturn()).toLocaleDateString()}</p>
                        <p>Passageiros: {e.getPassengers().length.toString()}</p>
                        <p>Duração: {e.getDuration()}h</p>
                        <p>Maior Prioridade: {Priority[e.getPriority()]}</p>
                    </ResultBox>
                ))
            }
        </div>
    );
}

export default Result;
