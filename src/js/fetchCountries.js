import countryTpl from '../tpl/countryTpl.hbs';
import countryListTpl from '../tpl/countryListTpl.hbs';
import '@pnotify/bootstrap4/dist/PNotifyBootstrap4.css';
import { defaultModules } from '@pnotify/core';
import { alert, notice, info, success, error } from '@pnotify/core';
import * as PNotifyBootstrap4 from '@pnotify/bootstrap4';
defaultModules.set(PNotifyBootstrap4, {});
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
        alert({
          text: 'Too many matches found. Please enter a more specific query!',
          type: 'info',
        });
      } else {
        document.querySelector('.container').innerHTML = '';
        alert({
          text: 'Введены некорректные данные',
          type: 'info',
        });
      }
    });
};

inputNode.addEventListener('input', _.debounce(findCounry, 700));
