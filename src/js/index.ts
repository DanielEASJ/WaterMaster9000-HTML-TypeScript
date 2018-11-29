import axios from 'axios';
import { Statistics } from './statistics';
import { Tables } from './tables';

let stats = new Statistics();
stats.ApiCall();

let table = new Tables(3, 5);

document.getElementById("main").appendChild(table.makeTable());