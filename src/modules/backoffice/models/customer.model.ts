import { Address } from './address.model';
import { CreditCard } from './credit-card.model';
import { Pet } from './pet.model';
import { User } from './user.model';

export class Customer {
    constructor(
        public name: string,
        public document: string,
        public email: string,
        public pets: Pet[],
        public billingAddress: Address, //endereço de cobrança do cliente
        public shippingAddress: Address, //enderço para envio do cliente
        public creditCard: CreditCard,
        public user: User,
    ) {

    }

}