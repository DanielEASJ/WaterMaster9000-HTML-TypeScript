import axios from 'axios';
import { DateFormat } from './dateFormat';

export class Consumption
{
    private WaterAmount: number = 0.5;
    private WaterPrice: number = 15.99;
    private WateringNums: number = 0.00;
    private Total: number = 0.00;

    private WaterAmountCell = document.getElementById("consumptionWaterAmount") as HTMLTableCellElement;
    private WaterPriceCell = document.getElementById("consumptionWaterPrice") as HTMLTableCellElement;
    private WateringNumsCell = document.getElementById("consumptionWateringNums") as HTMLTableCellElement;
    private TotalCell = document.getElementById("consumptionTotal") as HTMLTableCellElement;
    private TimePeriodElement = document.getElementById("consumptionTimePeriod") as HTMLElement;
    
    private dateFormatter: DateFormat = new DateFormat();

    private BASEURI: string = "https://watermasterapi.azurewebsites.net/api/user/usergeo/";
    private userid = Number(document.cookie.toString().substr(7, document.cookie.toString().length));

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

        this.TimePeriodElement.innerText = "Fra: " + this.dateFormatter.formatShortDate(firstDay) +
                                            ". Til: " + this.dateFormatter.formatShortDate(lastDay);

        let numberOfWaterings: number = 0;

        await axios.get(this.BASEURI + this.userid.toString())
        .then(function(response)
        {
            numberOfWaterings = response.data.lat;
        });

        if (numberOfWaterings != null)
        {
            this.WateringNums = numberOfWaterings;
        }

        this.calcTotal();

        this.WaterAmountCell.innerText = this.numFormat(this.WaterAmount);
        this.WaterPriceCell.innerText = this.numFormat(this.WaterPrice);
        this.WateringNumsCell.innerText = this.numFormat(this.WateringNums);
        this.TotalCell.innerText = this.numFormat(this.Total);
    }
}