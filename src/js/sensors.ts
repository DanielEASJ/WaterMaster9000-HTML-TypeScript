import axios from 'axios';
import { Tables } from './tables';

interface Sensor
{
    macAddress: string,
    name: string,
    limitUp: number,
    limitLow: number,
    fK_UserId: number,
    data: SensorData
}

interface SensorData
{
    id: number,
    humidity: number,
    date: string,
    fK_MacAddress: string
}

export class Sensors
{
    private userid: number = 1;
    private BASEURI: string = "https://watermasterapi.azurewebsites.net/api/sensor/";
    private sensorID: number = 1;
    
    private mainDiv: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
    private accordion: HTMLDivElement = document.createElement("div");


    constructor()
    {
        this.accordion.setAttribute("class", "accordion");
        this.accordion.setAttribute("id", "accordion");
    }

    async GetByUser()
    {
        this.mainDiv.appendChild(this.accordion);

        let loadingBar = document.getElementById("loadingBar");
        let percentage: number = 0;

        let tempSensorList: Array<Sensor> = new Array<Sensor>();
        let userSensors: Array<string>;

        await axios.get(this.BASEURI + "userid/" + this.userid)
        .then(function(response)
        {
            userSensors = response.data;
        });
        
        for (let index = 0; index < userSensors.length; index++) {

            let sensor: Sensor;

            await axios.get(this.BASEURI + "mac/" + userSensors[index])
            .then(function(response)
            {   
                percentage = ((index + 2) / userSensors.length) * 100;

                sensor = response.data as Sensor;
                tempSensorList.push(sensor);

                loadingBar.setAttribute("aria-valuenow", percentage.toString());
                loadingBar.setAttribute("style", "width: " + percentage.toString() + "%");
            });
        }

        this.mainDiv.removeChild(document.getElementById("loadingBarWrapper"));

        tempSensorList.forEach(element => {
            this.SetUpHTML(element);
            this.sensorID++;
        });
    }

    SetUpHTML(sensor: any): void
    {
        let id: number = this.sensorID;

        // case
        let card = document.createElement("div") as HTMLDivElement;
        card.setAttribute("class", "card");

        let cardHeader = document.createElement("div") as HTMLDivElement;
        cardHeader.setAttribute("class", "card-header");
        cardHeader.setAttribute("id", "heading" + this.sensorID.toString());

        let statusIcon = document.createElement("i") as HTMLElement;
        statusIcon.setAttribute("class", "fas fa-check text-success float-right");

        let mb0 = document.createElement("h5") as HTMLHeadingElement;
        mb0.setAttribute("class", "mb-0");

        let btn = document.createElement("button") as HTMLButtonElement;
        btn.setAttribute("class", "btn btn-link");
        btn.setAttribute("type", "button");
        btn.setAttribute("data-toggle", "collapse");
        btn.setAttribute("data-target", "#collapse" + this.sensorID.toString());
        btn.setAttribute("aria-expanded", "true");
        btn.setAttribute("aria-controls", "collapse" + this.sensorID.toString());
        btn.innerText = "#" + this.sensorID + " " + sensor.name;

        let collapse = document.createElement("div") as HTMLDivElement;
        collapse.setAttribute("class", "collapse mb-1");
        collapse.setAttribute("id", "collapse" + this.sensorID.toString());
        collapse.setAttribute("aria-labelledby", "heading" + this.sensorID.toString());
        collapse.setAttribute("data-parent", "#accordion");

        let cardBody = document.createElement("div") as HTMLDivElement;
        cardBody.setAttribute("class", "card-body");

        // Append all created elements into the accordion division.
        this.accordion.appendChild(card);
        card.appendChild(cardHeader);
        cardHeader.appendChild(mb0);
        mb0.appendChild(btn);
        mb0.appendChild(statusIcon);
        this.accordion.appendChild(collapse);
        collapse.appendChild(cardBody);

        // Create and append paragraph/span elements to show/hold the API data.
        let pname = cardBody.appendChild(document.createElement("p")) as HTMLParagraphElement;
        pname.innerText = "Navn: ";
        let spanname = pname.appendChild(document.createElement("span"));
        spanname.innerText = sensor.name;

        cardBody.appendChild(document.createElement("p")).innerText = "MAC-Address: " + sensor.macAddress;
        cardBody.appendChild(document.createElement("hr"));
        
        let phumidity = cardBody.appendChild(document.createElement("p"));
        phumidity.innerText = "Fugtighed: ";
        let spanhumidity = phumidity.appendChild(document.createElement("span"));

        let pdate = cardBody.appendChild(document.createElement("p"));
        pdate.innerText = "Tidspunkt: ";
        let spandate = pdate.appendChild(document.createElement("span"));

        if (sensor.data != null)
        {
            var msec = Date.parse(sensor.data.date);
            var d = new Date(msec);
            var formatted = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + " " +
                            d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            
            spanhumidity.innerText = sensor.data.humidity + "%";
            spandate.innerText = formatted;
        }
        else
        {
            spanhumidity.innerText = "..";
            spandate.innerText = "..";
        }

        let plimitlow = cardBody.appendChild(document.createElement("p")) as HTMLParagraphElement;
        plimitlow.innerText = "Nedre fugtigheds-grænse: ";
        let spanlimitlow = plimitlow.appendChild(document.createElement("span"));
        spanlimitlow.innerText = sensor.limitLow.toString() + "%";

        let plimitup = cardBody.appendChild(document.createElement("p")) as HTMLParagraphElement;
        plimitup.innerText = "Øvre fugtigheds-grænse: ";
        let spanlimitup = plimitup.appendChild(document.createElement("span"));
        spanlimitup.innerText = sensor.limitUp.toString() + "%";

        cardBody.appendChild(new Tables(2, 3).makeTable(sensor, this.sensorID));

        let updBtn = cardBody.appendChild(document.createElement("button"));
        updBtn.setAttribute("value", this.sensorID.toString());
        updBtn.setAttribute("class", "btn btn-lg btn-primary col-2");
        updBtn.innerText = "Gem Data";
        updBtn.onclick = function() {
            
            let nameInput = document.getElementById("rowNameInput" + id.toString()) as HTMLInputElement;
            let lowerLimitInput = document.getElementById("rowLowerInput" + id.toString()) as HTMLInputElement;
            let upperLimitInput = document.getElementById("rowUpperInput" + id.toString()) as HTMLInputElement;

            axios.put("https://watermasterapi.azurewebsites.net/api/sensor/", {
                macAddress: sensor.macAddress,
                name: nameInput.value,
                limitUp: Number(upperLimitInput.value),
                limitLow: Number(lowerLimitInput.value),
                fK_UserId: sensor.fK_UserId
            })
            .then(function(response)
            {
                if (response.status == 200)
                {
                    btn.innerText = "#" + id.toString() + " " + nameInput.value;
                    spanname.innerText = nameInput.value;
                    spanlimitup.innerText = upperLimitInput.value + "%";
                    spanlimitlow.innerText = lowerLimitInput.value + "%";
                }
            });
        };
    }
}