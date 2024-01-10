import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Pedido } from "./pedido.entidade";
import { Produtos } from "./produto.entidade";


@Entity()
export class ItemPedido{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Pedido, (p) => p.itens)
    pedido: Pedido;

    @ManyToOne(() => Produtos, (p) => p)
    produto: Produtos;

    @Column('decimal')
    preco: number;

    @Column('decimal')
    quantidade: number;

   
}


