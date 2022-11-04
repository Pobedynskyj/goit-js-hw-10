import "./css/styles.css";
import { fetchCountries } from "./fetchCountries";
import Notiflix from "notiflix";

const inputEl = document.querySelector(`#search-box`);
const ulEl = document.querySelector(`.country-list`);
const divEl = document.querySelector(`.country-info`);
const debounce = require("lodash.debounce");

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener("input", debounce(inputValue, DEBOUNCE_DELAY));
