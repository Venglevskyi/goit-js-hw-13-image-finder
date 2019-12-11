const baseUrl = 'https://restcountries.eu/rest/v2/';
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const fetchCountries = url =>
  fetch(url)
    .then(data => data.json())
    .catch(err => console.warn(err));

export { fetchCountries, baseUrl, options };
