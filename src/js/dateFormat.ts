export class DateFormat
{
    constructor() {}
    
    public formatDate(date: Date): string
    {        
        let d = new Date(date) as Date;
        this.doTimezone(d);
        
        //getMounth() - method is 0 indexed, that is why we add + 1
        let formattedDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " +
                        d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        return formattedDate.toString();
    }

    public formatShortDate(date: Date): string
    {
        let d = new Date(date) as Date;
        this.doTimezone(d);
        
        //getMounth() - method is 0 indexed, that is why we add + 1
        let formattedDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

        return formattedDate.toString();
    }

    private doTimezone(date: Date): void
    {
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    }

    public timeDifference(date: Date): number
    {
        return (((Date.now() - Date.parse(date.toString())) / 1000) / 60) + 60;
    }
}