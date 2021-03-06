import axios from 'axios';
import { Tables } from './tables';
import { DateFormat } from './dateFormat';
import { Config } from './config';

// represents Raspberry Pi's
interface Sensor
{
    macAddress: string,
    name: string,
    limitUp: number,
    limitLow: number,
    fK_UserId: number,
    data: SensorData // data from SensorData interface
}

// represents data from Raspberry Pi
interface SensorData
{
    id: number,
    humidity: number,
    date: Date,
    fK_MacAddress: string
}

export class Sensors extends Config
{
    private userid: number = 1;
    private sensorID: number = 1;
    private dateFormatter: DateFormat = new DateFormat();
    
    private mainDiv: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
    private accordion: HTMLDivElement = document.createElement("div");

    constructor()
    {
        super();
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

        this.userid = Number(document.cookie.toString().substr(7, document.cookie.toString().length));

        await axios.get(this.BASEURI + "sensor/userid/" + this.userid)
        .then(function(response)
        {
            userSensors = response.data;
        });
        
        for (let index = 0; index < userSensors.length; index++) {

            let sensor: Sensor;

            await axios.get(this.BASEURI + "sensor/mac/" + userSensors[index])
            .then(function(response)
            {
                console.log(response.data);
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
        let BASEURI = this.BASEURI;
        let id: number = this.sensorID;

        // case
        let card = document.createElement("div") as HTMLDivElement;
        card.setAttribute("class", "card");

        let cardHeader = document.createElement("div") as HTMLDivElement;
        cardHeader.setAttribute("class", "card-header");
        cardHeader.setAttribute("id", "heading" + this.sensorID.toString());

        let statusIcon = document.createElement("i") as HTMLElement;
        statusIcon.setAttribute("tabindex", "0");
        statusIcon.setAttribute("data-toggle", "tooltip");
        statusIcon.setAttribute("data-placement", "left");
        
        if (sensor.data != null)
        {
            if (this.dateFormatter.timeDifference(sensor.data.date) < 10)
            {
                statusIcon.setAttribute("class", "fas fa-check text-success float-right");
                statusIcon.setAttribute("title", "Sensoren fungerer som den skal.");
                
            }
            else if (this.dateFormatter.timeDifference(sensor.data.date) > 10 && this.dateFormatter.timeDifference(sensor.data.date) < 20)
            {
                statusIcon.setAttribute("class", "fas fa-exclamation text-warning float-right");
                statusIcon.setAttribute("title", "Sensoren har sprunget den seneste måling over!");
            }
            else
            {
                statusIcon.setAttribute("class", "fas fa-skull-crossbones text-danger float-right");
                statusIcon.setAttribute("title", "Sensoren måler ikke længere..!");
            }
        }
        else
        {
            statusIcon.setAttribute("class", "fas fa-exclamation text-warning float-right");
            statusIcon.setAttribute("title", "Sensoren har ikke foretaget sin første måling endnu.");
        }

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
            spanhumidity.innerText = sensor.data.humidity + "%";
            spandate.innerText = this.dateFormatter.formatDate(sensor.data.date);
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
        updBtn.setAttribute("class", "btn btn-lg btn-primary");
        updBtn.innerText = "Gem Data";
        updBtn.onclick = function() {
            console.log();
            let nameInput = document.getElementById("rowNameInput" + id.toString()) as HTMLInputElement;
            let lowerLimitInput = document.getElementById("rowLowerInput" + id.toString()) as HTMLInputElement;
            let upperLimitInput = document.getElementById("rowUpperInput" + id.toString()) as HTMLInputElement;

            axios.put(BASEURI + "sensor/", {
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