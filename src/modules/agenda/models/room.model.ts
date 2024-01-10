import { AggregateRoot } from "@nestjs/cqrs";
import { RoomBookedEvent } from "src/modules/agenda/events/room-booked.event";


export class Room extends AggregateRoot{
    constructor (
        private readonly id: string
    ){
        super();
    }

    //Método para reservas de clientes em uma sala
    book(customerId: string, date: Date) {
        //Regras de negocio ...
        this.apply(new RoomBookedEvent(customerId, this.id));
    }
}