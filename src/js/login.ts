import axios, { AxiosPromise } from 'axios';

export class Login
{
    private status: boolean = false;
    private curpath: string = window.location.pathname;
    private curpage: string = this.curpath.substring(this.curpath.lastIndexOf('/') + 1);

    constructor()
    {
        if (this.curpage == "login.htm")
        {
            let btn = document.getElementById("btnLogin") as HTMLButtonElement;
            btn.addEventListener("click", this.Login);
        }
    }

    async Login()
    {
        if (() => this.IsLoggedIn() == false)
        {
            let BASEURI: string = "https://watermasterapi.azurewebsites.net/api/user/login/";
            let username = document.getElementById("username") as HTMLInputElement;
            let password = document.getElementById("password") as HTMLInputElement;

            let tempReponse: number = 0;

            await axios.get(BASEURI + username.value + "&&" + password.value)
            .then(function(response)
            {
                tempReponse = Number(response.data);
            });

            if (tempReponse != 0)
            {
                document.cookie = "USERID=" + tempReponse.toString();
                this.status = true;                
                window.location.href = "index.htm";
            }
        }
        else
        {
            console.log("Du er allerede logget på!");
        }
    }

    IsLoggedIn(): boolean
    {
        if (document.cookie.toString().substr(0, 6) == "USERID")
        {
            this.status = true;
        }
        else
        {
            this.status = false;
        }
        return this.status;
    }
}