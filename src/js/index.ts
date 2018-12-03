import axios from 'axios';
import { Statistics } from './statistics';
import { NewSensor } from './statistics-new-sensor';

let url = window.location.pathname;
let filename = url.substring(url.lastIndexOf('/') + 1);

if (filename == "statistics.htm")
{
    let stats = new Statistics();
    stats.GetByUser();
}

if (filename == "statistics-new-sensor.htm")
{
    new NewSensor();
}