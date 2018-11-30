export class Tables
{
    private columns: number;
    private rows: number;

    

    constructor()
    {
    }

    makeTable(columns: number, rows: number): any
    {
        let table: HTMLTableElement = document.createElement("table");
        table.setAttribute("class", "table table-striped");

        let thead = table.createTHead();
        let tbody = table.createTBody();

        let theadRow = thead.insertRow(0); // declare thead row to only one sinse column only needs one

        for (let r = 0; r < this.columns; r++) {
            theadRow.insertCell(r).innerText = "#" + r.toString() + " Head"; // generates columns set by contructor
        }

        for (let r = 0; r < this.rows; r++)
        {
            let tbodyRow = tbody.insertRow(r); // generates rows according parameter

            for (let c = 0; c < this.columns; c++)
            {
                // hardcoded row definition (if row gets bigger then 3 needs more cases for the new number)
                // also need to increase switch cases in method: generateInput, to fit this switch case 
                switch (r) {
                    case 0: // generate info section
                        tbodyRow.insertCell(c).innerText = "Navn: ";
                        break;
                    case 1: // generate info section
                        tbodyRow.insertCell(c).innerText = "Nedre Grænse: ";
                        break;
                    case 2: // generate info section
                        tbodyRow.insertCell(c).innerText = "Øvre Grænse: ";
                        break;
                }

                this.generateInput(tbodyRow, r); // used to generate td, input & set data from DB
              
                //tbodyRow.insertCell(c).innerText = "Row:" + r.toString() + ", Cell:" + c.toString(); reduntant when switch case works 
            }
        }

        return table;
    }

    private generateInput(tbodyRow : HTMLTableRowElement, row : number) : void {

        let input = document.createElement("input") as HTMLInputElement;

        switch (row) {
            case 0:
                tbodyRow.insertCell(row); // generate td 
                input.placeholder = "indtast navn her";

                // code that sets input value = value from DB

                tbodyRow.children[row].appendChild(input); // append input into td
                break;
            case 1:
                tbodyRow.insertCell(row); // generate td
                input.placeholder = "indtast nedre grænse her"; 
                
                // code that sets input value = value from DB

                tbodyRow.children[row].appendChild(input); // append input into td
                break;
            case 2:
                tbodyRow.insertCell(row); // generate td 
                input.placeholder = "indtast øvre grænse her";
                
                // code that sets input value = value from DB

                tbodyRow.children[row].appendChild(input); // append input into td
                break;
            
        }
    }
    
}