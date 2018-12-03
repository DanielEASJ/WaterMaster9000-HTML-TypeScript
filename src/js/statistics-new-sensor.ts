import axios from 'axios';
import { Alert } from './alert';

export class NewSensor
{
    private inputMA : HTMLInputElement;
    private inputName : HTMLInputElement;
    private inputLL : HTMLInputElement;
    private inputUL : HTMLInputElement;
    private inputUID : HTMLInputElement;

    private BASEURI: string = "https://watermasterapi.azurewebsites.net/api/sensor/";

    constructor()
    {
        let btn = document.getElementById("newSensorBtn") as HTMLButtonElement;
        btn.addEventListener("click", this.PostNewSensor);

        this.inputMA = document.getElementById("newMacAddress") as HTMLInputElement;
        this.inputName = document.getElementById("newName") as HTMLInputElement;
        this.inputLL = document.getElementById("newLowerLimit") as HTMLInputElement;
        this.inputUL = document.getElementById("newUpperLimit") as HTMLInputElement;
        this.inputUID = document.getElementById("newUserId") as HTMLInputElement;
    }

    PostNewSensor()
    {
        if (this.ValidateFields)
        {
            console.log("ss");
        }

        axios.post(this.BASEURI,
        {
            macAddress: this.inputMA.value,
            name: this.inputName.value,
            limitUp: this.inputUL.value,
            limitLow: this.inputLL.value,
            fK_UserId: this.inputUID.value,
            data: null
        })
        .then(function(response)
        {
            if (response.status == 200)
            {
                window.location.href = "statistics.htm";
            }
        });
    }

    private ValidateFields(): boolean
    {
        let validation: boolean = true;

        // let content = document.getElementById("content") as HTMLDivElement;

        // if (this.inputMA.value.length != 17)
        // {
        //     validation = false;
        //     content.appendChild(new Alert("Feltet \"MAC-Adresse\" indeholder et ugyldigt format!").MakeAlert());
        // }

        // if (this.inputName.value == "")
        // {
        //     validation = false;
        //     content.appendChild(new Alert("Feltet \"Navn\" må IKKE være tomt!").MakeAlert());
        // }

        // if (this.inputLL.value != "" && this.inputLL.value.match("^[0-9]*$"))
        // {
        //     if (Number(this.inputLL.value) < 0
        //     && Number(this.inputLL.value) > 100)
        //     {
        //         validation = false;
        //         content.appendChild(new Alert("Feltet \"Nedre grænse\" SKAL være mellem 0-100!").MakeAlert());
        //     }
        // }
        // else
        // {
        //     validation = false;
        //     content.appendChild(new Alert("Feltet \"Nedre grænse\" må IKKE være tomt, og må KUN indeholde tal!").MakeAlert());
        // }

        return validation;
    }
}