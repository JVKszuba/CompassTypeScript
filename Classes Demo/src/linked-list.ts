class ListNode<T> {

    public next?: ListNode<T>;
    public previous?: ListNode<T>;
    public value: T;

    constructor(value: T) {this.value = value;}
}

class LinkedList<T> {

    private root?: ListNode<T>;
    private tail?: ListNode<T>;
    private length: number = 0;

    get getRoot(): ListNode<T> | undefined {return this.root}
    get getTail(): ListNode<T> | undefined {return this.tail}
    get getLength(): number {return this.length;}

    private initList(node: ListNode<T>) {

        this.root = this.tail = node;
        this.length = 1;
    }

    push(value: T) {

        const nodeAdd = new ListNode(value)

        if(!this.root || !this.tail) { this.initList(nodeAdd); return }

        nodeAdd.previous = this.tail;
        this.tail.next = nodeAdd;
        this.tail = nodeAdd

        this.length++;
    }

    unshift(value: T) {

        const nodeUnshift = new ListNode(value)

        if(!this.root || !this.tail) { this.initList(nodeUnshift); return }

        nodeUnshift.next = this.root;
        this.root.previous = nodeUnshift;
        this.root = nodeUnshift;

        this.length++;
    }

    pop() {

        if(!this.root || !this.tail) return;
        if(this.root === this.tail) { this.root = this.tail = undefined; return; }

        this.tail = this.tail.previous;
        this.tail!.next = undefined

        this.length--;
    }

    shift() {

        if(!this.root || !this.tail) { return; }
        if(this.root === this.tail) { this.root = this.tail = undefined; return; }

        this.root = this.root.next;
        this.root!.previous = undefined;

        this.length--;
    }

    removeFrom(index: number): void {

        if(index < 0 || index >= this.length || !this.root || !this.tail) { return; }
        if(this.root === this.tail) { this.root = this.tail = undefined; return; }
        if(index === 0) { return this.shift(); }
        if(index === this.length - 1) { return this.pop(); }

        let current = this.root!.next;

        for (let i = 1; i < index; i++) current = current!.next;

        current!.previous!.next = current!.next;
        current!.next!.previous = current!.previous;

        this.length--;
    }

    addIn(index: number, value: T) {

        if(index < 0 || index > this.length) { return; }
        if(index === 0) {return this.unshift(value);}
        if(index === this.length) { return this.push(value); }

        let current = this.root!.next;

        for (let i = 1; i < index; i++) current = current!.next;

        let newNode = new ListNode(value);

        newNode.previous = current!.previous;
        newNode.next = current;

        newNode.previous!.next = newNode;
        newNode.next!.previous = newNode;

        this.length++;
    }

    print() {

        let current = this.root;

        while(current) {console.log(current.value); current = current.next}
    }
}

const numberList = new LinkedList<number>();

numberList.push(10)
numberList.push(5)
numberList.push(-3)
numberList.push(12)
numberList.push(-6)

console.log("Number list values: ");
numberList.print();

console.log("-".repeat(50));
numberList.pop();

console.log("Number list values after pop(): ");
numberList.print();

console.log("-".repeat(50));
numberList.removeFrom(0);

console.log("Number list values after removeFrom(0): ");
numberList.print();

console.log("-".repeat(50));
numberList.addIn(2, 24);

console.log("Number list values after addIn(2, 24): ");
numberList.print();