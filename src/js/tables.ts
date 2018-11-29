export class Tables
{
    private columns: number;
    private rows: number;
    private obj: any;

    constructor(rows: number, columns: number, obj: any)
    {
        this.columns = columns;
        this.rows = rows;
        this.obj = obj;
    }

    makeTable(): any
    {
        let table: HTMLTableElement = document.createElement("table");
        table.setAttribute("class", "table table-striped");

        let thead = table.createTHead();
        let tbody = table.createTBody();

        let theadrow = thead.insertRow(0);

        for (let r = 0; r < this.columns; r++) {
            theadrow.insertCell(r).innerText = "#" + r.toString() + " Head";
        }

        for (let r = 0; r < this.rows; r++)
        {
            let tbodyrow = tbody.insertRow(r);

            for (let c = 0; c < this.columns; c++)
            {
                tbodyrow.insertCell(c).innerText = "Row:" + r.toString() + ", Cell:" + c.toString();
            }
        }

        return table;
    }
}