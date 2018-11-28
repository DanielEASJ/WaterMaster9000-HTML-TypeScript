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

            mainDiv.appendChild(accordion);
            accordion.appendChild(card);
            card.appendChild(cardHeader);
            cardHeader.appendChild(mb0);
            mb0.appendChild(btn);
            accordion.appendChild(collapse);
            collapse.appendChild(cardBody);

            btn.innerText = "#" + i.toString() + " Sensor";
            cardBody.innerText = "Hello. This is Sensor #" + i.toString();
        }
    }
}