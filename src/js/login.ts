export class Login
{
    private status: boolean = true;

    constructor()
    {
        let btn = document.getElementById("btnLogin") as HTMLButtonElement;
        btn.addEventListener("click", this.Login);
    }

    Login(): void
    {
        if (() => this.IsLoggedIn() == false)
        {
            console.log("Hej");
            let username = document.getElementById("username") as HTMLInputElement;
            let password = document.getElementById("password") as HTMLInputElement;

            if(username.value == "Michael" && password.value == "123")
            {
                this.status = true;
                //document.cookie = "username=Michael; password=123; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
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
        return this.status;
    }
}