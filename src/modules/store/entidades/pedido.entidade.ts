import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ItemPedido } from "./item-pedido.entidade";


@Entity()
export class Pedido{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 8})
    numero: string;

    @Column('datetime')
    date: Date;

    @Column({length: 11})
    cliente: string;
    
   @OneToMany(() => ItemPedido, (ip) => ip.pedido)
    itens: ItemPedido[];
}


