import axios from 'axios';
import { Sensors } from './sensors';
import { NewSensor } from './sensors-new';

let url = window.location.pathname;
let filename = url.substring(url.lastIndexOf('/') + 1);

if (filename == "sensors.htm")
{
    let stats = new Sensors();
    stats.GetByUser();
}

if (filename == "sensors-new.htm")
{
    new NewSensor();
}