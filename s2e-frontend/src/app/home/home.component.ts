import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    balance = 0
    img_src = ""

    financial_blessings = [ 
        "https://pbs.twimg.com/profile_images/1121630818579800064/ocQiWDUY_400x400.png",
        "https://pixel.nymag.com/imgs/daily/vulture/2015/07/13/13-50-cent-money.w700.h700.jpg",
        "https://m.media-amazon.com/images/I/81sTCqmqwNL._SS500_.jpg",
        "https://channel45news.com/wp-content/uploads/2017/06/IMG_0502-696x670.jpg"
    ]

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onButtonTap(){
        this.balance += 100
        this.img_src = this.financial_blessings[Math.floor(Math.random()*this.financial_blessings.length)]
    }
}
