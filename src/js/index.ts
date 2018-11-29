import axios from 'axios';
import { Statistics } from './statistics';

let stats = new Statistics();

let URI = "https://watermasterapi.azurewebsites.net/api/"
let outputDiv : HTMLDivElement;

outputDiv = <HTMLDivElement> document.getElementById("outputDiv");

// outputDiv.addEventListener("loadend", getData);
 getData();

function getData()
{
    let temp : string = "";

    axios.get(URI + "sensor/") 

.then(function (response)
{
    // response.data.forEach(i => {
    //     outputDiv.innerHTML = i.humidity;
    // });
    // temp = response.data.humidity;
    // console.log(response.data.humidity);
    //outputDiv.innerHTML = temp

})

.catch(function (error) {
console.log(error);
});
return temp

}