import path from "../axios/path";

export interface Reservation  {
    session:string,
    seats:number,
    userId:string
}

const createReservarion =async (session:string,seats:number, userId: string)=>{

    const response = await path.post('reservation/reserve', { seanceId: session, reservedSeatsNumber: seats, userId });
    return response.data || [];
}

export {createReservarion};