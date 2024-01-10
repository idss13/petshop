import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { AgendaController } from './controllers/agenda.controller';
import { EventHandlers } from './events/handlers';
import { RoomRepository } from './repositories/room.repository';
import { RoomBookService } from './services/room-book.service';

@Module({
    imports: [CqrsModule],
    controllers: [AgendaController],
    providers: [
        RoomBookService,
        RoomRepository,
        ...CommandHandlers, //Maneira de importar de uma variavel dentro de um array
        ...EventHandlers
    ],
})
export class AgendaModule {}
