import Flight from "./Flight";

class HeapData {
    private heap:Array<Flight>;

    constructor() {
        this.heap = [];
    }

    private swap(posA:number, posB:number) : void {
        const aux:Flight = this.heap[posA];
        this.heap[posA] = this.heap[posB];
        this.heap[posB] = aux;
    }

    private siftUp(pos:number) : void {
        if (pos > 0) {
            const father:number = Math.floor((pos - 1) / 2);
            if (this.heap[father].getPriority() < this.heap[pos].getPriority()) {
                this.swap(pos, father);
                this.siftUp(father);
            }
        }
    }

    private siftDown(pos:number) {
        if (pos < this.heap.length) {
            const left = (pos * 2) + 1;
            const right = (pos * 2) + 2;
            let bigger = pos;

            if ((this.heap[left].getPriority() >= this.heap[right].getPriority()) && (this.heap[left].getPriority() >= this.heap[pos].getPriority())) bigger = left;
            else if ((this.heap[right].getPriority() >= this.heap[left].getPriority()) && (this.heap[right].getPriority() >= this.heap[pos].getPriority())) bigger = right;

            if (bigger != pos) {
                this.swap(pos, bigger);
                this.siftDown(bigger);
            }
        }
    }

    public addFlight(flight: Flight) : void {
        this.heap.push(flight);
        this.siftUp(this.heap.length - 1);
    }

    public removeFlight() : void {
        this.swap(0, (this.heap.length - 1));
        this.heap.pop();
        this.siftDown(0);
    }

    public readHeap() : ReadonlyArray<Flight> {
        const readonlyHeap:ReadonlyArray<Flight> = [...this.heap];
        return readonlyHeap;
    }
}

export default HeapData;
