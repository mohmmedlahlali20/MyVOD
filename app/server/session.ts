import path from "../axios/path";




const getSessionsForMovie = async (movieId:string)=>{
   const response = await path.get(`seance/getseance/${movieId}`);

   return response.data.getSeanceByFilmId || []
}




export {getSessionsForMovie};