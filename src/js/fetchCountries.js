import countryTpl from '../tpl/countryTpl.hbs';
import countryListTpl from '../tpl/countryListTpl.hbs';
import { error } from '@pnotify/core';
import { info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import _ from 'lodash';

const inputNode = document.querySelector('.input');

const findCounry = function (e) {
  fetch(`https://restcountries.eu/rest/v2/name/${e.target.value}`)
    .then(response => {
      return response.json();
    })
    .then(country => {
      if (country.length === 1) {
        const markup = countryTpl(country);
        document.querySelector('.container').innerHTML = markup;
      } else if (country.length > 1 && country.length <= 10) {
        const markup = countryListTpl(country);
        document.querySelector('.container').innerHTML = markup;
      } else if (country.length > 10) {
        document.querySelector('.container').innerHTML = '';
        info({
          text: 'Too many matches found. Please enter a more specific query!',
          type: 'info',
        });
      } else {
        document.querySelector('.container').innerHTML = '';
        error({
          text: 'The request is incorrect',
          type: 'info',
        });
      }
    });
};

inputNode.addEventListener('input', _.debounce(findCounry, 700));
