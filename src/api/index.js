export default class ApiService {
  _proxy = 'https://cors-anywhere.herokuapp.com/';
  _apiBaseUrl = 'https://api.exchangeratesapi.io/';

  static getTodayDate() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  static getHistoryDate(period) {
    const date = new Date();
    date.setDate(date.getDate() - period);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  fetchRates = async (currency = 'EUR', period) => {
    const query = `start_at=${ApiService.getHistoryDate(period)}&end_at=${ApiService.getTodayDate()}&base=${currency}`;
    const res = await fetch(`${this._proxy}${this._apiBaseUrl}history?${query}`);

    if (!res.ok) {
      throw new Error(`Could not fetch api, received ${res.status}`);
    }
    return await res.json();
  };
}
