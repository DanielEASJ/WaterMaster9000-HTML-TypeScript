import axios from 'axios';

let outputDiv : HTMLDivElement;

outputDiv = <HTMLDivElement> document.getElementById("outputDiv");

outputDiv.addEventListener("load", getData);

function getData()
{
    let temp : string = "";

    axios.get(this.URI,)
    
.then(function (response)
{

    temp = response.data.words[0];
    console.log(response.data.words[0]);
    

})

.catch(function (error) {
console.log(error);
});
return temp

}