import {Passenger} from "./js/Passenger.js";
import {Station} from "./js/Station.js";
import {BusLine} from "./js/BusLine.js";

window.addEventListener("load", () => {
  function generatePassengers(num = 50) {
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
    const div = document.querySelector(`#passenger-${e.passenger.id}`);
    stationDiv.append(div);
  }

  function onStationRemovePassenger() {
    //nothing to do here cause onBusLineAddPassenger steals the div
  }

  function onBusLineAddPassenger(e) {
    const div = document.querySelector(`#passenger-${e.passenger.id}`);
    busLineDiv.append(div);
  }

  function onBusLineRemovePassenger(e) {
    const div = document.querySelector(`#passenger-${e.passenger.id}`);
    div.remove();
  }

  function onBusArrive() {
    const div = document.createElement('div');
    div.textContent = 'BUS';
    div.classList.add('bus');
    busLineDiv.append(div);
  }

  function onBusDepart() {
    const div = document.querySelector('.bus');
    div.remove();
    busLine.open(timeToBusMs);
    addPassengersToBusLine();
  }

  function addPassengersToBusLine() {
    //is the line full?
    let spots = busLine.getNumEmptySpots();

    if(spots <= 0) {
      return;
    }

    const passengersToRemove = [];

    //add passengers one by one until no more spots in bus line
    for(const i in station.passengers) {
      if(station.passengers[i].hasTicket) {
        busLine.enqueue(station.passengers[i]);
        passengersToRemove.push(station.passengers[i]);
        spots--;

        if(spots <= 0) {
          break;
        }
      }
    }

    //remove the added passengers from the station
    for(const p of passengersToRemove) {
      station.removePassenger(p);
    }
  }

  const hasTicketChance = 0.8;
  const timeToBusMs = 3000;

  //init station
  const stationDiv = document.querySelector('#station');
  const station = new Station();
  station.addEventListener('add_passenger', onStationAddPassenger);
  station.addEventListener('remove_passenger', onStationRemovePassenger);

  //init bus line
  const busLineDiv = document.querySelector('#bus-line');
  const busLine = new BusLine(2);
  busLine.addEventListener('add_passenger', onBusLineAddPassenger);
  busLine.addEventListener('remove_passenger', onBusLineRemovePassenger);
  busLine.addEventListener('bus_arrive', onBusArrive);
  busLine.addEventListener('bus_depart', onBusDepart);

  //generate the passengers
  const passengers = generatePassengers();

  //create the divs for them
  for(const i in passengers) {
    const passengerDiv = document.createElement('div');
    passengerDiv.textContent = passengers[i].id;
    passengerDiv.id = `passenger-${passengers[i].id}`;
    passengerDiv.classList.add('passenger');
    //insert to body cause it doesn't belong anyhere specific yet
    document.querySelector('body').append(passengerDiv);

    station.addPassenger(passengers[i]);

    //add the initial ticket state here cause of div/hasTicket event race condition??
    passengers[i].setHasTicket(Math.random() > hasTicketChance);
  }

  //initialize the bus line "event loop"
  busLine.open(timeToBusMs);
  addPassengersToBusLine();
});
