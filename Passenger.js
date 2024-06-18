import {PurchaseTicketEvent} from "./PurchaseTicketEvent.js";

export class Passenger extends EventTarget {
  hasTicket = false;

  constructor(id) {
    super();
    this.id = id;
  }

  setHasTicket(hasTicket) {
    this.hasTicket = hasTicket;

    if(this.hasTicket) {
      this.dispatchEvent(new PurchaseTicketEvent());
    }
  }
}
