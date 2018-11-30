import axios from 'axios';

export class NewSensor
{
    constructor()
    {
        let btn = document.getElementById("newSensorBtn") as HTMLButtonElement;
        btn.addEventListener("click", this.PostNewSensor);
    }

    PostNewSensor()
    {
        let inputMA = document.getElementById("newMacAddress") as HTMLInputElement;
        let inputName = document.getElementById("newName") as HTMLInputElement;
        let inputLL = document.getElementById("newLowerLimit") as HTMLInputElement;
        let inputUL = document.getElementById("newUpperLimit") as HTMLInputElement;
        let inputUID = document.getElementById("newUserId") as HTMLInputElement;

        let BASEURI: string = "https://watermasterapi.azurewebsites.net/api/sensor/PostSensor/";

        axios.post(BASEURI, {
            macAddress: inputMA.value,
            name: inputName.value,  
            limitUp: inputUL.value,
            limitLow: inputLL.value,
            fK_UserId: inputUID.value,
            data: null
        });
    }
}