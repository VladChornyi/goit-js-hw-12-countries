import countryTpl from '../tpl/countryTpl.hbs';

const inputNode = document.querySelector('.input');
inputNode.addEventListener('input', e => {
  fetch(`https://restcountries.eu/rest/v2/name/${e.target.value}`)
    .then(response => {
      return response.json();
    })
    .then(country => {
      console.log(country);
      const markup = countryTpl(country);
      console.log(markup);
      document.querySelector('.container').innerHTML = markup;
    });
});
