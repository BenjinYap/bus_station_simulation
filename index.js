import {Passenger} from "./Passenger.js";

const hasTicketChance = 0.5;

function generatePassengers(num = 50) {
  num = 5;
  let passengers = [];


  for(let i = 0; i < num; i++) {
    const p = new Passenger(i);
    p.addEventListener('purchase_ticket', onPurchaseTicket);
    passengers.push(p);
  }

  return passengers;
}

function onPurchaseTicket() {
  const div = document.querySelector(`#passenger-${this.id}`);

  if(this.hasTicket) {
    div.classList.add('has-ticket');
  } else {
    div.classList.remove('has-ticket');
  }
}

window.addEventListener("load", () => {
  const stationDiv = document.querySelector('#station');

  const passengers = generatePassengers();

  for(const i in passengers) {
    const passengerDiv = document.createElement('div');
    passengerDiv.id = `passenger-${passengers[i].id}`;
    passengerDiv.classList.add('passenger');
    stationDiv.append(passengerDiv);

    passengers[i].setHasTicket(Math.random() > hasTicketChance);
  }
});
