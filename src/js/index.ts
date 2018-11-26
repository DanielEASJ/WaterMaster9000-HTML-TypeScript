import axios from 'axios';

let URI = "https://restcoinservice-mandatoryassignment02.azurewebsites.net/api/"
let outputDiv : HTMLDivElement;

outputDiv = <HTMLDivElement> document.getElementById("outputDiv");

// outputDiv.addEventListener("loadend", getData);
 getData();

function getData()
{
    let temp : string = "";

    axios.get(URI + "/bids")

.then(function (response)
{

    temp = response.data.navn; //ændret til navn, burde være noget ala moisture
    console.log(response.data.navn); //ændret til navn, burde være noget ala moisture
    outputDiv.innerHTML = temp

})

.catch(function (error) {
console.log(error);
});
return temp

}