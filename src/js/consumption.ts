export class Consumption
{
    private WaterAmount: number = 0.5;
    private WateringNums: number = 46.00;
    private WaterPrice: number = 15.99;
    private Total: number = 0.00;

    private WaterAmountCell = document.getElementById("consumptionWaterAmount") as HTMLTableCellElement;
    private WateringNumsCell = document.getElementById("consumptionWateringNums") as HTMLTableCellElement;
    private WaterPriceCell = document.getElementById("consumptionWaterPrice") as HTMLTableCellElement;
    private TotalCell = document.getElementById("consumptionTotal") as HTMLTableCellElement;

    constructor()
    {
        this.calcTotal();
    }
    
    numFormat(num: number): string
    {
        return (num
            .toFixed(2) // Set the number of desired decimals.
            .replace('.', ',')  // Replace all points with commas.
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') // Then put a point for every thousand in the number.
        );
    }

    doConsumption(): void
    {
        this.WaterAmountCell.innerText = this.numFormat(this.WaterAmount);
        this.WateringNumsCell.innerText = this.numFormat(this.WateringNums);
        this.WaterPriceCell.innerText = this.numFormat(this.WaterPrice);
        this.TotalCell.innerText = this.numFormat(this.Total);
    }

    calcTotal(): void
    {
        let total: number = 0;
        total = (this.WaterAmount * this.WaterPrice) * this.WateringNums;
        this.Total = total;
    }
}