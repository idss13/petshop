import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Produtos{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 80})
    titulo: string;

    @Column('text')
    descricao: string;

    @Column('decimal')
    preco: number;

    @Column('decimal')
    quantidadeDisponivel: number;
}


