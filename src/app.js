import { warning } from './utils/pnotify';

import { fetchCountries, baseUrl, options } from './api/fetchCountries';
import { refs } from './utils/refs';
import debounce from 'lodash.debounce';
import template from './templates/country-items.hbs';

function findUniqueCountry(data) {
  if (data.length > 10) {
    warning();
    refs.countryList.innerHTML = '';
    refs.countryItem.innerHTML = '';
  } else if (data.length >= 2 && data.length <= 10) {
    const htmlMarkup = data
      .map(e => `<li class="country-item country-list">${e.name}</li>`)
      .join('\n');
    refs.countryList.innerHTML = htmlMarkup;
    refs.countryItem.innerHTML = '';
  } else if (data.length === 1) {
    const [country] = data;
    refs.countryItem.innerHTML = template(country);
    refs.countryList.innerHTML = '';
  } 
  return data;
}

function resultSearchCountry(event) {
  event.preventDefault();

  let inputValue = 'name/' + event.target.value.toLowerCase();
  if (inputValue === 'name/') {
    inputValue = '';
  }

  fetchCountries(baseUrl + inputValue, options).then(findUniqueCountry);
}

refs.searchInput.addEventListener('input', debounce(resultSearchCountry, 500));
