import axios from 'axios';
import { Alert } from './alert';
import { Config } from './config';

export class NewSensor extends Config
{
    private userid: string = document.cookie.toString().substr(7, document.cookie.toString().length);

    constructor()
    {
        super();
        let btn = document.getElementById("newSensorBtn") as HTMLButtonElement;
        btn.addEventListener("click", this.PostNewSensor);
    }

    PostNewSensor()
    {
        let inputMA = document.getElementById("newMacAddress") as HTMLInputElement;
        let inputName = document.getElementById("newName") as HTMLInputElement;
        let inputLL = document.getElementById("newLowerLimit") as HTMLInputElement;
        let inputUL = document.getElementById("newUpperLimit") as HTMLInputElement;

        let validation: boolean = true;

        let content = document.getElementById("alerts") as HTMLDivElement;

        // Clear the alerts division, before appending new alerts, to avoid endless duplicates.
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }

        if (inputMA.value.length != 17)
        {
            validation = false;
            content.appendChild(new Alert("Feltet \"MAC-Adresse\" indeholder et ugyldigt format!").MakeAlert());
        }

        if (inputName.value == "")
        {
            validation = false;
            content.appendChild(new Alert("Feltet \"Navn\" må IKKE være tomt!").MakeAlert());
        }

        if (inputLL.value != "" && inputLL.value.match("^[0-9]*$"))
        {
            if (Number(inputLL.value) < 0
            && Number(inputLL.value) > 100)
            {
                validation = false;
                content.appendChild(new Alert("Feltet \"Nedre fugtigheds-grænse\" SKAL være mellem 0-100!").MakeAlert());
            }
        }
        else
        {
            validation = false;
            content.appendChild(new Alert("Feltet \"Nedre fugtigheds-grænse\" må IKKE være tomt, og må KUN indeholde tal!").MakeAlert());
        }

        if (inputUL.value != "" && inputUL.value.match("^[0-9]*$"))
        {
            if (Number(inputUL.value) < 0
            && Number(inputUL.value) > 100)
            {
                validation = false;
                content.appendChild(new Alert("Feltet \"Øvre fugtigheds-grænse\" SKAL være mellem 0-100!").MakeAlert());
            }
        }
        else
        {
            validation = false;
            content.appendChild(new Alert("Feltet \"Øvre fugtigheds-grænse\" må IKKE være tomt, og må KUN indeholde tal!").MakeAlert());
        }

        if (Number(inputLL.value) > Number(inputUL.value))
        {
            validation = false;
            content.appendChild(new Alert("Den \"Nedre fugtigheds-grænse\" må IKKE være større end den øvre fugtigheds-grænse!").MakeAlert());
        }

        if (Number(inputUL.value) < Number(inputLL.value))
        {
            validation = false;
            content.appendChild(new Alert("Den \"Øvre fugtigheds-grænse\" må IKKE være mindre end den nedre fugtigheds-grænse!").MakeAlert());
        }

        if (validation == true)
        {
            axios.post(this.BASEURI + "sensor/",
            {
                macAddress: inputMA.value,
                name: inputName.value,
                limitUp: inputUL.value,
                limitLow: inputLL.value,
                fK_UserId: this.userid,
                data: null
            })
            .then(function(response)
            {
                if (response.status == 200)
                {
                    window.location.href = "sensors.htm";
                }
            });
        }
    }
}