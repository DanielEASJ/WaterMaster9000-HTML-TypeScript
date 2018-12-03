export class Alert
{
    private message: string;

    constructor(message: string)
    {
        // The constructor takes one paramater, which becomes the actual message shown in the alert box.
        this.message = message;
    }

    MakeAlert()
    {
        // Create the division element that will become the actual alert box.
        let alert = document.createElement("div")
            alert.setAttribute("class", "alert alert-danger");
            alert.setAttribute("role", "alert");
            alert.innerText = this.message;

        // Create the button element that will become the 'Close'-button.
        let closeAlert = document.createElement("button");
            closeAlert.setAttribute("type", "button");
            closeAlert.setAttribute("class", "close");
            closeAlert.setAttribute("data-dismiss", "alert");
            closeAlert.setAttribute("aria-label", "Close");

        // Create the span element that will hold the 'X'-icon for the 'Close'-button.
        let closeSpan = document.createElement("span");
            closeSpan.setAttribute("aria-hidden", "true");
            closeSpan.innerText = "×";

        closeAlert.appendChild(closeSpan);
        alert.appendChild(closeAlert);

        return alert;
    }
}