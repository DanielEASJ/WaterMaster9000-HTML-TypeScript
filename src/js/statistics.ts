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
            // case
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


            //table
            //table create
            let table: HTMLTableElement = document.createElement("table");
            table.setAttribute("class", "table table-striped");

            //table collums
            let tabaleThead: HTMLTableSectionElement = document.createElement("thead"); // thead requered for bootstrap

            let tablecolumnRow: HTMLTableRowElement = document.createElement("tr"); //row til columns

            let tablecolumn0: HTMLTableHeaderCellElement = document.createElement("th") // paragraph column
            tablecolumn0.innerHTML = "Titler"
            
            let tablecolumn1: HTMLTableHeaderCellElement = document.createElement("th") // input column
            tablecolumn1.innerHTML = "Input"


            // table tbody (used by bootstrap)
            let tabletbody: HTMLTableSectionElement = document.createElement("tbody");

            // table row
            let tableRow0 : HTMLTableRowElement = document.createElement("tr");
            tableRow0.setAttribute("id", "row0"); 
            
            let tableRow1 : HTMLTableRowElement = document.createElement("tr");
            tableRow1.setAttribute("id", "row1"); 

            let tableRow2 : HTMLTableRowElement = document.createElement("tr");
            tableRow2.setAttribute("id", "row2"); 


            // table name
            let tableRowName : HTMLTableDataCellElement = document.createElement("td")
            tableRowName.setAttribute("id", "rowName" + i.toString());
            tableRowName.innerHTML = "Sensor navn: "

            let tableRowNameTd: HTMLTableDataCellElement = document.createElement("td");

            // input name
            let tableRowNameInput : HTMLInputElement = document.createElement("input");
            tableRowNameInput.setAttribute("id", "rowNameInput");
            tableRowNameInput.setAttribute("placeholder", "indtast navn her");

            // table lower
            let tableRowLower : HTMLTableDataCellElement = document.createElement("td");
            tableRowLower.setAttribute("id", "rowLower" + i.toString());
            tableRowLower.innerHTML = "laveste grænse: "

            let tableRowLowerTd: HTMLTableDataCellElement = document.createElement("td");

            // input lower
            let tableRowLowerInput : HTMLInputElement = document.createElement("input");
            tableRowLowerInput.setAttribute("id", "rowLowerInput");
            tableRowLowerInput.setAttribute("placeholder", "indtast laveste grænse her");

            // table upper
            let tableRowUpper : HTMLTableDataCellElement = document.createElement("td");
            tableRowUpper.setAttribute("id", "rowUpper" + i.toString());
            tableRowUpper.innerHTML = "normal grænse: "

            let tableRowUpperTd: HTMLTableDataCellElement = document.createElement("td");

            // input Upper
            let tableRowUpperInput : HTMLInputElement = document.createElement("input");
            tableRowUpperInput.setAttribute("id", "rowUpperInput");
            tableRowUpperInput.setAttribute("placeholder", "indtast normal grænse her");
            

            //appendChild
            mainDiv.appendChild(accordion);
            accordion.appendChild(card);
            card.appendChild(cardHeader);
            cardHeader.appendChild(mb0);
            mb0.appendChild(btn);
            accordion.appendChild(collapse);
            collapse.appendChild(cardBody);

            // table append
            collapse.appendChild(table);

            table.appendChild(tabaleThead);
            tabaleThead.appendChild(tablecolumnRow);
            tablecolumnRow.appendChild(tablecolumn0);
            tablecolumnRow.appendChild(tablecolumn1);

            table.appendChild(tabletbody);

            tabletbody.appendChild(tableRow0);

            tableRow0.appendChild(tableRowName);
            tableRow0.appendChild(tableRowNameTd);
            tableRowNameTd.appendChild(tableRowNameInput);

            tabletbody.appendChild(tableRow1);

            tableRow1.appendChild(tableRowLower);
            tableRow1.appendChild(tableRowLowerTd);
            tableRowLowerTd.appendChild(tableRowLowerInput);

            tabletbody.appendChild(tableRow2);

            tableRow2.appendChild(tableRowUpper);
            tableRow2.appendChild(tableRowUpperTd);
            tableRowUpperTd.appendChild(tableRowUpperInput)

            // button text
            btn.innerText = "#" + (i + 1).toString() + " Sensor";


            // fyld text til body
            cardBody.appendChild(document.createElement("p")).innerText = "Navn: " + sensor.name;
            cardBody.appendChild(document.createElement("p")).innerText = "Fugtighed: " + sensor.data.humidity;
            cardBody.appendChild(document.createElement("p")).innerText = "Tidspunkt: " + sensor.data.date;
            cardBody.appendChild(document.createElement("p")).innerText = "MAC-Address: " + sensor.macAddress;

        }
    }
}