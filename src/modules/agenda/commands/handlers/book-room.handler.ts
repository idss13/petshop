import { HttpException, HttpStatus } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RoomRepository } from "../../repositories/room.repository";
import { BookRoomCommand } from "../book-room.command";

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand>{
    constructor(
        private readonly roomRepository: RoomRepository,
    ){ }
    
    async execute(command: BookRoomCommand): Promise<any> {
        const sala = await this.roomRepository
        .checkAvailability(
            command.roomId, 
            command.date
        );

        if(sala){
            sala.book(command.customerId, command.date);
            await this.roomRepository.book(sala);
            return;
        }

        throw new HttpException('Sala não disponível', HttpStatus.BAD_REQUEST);
    }
}