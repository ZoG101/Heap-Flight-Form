import Flight from "./Flight";

class HeapData {
    private heap:Array<Flight>;

    constructor() {
        this.heap = new Array<Flight>();
    }

    private swap(posA:number, posB:number, arr:Array<Flight>) : void {
        const aux:Flight = arr[posA];
        arr[posA] = arr[posB];
        arr[posB] = aux;
    }

    private siftUp(pos:number) : void {
        if (pos > 0) {
            const father:number = Math.floor((pos - 1) / 2);
            if (this.heap[father].getPriority() > this.heap[pos].getPriority()) {
                this.swap(pos, father, this.heap);
                this.siftUp(father);
            }
        }
    }

    private siftDown(pos:number, length:number, arr:Array<Flight>) : void {
        if (pos < length) {
            const left = (pos * 2) + 1;
            const right = (pos * 2) + 2;
            let bigger = pos;

            if ((left < length) && (right < length)) {
                if ((arr[left].getPriority() <= arr[right].getPriority()) && (arr[left].getPriority() <= arr[pos].getPriority())) bigger = left;
                else if ((arr[right].getPriority() <= arr[left].getPriority()) && (arr[right].getPriority() <= arr[pos].getPriority())) bigger = right;
            } else if (left < length) {
                if (arr[left].getPriority() <= arr[pos].getPriority()) bigger = left;
            }

            if (bigger != pos) {
                this.swap(pos, bigger, arr);
                this.siftDown(bigger, length, arr);
            }
        }
    }

    private heapSort(arr:Array<Flight>) : void {
        if (arr.length == 1) return;

        for (let i = (arr.length - 1); i > 0; i--) {
            this.swap(0, i, arr);
            this.siftDown(0, i, arr);
        }
    }

    public addFlight(flight: Flight) : void {
        this.siftUp(this.heap.push(flight) - 1);
    }

    public removeFlight() : void {
        this.swap(0, (this.heap.length - 1), this.heap);
        this.heap.pop();
        this.siftDown(0, this.heap.length, this.heap);
    }

    public readHeap() : ReadonlyArray<Flight> {
        const readonlyHeap:ReadonlyArray<Flight> = [...this.heap];
        return readonlyHeap;
    }

    public getHeapSortedArray() : Array<Flight> {
        const sortedArr:Array<Flight> = Array.from<Flight>(this.heap);

        this.heapSort(sortedArr);

        return sortedArr;
    }
}

export default HeapData;
