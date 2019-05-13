import axios from "axios";

export async function fetchRates(currency = 'EUR', period) {
  
  const date = new Date();
  const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  date.setDate(date.getDate() - period);
  const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  
  try {
    const { data } = await axios.get(`https://api.exchangeratesapi.io/history?start_at=${formattedDate}&end_at=${today}&base=${currency}`);
    
    return await data;
   
  } catch (e) {
    throw e;
  }
}
