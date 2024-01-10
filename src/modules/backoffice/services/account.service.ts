import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { Md5 } from 'md5-typescript';



@Injectable()
export class AccountService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,

        @InjectModel('Customer')
        private readonly customerModel: Model<Customer>
    ) {
    }

    async cadastrarUsuario(data: User): Promise<User> {
        const user = new this.userModel(data);
        return await user.save();
    }

    async atualizarUsuario(username: string, data: any): Promise<User> {
        return await this.userModel.findOneAndUpdate({ username }, data);
    }

    async autenticarUsuario(username, password): Promise<Customer> {
        var buscaCustomer = await this.customerModel
            .findOne({ document: username })
            .populate('user')
            .exec();
        /**
         * Concatenar a senha criptografada com uma senha padrão SALT_KEY definida no banco de dados:
         * `${password}${process.env.SALT_KEY}`
         */
        const comparaSenha = await Md5.init(`${password}`);
        if (comparaSenha.toString() == buscaCustomer.user.password.toString()) {
            return buscaCustomer;
        }
        else {
            return null;
        }

    }
}