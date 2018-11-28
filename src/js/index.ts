import axios from 'axios';
import { Statistics } from './statistics';

let stats = new Statistics();
stats.ApiCall();

let URI = "https://restcoinservice-mandatoryassignment02.azurewebsites.net/api/" //update
let outputDiv : HTMLDivElement;

outputDiv = <HTMLDivElement> document.getElementById("outputDiv");

// outputDiv.addEventListener("loadend", getData);
 getData();

function getData()
{
    let temp : string = "";

    axios.get(URI + "/bids") //update 

.then(function (response)
{
    // response.data.forEach(i => {
    //     outputDiv.innerHTML = i.navn;
    // });
    // temp = response.data.navn; //ændret til navn, burde være noget ala moisture
    // console.log(response.data.navn); //ændret til navn, burde være noget ala moisture
    //outputDiv.innerHTML = temp

})

.catch(function (error) {
console.log(error);
});
return temp

}