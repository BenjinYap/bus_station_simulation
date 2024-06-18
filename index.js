import {Passenger} from "./js/Passenger.js";
import {Station} from "./js/Station.js";

window.addEventListener("load", () => {
  const hasTicketChance = 0.5;

  const stationDiv = document.querySelector('#station');
  const station = new Station();
  station.addEventListener('add_passenger', onStationAddPassenger);
  station.addEventListener('remove_passenger', onStationRemovePassenger);

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

  function onStationAddPassenger(e) {
    const passengerDiv = document.createElement('div');
    passengerDiv.id = `passenger-${e.passenger.id}`;
    passengerDiv.classList.add('passenger');
    stationDiv.append(passengerDiv);
  }

  function onStationRemovePassenger() {

  }

  //generate the passengers
  const passengers = generatePassengers();

  //create the divs for them
  for(const i in passengers) {
    station.addPassenger(passengers[i]);

    //add the initial ticket state here cause of div/hasTicket event race condition??
    passengers[i].setHasTicket(Math.random() > hasTicketChance);
  }
});
