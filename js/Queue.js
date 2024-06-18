export class Queue {
  passengers = [];

  constructor(maxSize) {
    this.maxSize = maxSize;
  }

  enqueue(passenger) {
    if(this.isFull()) {
      return false;
    }

    this.passengers.push(passenger);
    return true;
  }

  dequeue() {
    return this.passengers.splice(0, 1)[0];
  }

  getNumEmptySpots() {
    return this.maxSize - this.passengers.length;
  }

  isFull() {
    return this.passengers.length >= this.maxSize;
  }

  isEmpty() {
    return this.passengers.length <= 0;
  }
}
