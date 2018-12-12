import axios from 'axios';
import { DateFormat } from './dateFormat';
import { Config } from './config';

export class Consumption extends Config
{
    private WaterAmount: number = 0.005; // This value was decided by the team.
    private WaterPrice: number = 15.99; // This value should be entered by the user of the system.
    private WateringNums: number = 0.00;
    private Total: number = 0.00;
    private LatestWateringDate: Date = null;

    private WaterAmountCell = document.getElementById("consumptionWaterAmount") as HTMLTableCellElement;
    private WaterPriceCell = document.getElementById("consumptionWaterPrice") as HTMLTableCellElement;
    private WateringNumsCell = document.getElementById("consumptionWateringNums") as HTMLTableCellElement;
    private TotalCell = document.getElementById("consumptionTotal") as HTMLTableCellElement;
    private TimeFromElement = document.getElementById("consumptionTimeFrom") as HTMLTableCellElement;
    private TimeToElement = document.getElementById("consumptionTimeTo") as HTMLTableCellElement;
    private LatestWatering = document.getElementById("consumptionLatestWatering") as HTMLTableCellElement;
    
    private dateFormatter: DateFormat = new DateFormat();

    private userid = Number(document.cookie.toString().substr(7, document.cookie.toString().length));

    constructor()
    {
        super();
        this.calcTotal();
    }
    
    numFormat(num: number, decimals: number): string
    {
        return (num
            .toFixed(decimals) // Set the number of desired decimals.
            .replace('.', ',')  // Replace all points with commas.
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') // Then put a point for every thousand in the number.
        )
    }

    calcTotal(): void
    {
        let total: number = 0;
        total = (this.WaterAmount * this.WaterPrice) * this.WateringNums;
        this.Total = total;
    }

    async doConsumption()
    {
        let currentPeriod = new Date(), y = currentPeriod.getFullYear(), m = currentPeriod.getMonth();
        let firstDay = new Date(y, m, 1 + 1);
        let lastDay = new Date(y, m + 1, 0 + 1);

        this.TimeFromElement.innerText = this.dateFormatter.formatShortDate(firstDay);
        this.TimeToElement.innerText = this.dateFormatter.formatShortDate(lastDay);

        let numberOfWaterings: number = 0;
        let dateOfWatering: Date = null;

        await axios.get(this.BASEURI + "user/usergeo/" + this.userid.toString())
        .then(function(response)
        {
            numberOfWaterings = response.data.waterCount;
            dateOfWatering = response.data.lastWater;
        });

        // If no object is returned from the call, don't override the watering number of 0.
        if (numberOfWaterings != null)
        {
            this.WateringNums = numberOfWaterings;
        }

        if (dateOfWatering != null)
        {
            this.LatestWateringDate = dateOfWatering;
        }

        this.calcTotal();

        this.WaterAmountCell.innerText = this.numFormat(this.WaterAmount, 3);
        this.WaterPriceCell.innerText = this.numFormat(this.WaterPrice, 2);
        this.WateringNumsCell.innerText = this.numFormat(this.WateringNums, 2);
        this.TotalCell.innerText = this.numFormat(this.Total, 2);
        this.LatestWatering.innerText = this.dateFormatter.formatDate(this.LatestWateringDate);
    }
}