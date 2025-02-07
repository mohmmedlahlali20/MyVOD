import path from "../axios/path";

export interface Reservation  {

    session:string,

    seats:number[],

    userId:string

}

const createReservarion = async (session: string, seats: number[], userId: string) => {
    console.log("Sending reservation:", { seanceId: session, reservedSeatsNumber: seats, userId });

    const response = await path.post('reservtion/reserve', { 
        seanceId: session, 
        reservedSeatsNumber: seats.length === 1 ? seats[0] : seats, 
        userId 
    });
    return response.data || [];
}


export {createReservarion};