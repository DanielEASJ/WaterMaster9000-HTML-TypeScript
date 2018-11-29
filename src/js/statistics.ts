export class Statistics
{
    constructor()
    {
        this.Start();
    }

    Start(): void
    {
        let mainDiv: HTMLDivElement = <HTMLDivElement> document.getElementById("statistics");

        let accordion: HTMLDivElement = document.createElement("div");
        accordion.setAttribute("class", "accordion");
        accordion.setAttribute("id", "accordion");

        for (let i = 0; i < 5; i++)
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
            table.setAttribute("id", "table" + i.toString()); // !!

            //table collums
            let tablecolumnRow: HTMLTableRowElement = document.createElement("tr"); //row til columns

            let tablecolumn0: HTMLTableHeaderCellElement = document.createElement("th") // paragraph column
            // tablecolumn0.innerHTML = "test"
            
            let tablecolumn1: HTMLTableHeaderCellElement = document.createElement("th") // input column
            // tablecolumn1.innerHTML = "test 2"


            // table row
            let tableRow0 : HTMLTableRowElement = document.createElement("tr");
            tableRow0.setAttribute("id", "row0"); 
            
            let tableRow1 : HTMLTableRowElement = document.createElement("tr");
            tableRow1.setAttribute("id", "row1"); 

            let tableRow2 : HTMLTableRowElement = document.createElement("tr");
            tableRow2.setAttribute("id", "row2"); 


            // table name
            let tableRowName : HTMLTableDataCellElement = document.createElement("td")
            tableRowName.setAttribute("id", "rowName" + i.toString()); // !!
            tableRowName.innerHTML = "Sensor navn: "

            let tableRowNameInput : HTMLInputElement = document.createElement("input");
            tableRowNameInput.setAttribute("id", "rowNameInput");
            tableRowNameInput.setAttribute("placeholder", "indtast navn her");

            // table lower
            let tableRowLower : HTMLTableDataCellElement = document.createElement("td");
            tableRowLower.setAttribute("id", "rowLower" + i.toString()); // !!
            tableRowLower.innerHTML = "laveste grænse: "

            let tableRowLowerInput : HTMLInputElement = document.createElement("input");
            tableRowLowerInput.setAttribute("id", "rowLowerInput");
            tableRowLowerInput.setAttribute("placeholder", "indtast laveste grænse her");

            // table upper
            let tableRowUpper : HTMLTableDataCellElement = document.createElement("td");
            tableRowUpper.setAttribute("id", "rowUpper" + i.toString()); // !!
            tableRowUpper.innerHTML = "normal grænse: "

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


            collapse.appendChild(table);

            table.appendChild(tablecolumnRow);
            tablecolumnRow.appendChild(tablecolumn0);
            tablecolumnRow.appendChild(tablecolumn1);


            table.appendChild(tableRow0);

            tableRow0.appendChild(tableRowName);
            tableRow0.appendChild(tableRowNameInput);

            table.appendChild(tableRow1);

            tableRow1.appendChild(tableRowLower);
            tableRow1.appendChild(tableRowLowerInput);

            table.appendChild(tableRow2);

            tableRow2.appendChild(tableRowUpper);
            tableRow2.appendChild(tableRowUpperInput)


            //test text
            btn.innerText = "#" + i.toString() + " Sensor";
            cardBody.innerText = "Hello. This is Sensor #" + i.toString();



            
        }
    }
}