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

export class Tables
{
    private columns: number;
    private rows: number;

    constructor(columns: number, rows: number)
    {
        this.columns = columns;
        this.rows = rows;
    }

    makeTable(sensorObj: Sensor, id: number): HTMLTableElement
    {
        let table: HTMLTableElement = document.createElement("table");
        table.setAttribute("class", "table table-striped table-bordered");

        let thead = table.createTHead();
        let tbody = table.createTBody();

        let theadRow = thead.insertRow(0); // declare thead row to only one sinse column only needs one

        for (let r = 0; r < this.columns; r++) {
            switch (r) {
                case 0:
                    theadRow.appendChild(document.createElement("th")).innerText = "Titler"; // Appending in both cases, cause 'InsertCell' doesn't support the 'TH' element :(
                    break;
                case 1:
                    theadRow.appendChild(document.createElement("th")).innerText = "Input";
                    break;
            }
        }

        for (let r = 0; r < this.rows; r++)
        {
            let tbodyRow = tbody.insertRow(r); // generates rows according parameter

            for (let c = 0; c < 1; c++)
            {
                // hardcoded row definition (if row gets bigger then 3 needs more cases for the new number)
                // also need to increase switch cases in method: generateInput, to fit this switch case 
                switch (r) {
                    case 0: // generate info section
                        tbodyRow.insertCell(c).innerText = "Navn:";
                        this.generateInput(tbodyRow, r, sensorObj, id);
                        break;
                    case 1: // generate info section
                        tbodyRow.insertCell(c).innerText = "Nedre fugtigheds-grænse: (%)";
                        this.generateInput(tbodyRow, r, sensorObj, id);
                        break;
                    case 2: // generate info section
                        tbodyRow.insertCell(c).innerText = "Øvre fugtigheds-grænse: (%)";
                        this.generateInput(tbodyRow, r, sensorObj, id);
                        break;
                }
            }
        }
        return table;
    }

    private generateInput(tbodyRow : HTMLTableRowElement, row : number, sensorObj: Sensor, id: number) : void {

        let input = document.createElement("input") as HTMLInputElement;
        input.setAttribute("class", "form-control");

        switch (row) {
            case 0:
                tbodyRow.insertCell(-1); // generate td (-1 translates to the end of the row.)
                input.value = sensorObj.name;
                input.setAttribute("id", "rowNameInput" + id.toString());

                // code that sets input value = value from DB

                tbodyRow.children[1].appendChild(input); // append input into td
                break;
            case 1:
                tbodyRow.insertCell(-1); // generate td (-1 translates to the end of the row.)
                input.value = sensorObj.limitLow.toString();
                input.setAttribute("id", "rowLowerInput" + id.toString());

                // code that sets input value = value from DB

                tbodyRow.children[1].appendChild(input); // append input into td
                break;
            case 2:
                tbodyRow.insertCell(-1); // generate td (-1 translates to the end of the row.)
                input.value = sensorObj.limitUp.toString();
                input.setAttribute("id", "rowUpperInput" + id.toString());

                // code that sets input value = value from DB

                tbodyRow.children[1].appendChild(input); // append input into td
                break;
        }
    }
}