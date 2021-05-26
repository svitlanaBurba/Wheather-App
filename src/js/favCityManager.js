export default class FavCityManager {
  keyName = 'FavCities';

  getFavCities() {
    if (localStorage.getItem(this.keyName)) {
      return JSON.parse(localStorage.getItem(this.keyName));
    } else {
      return [];
    }
  }

  addFavCity(city) {
    let favCities = this.getFavCities();
    if (!favCities.includes(city)) {
      favCities.push(city);
      localStorage.setItem(this.keyName, JSON.stringify(favCities));
    } else {
      return;
    }
  }

  delFavCity(city) {
    let favCities = this.getFavCities();
    if (favCities.includes(city)) {
      favCities = favCities.filter(x => x !== city);
      localStorage.setItem(this.keyName, JSON.stringify(favCities));
    } else {
      return;
    }
  }

  getFirstFavCity() {
    return '';
  }

  constructor() {}
}
