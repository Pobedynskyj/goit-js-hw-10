import "./css/styles.css";
import { fetchCountries } from "./fetchCountries";
import { Notify } from "notiflix";

const inputEl = document.querySelector(`#search-box`);
const ulEl = document.querySelector(`.country-list`);
const divEl = document.querySelector(`.country-info`);
const debounce = require("lodash.debounce");

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener("input", debounce(inputValue, DEBOUNCE_DELAY));

function inputValue(event) {
  ulEl.innerHTML = "";
  divEl.innerHTML = "";
  let valuesInput = event.target.value.trim();
  if (!valuesInput) {
    return;
  }
  fetchCountries(valuesInput)
    .then((json) => {
      markup = "";

      if (json.length > 10) {
        return Notify.info(
          "Too many matches found. Please enter a more specific name."
        );
      }
      if (json.length >= 2 && json.length <= 10) {
        markup = "";
        json.map((element) => {
          markup += `<li class="item">
                <img src="${element.flags.svg}" alt="${element.name.official}" width="50px" height="30px"/>
                <h2 class="text">${element.name.common}</h2>
              </li> `;
          ulEl.innerHTML = markup;
        });
      }
      if (json.length === 1) {
        markup = "";
        json.map((element) => {
          let languages = Object.values(element.languages).join(", ");
          markup = `<h2><span class="flag"><img src="${element.flags.svg}" alt="${element.name.official}" width="50px" height="30px"></span>${element.name.common}</h2>
                <p><span class="big">Capital:</span>${element.capital[0]}</p>
                <p><span class="big">Population:</span>${element.population}</p>
                <p><span class="big">Languages:</span>${languages}</p>`;
          divEl.innerHTML = markup;
        });
      }
    })
    .catch((error) => {
      return Notify.failure("Oops, there is no country with that name");
    });
}
