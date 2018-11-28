import axios from 'axios';

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

export class Statistics
{
    private BASEURI: string = "https://watermasterapi.azurewebsites.net/api/sensor/00:20:18:61:f1:8a";

    constructor()
    {
    }

    async ApiCall()
    {
        let temp;

        await axios.get(this.BASEURI)
        .then(function(response)
        {
            temp = response.data as Sensor;
        });

        this.SetUpHTML(temp);
    }

    SetUpHTML(sensor: any): void
    {
        let mainDiv: HTMLDivElement = <HTMLDivElement> document.getElementById("statistics");

        let accordion: HTMLDivElement = document.createElement("div");
        accordion.setAttribute("class", "accordion");
        accordion.setAttribute("id", "accordion");

        for (let i = 0; i < 1; i++)
        {
            let card: HTMLDivElement = document.createElement("div");
            card.setAttribute("class", "card");

            let cardHeader: HTMLDivElement = document.createElement("div");
            cardHeader.setAttribute("class", "card-header");
            cardHeader.setAttribute("id", "heading" + i.toString());

            let mb0: HTMLHeadingElement = document.createElement("h5");
            mb0.setAttribute("class", "mb-0");

            let btn: HTMLButtonElement = document.createElement("button");
            btn.setAttribute("class", "btn btn-link");
            btn.setAttribute("type", "button");
            btn.setAttribute("data-toggle", "collapse");
            btn.setAttribute("data-target", "#collapse" + i.toString());
            btn.setAttribute("aria-expanded", "true");
            btn.setAttribute("aria-controls", "collapse" + i.toString());

            let collapse: HTMLDivElement = document.createElement("div");
            collapse.setAttribute("class", "collapse");
            collapse.setAttribute("id", "collapse" + i.toString());
            collapse.setAttribute("aria-labelledby", "heading" + i.toString());
            collapse.setAttribute("data-parent", "#accordion");

            let cardBody: HTMLDivElement = document.createElement("div");
            cardBody.setAttribute("class", "card-body");

            mainDiv.appendChild(accordion);
            accordion.appendChild(card);
            card.appendChild(cardHeader);
            cardHeader.appendChild(mb0);
            mb0.appendChild(btn);
            accordion.appendChild(collapse);
            collapse.appendChild(cardBody);

            btn.innerText = "#" + (i + 1).toString() + " Sensor";
            cardBody.appendChild(document.createElement("p")).innerText = "Navn: " + sensor.name;
            cardBody.appendChild(document.createElement("p")).innerText = "Fugtighed: " + sensor.data.humidity;
            cardBody.appendChild(document.createElement("p")).innerText = "Tidspunkt: " + sensor.data.date;
            cardBody.appendChild(document.createElement("p")).innerText = "MAC-Address: " + sensor.macAddress;
        }
    }
}