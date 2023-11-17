import {Schema, model, models} from 'mongoose';

const duckSchema = new Schema({
    category: String,
    img: String,
    name: String,
    date: String,
    infoLink: String
})

const Duck = models.Duck || model('Duck', duckSchema)

export default Duck