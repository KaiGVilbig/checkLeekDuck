// src/duckModel.ts
import { Schema, model, models, Document, Model, Types } from 'mongoose';
import DuckInt from './duckInferface';

export interface IDuck extends Document {
    category: string;
    img: string;
    name: string;
    date: string;
    infoLink: string;
}

const duckSchema = new Schema<IDuck>({
    category: { type: String, required: true },
    img: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: String, required: true },
    infoLink: { type: String, required: true },
});

const Duck: Model<IDuck> = models.Duck || model<IDuck>('Duck', duckSchema);

export default Duck;

