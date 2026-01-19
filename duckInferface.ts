// src/duckInterface.ts
export default interface DuckInt {
    _id: string | undefined; // optional at runtime, TS allows undefined
    category: string;
    img: string;
    name: string;
    date: string;
    infoLink: string;
}

