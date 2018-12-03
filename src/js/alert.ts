export class Alert
{
    private message: string;

    constructor(message: string)
    {
        this.message = message;
    }

    MakeAlert()
    {
        let alert = document.createElement("div")
            alert.setAttribute("class", "alert alert-danger");
            alert.setAttribute("role", "alert");
            alert.innerText = this.message;

        let closeAlert = document.createElement("button");
            closeAlert.setAttribute("type", "button");
            closeAlert.setAttribute("class", "close");
            closeAlert.setAttribute("data-dismiss", "alert");
            closeAlert.setAttribute("aria-label", "Close");

        let closeSpan = document.createElement("span");
            closeSpan.setAttribute("aria-hidden", "true");
            closeSpan.innerText = "×";

        closeAlert.appendChild(closeSpan);
        alert.appendChild(closeAlert);

        return alert;
    }
}