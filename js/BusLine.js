import {Queue} from "./Queue.js";
import {Bus} from "./Bus.js";
import {BusArriveEvent} from "./Events/BusArriveEvent.js";
import {AddPassengerEvent} from "./Events/AddPassengerEvent.js";
import {RemovePassengerEvent} from "./Events/RemovePassengerEvent.js";
import {BusDepartEvent} from "./Events/BusDepartEvent.js";

export class BusLine extends EventTarget {
  bus = null;

  constructor(maxSize) {
    super();
    this.queue = new Queue(maxSize);
  }

  getNumEmptySpots() {
    return this.queue.getNumEmptySpots();
  }

  isFull() {
    return this.queue.isFull();
  }

  enqueue(passenger) {
    this.queue.enqueue(passenger);
    this.dispatchEvent(new AddPassengerEvent(passenger));
  }

  dequeue(passenger) {

  }

  open(timeToBusMs) {
    console.log('waiting for bus');

    setTimeout(() => {
      //create new bus
      this.bus = new Bus();
      this.dispatchEvent(new BusArriveEvent('bus_arrive'));

      this.loadBus();
    }, timeToBusMs);

  }

  async loadBus() {
    console.log('loading bus');
    await this.bus.loadPassengers();
    console.log('bus loaded');

    while(this.queue.isEmpty() === false) {
      const passenger = this.queue.dequeue();
      this.dispatchEvent(new RemovePassengerEvent(passenger));
    }

    this.bus = null;
    this.dispatchEvent(new BusDepartEvent());
  }
}
