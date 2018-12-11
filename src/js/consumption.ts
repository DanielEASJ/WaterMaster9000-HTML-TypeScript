export class Consumption
{
    private WaterAmount: number = 48.00;
    private WateringNums: number = 12.00;
    private WaterPrice: number = 2.30;
    private Total: number = 0.00;

    private WaterAmountCell = document.getElementById("consumptionWaterAmount") as HTMLTableCellElement;
    private WateringNumsCell = document.getElementById("consumptionWateringNums") as HTMLTableCellElement;
    private WaterPriceCell = document.getElementById("consumptionWaterPrice") as HTMLTableCellElement;
    private TotalCell = document.getElementById("consumptionTotal") as HTMLTableCellElement;

    constructor()
    {
        this.calcTotal();
    }

    doConsumption(): void
    {
        this.WaterAmountCell.innerText = this.WaterAmount.toFixed(2);
        this.WateringNumsCell.innerText = this.WateringNums.toFixed(2);
        this.WaterPriceCell.innerText = this.WaterPrice.toFixed(2);
        this.TotalCell.innerText = this.Total.toFixed(2);
    }

    calcTotal(): void
    {
        let total: number = 0;
        total = (this.WaterAmount * this.WaterPrice) * this.WateringNums;
        this.Total = total;
    }
}