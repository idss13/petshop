import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true, //campo obrigatorio
        trim: true, //remover os espaços do começo e fim 
        index: {
            unique: true,
        }, //chave unica para não ter mais de um cadastro igual no banco 
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },

    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }],

    active: {
        type: Boolean,
        required: true,
        default: true, //propriedade para definir um valor "padrão"
    },
});