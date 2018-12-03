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

export class Statistics
{
    private userid: number = 1;
    private BASEURI: string = "https://watermasterapi.azurewebsites.net/api/sensor/";
    private sensorID: number = 1;
    
    private mainDiv: HTMLDivElement = <HTMLDivElement> document.getElementById("statistics");
    private accordion: HTMLDivElement = document.createElement("div");

    private sensorList: Array<Sensor>;

    constructor()
    {
    }

    async GetByUser()
    {
        this.accordion.setAttribute("class", "accordion");
        this.accordion.setAttribute("id", "accordion");

        this.mainDiv.appendChild(this.accordion);

        let userSensors: Array<string>;

        await axios.get(this.BASEURI + "userid/" + this.userid)
        .then(function(response)
        {
            userSensors = response.data;
        });
        
        for (let index = 0; index < userSensors.length; index++) {

            let temp: Sensor;

            await axios.get(this.BASEURI + "mac/" + userSensors[index])
            .then(function(response)
            {
                temp = response.data as Sensor;
                //this.sensorList.push(temp);
            });

            this.SetUpHTML(temp);
            this.sensorID++;
        }
    }

    SetUpHTML(sensor: any): void
    {
        // case
        let card: HTMLDivElement = document.createElement("div");
        card.setAttribute("class", "card");

        let cardHeader: HTMLDivElement = document.createElement("div");
        cardHeader.setAttribute("class", "card-header bg-primary");
        cardHeader.setAttribute("id", "heading" + this.sensorID.toString());

        let mb0: HTMLHeadingElement = document.createElement("h5");
        mb0.setAttribute("class", "mb-0");

        let btn: HTMLButtonElement = document.createElement("button");
        btn.setAttribute("class", "btn btn-link text-white");
        btn.setAttribute("type", "button");
        btn.setAttribute("data-toggle", "collapse");
        btn.setAttribute("data-target", "#collapse" + this.sensorID.toString());
        btn.setAttribute("aria-expanded", "true");
        btn.setAttribute("aria-controls", "collapse" + this.sensorID.toString());
        btn.innerText = "#" + this.sensorID + " " + sensor.name;

        let collapse: HTMLDivElement = document.createElement("div");
        collapse.setAttribute("class", "collapse mb-1");
        collapse.setAttribute("id", "collapse" + this.sensorID.toString());
        collapse.setAttribute("aria-labelledby", "heading" + this.sensorID.toString());
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

        let tablecolumn0: HTMLTableHeaderCellElement = document.createElement("th"); // paragraph column
        tablecolumn0.innerHTML = "Titler";
        
        let tablecolumn1: HTMLTableHeaderCellElement = document.createElement("th"); // input column
        tablecolumn1.innerHTML = "Input";


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
        tableRowName.setAttribute("id", "rowName" + this.sensorID.toString());
        tableRowName.innerHTML = "Navn: ";

        let tableRowNameTd: HTMLTableDataCellElement = document.createElement("td");

        // input name
        let tableRowNameInput : HTMLInputElement = document.createElement("input");
        tableRowNameInput.setAttribute("id", "rowNameInput");
        tableRowNameInput.setAttribute("class", "form-control");
        tableRowNameInput.setAttribute("placeholder", "indtast navn her");
        tableRowNameInput.value = sensor.name;

        // table lower
        let tableRowLower : HTMLTableDataCellElement = document.createElement("td");
        tableRowLower.setAttribute("id", "rowLower" + this.sensorID.toString());
        tableRowLower.innerHTML = "Nedre grænse: ";

        let tableRowLowerTd: HTMLTableDataCellElement = document.createElement("td");

        // input lower
        let tableRowLowerInput : HTMLInputElement = document.createElement("input");
        tableRowLowerInput.setAttribute("id", "rowLowerInput");
        tableRowLowerInput.setAttribute("class", "form-control");
        tableRowLowerInput.setAttribute("placeholder", "indtast laveste grænse her");
        tableRowLowerInput.value = sensor.limitLow;

        // table upper
        let tableRowUpper : HTMLTableDataCellElement = document.createElement("td");
        tableRowUpper.setAttribute("id", "rowUpper" + this.sensorID.toString());
        tableRowUpper.innerHTML = "Øvre grænse: ";

        let tableRowUpperTd: HTMLTableDataCellElement = document.createElement("td");

        // input Upper
        let tableRowUpperInput : HTMLInputElement = document.createElement("input");
        tableRowUpperInput.setAttribute("id", "rowUpperInput");
        tableRowUpperInput.setAttribute("class", "form-control");
        tableRowUpperInput.setAttribute("placeholder", "indtast øvre grænse her");
        tableRowUpperInput.value = sensor.limitUp;
        

        //appendChild
        this.accordion.appendChild(card);
        card.appendChild(cardHeader);
        cardHeader.appendChild(mb0);
        mb0.appendChild(btn);
        this.accordion.appendChild(collapse);
        collapse.appendChild(cardBody);

        // fyld text til body
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

        // table append
        cardBody.appendChild(table);

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
        tableRowUpperTd.appendChild(tableRowUpperInput);

        let updBtn = cardBody.appendChild(document.createElement("button"));
        updBtn.setAttribute("value", this.sensorID.toString());
        updBtn.setAttribute("class", "btn btn-lg btn-primary");
        updBtn.innerText = "Gem Data";
        updBtn.onclick = function() {
            
            axios.put("https://watermasterapi.azurewebsites.net/api/sensor/", {
                macAddress: sensor.macAddress,
                name: tableRowNameInput.value,
                limitUp: Number(tableRowUpperInput.value),
                limitLow: Number(tableRowLowerInput.value),
                fK_UserId: sensor.fK_UserId
            })
            .then(function(response) {
                spanname.innerText = tableRowNameInput.value;
                spanlimitup.innerText = tableRowUpperInput.value + "%";
                spanlimitlow.innerText = tableRowLowerInput.value + "%";
                //window.location.reload(); // !!
            });
        };
    }
}