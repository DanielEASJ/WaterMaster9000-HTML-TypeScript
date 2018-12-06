import axios from 'axios';
import { Sensors } from './sensors';
import { NewSensor } from './sensors-new';
import { Login } from './login';

let url = window.location.pathname;
let filename = url.substring(url.lastIndexOf('/') + 1);

let loginTest = new Login();

if (loginTest.IsLoggedIn() == true)
{
    if (filename == "login.htm" && loginTest.IsLoggedIn() == true)
    {
        window.location.href = "index.htm";
    }

    if (filename == "sensors.htm")
    {
        let stats = new Sensors();
        stats.GetByUser();
    }

    if (filename == "sensors-new.htm")
    {
        new NewSensor();
    }
}
else
{
    if (filename != "login.htm" && loginTest.IsLoggedIn() == false)
    {
        window.location.href = "login.htm";
    }
}