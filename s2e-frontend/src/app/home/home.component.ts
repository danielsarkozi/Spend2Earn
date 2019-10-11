import { Component, OnInit } from "@angular/core";
import { Entrepreneur, rarity_type } from "./entrepreneur";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    balance = 0
    img_src = ""
    name = ""
    description = ""
    color = ""
    rarity

    color_codes = {
        "Common" : "#bbc6c9",
        "Rare" : "#1d50ad",
        "Epic" : "#981bc2",
        "Legendary" : "#db8b12"
    }


    collectibles = [
        new Entrepreneur(   "Marquis, the Enlightened", 
                            "https://pbs.twimg.com/profile_images/1121630818579800064/ocQiWDUY_400x400.png",
                            "One eye on the street, one eye on them titties",
                            rarity_type.common  ),
        new Entrepreneur(   "DeShawn, the Prosperous", 
                            "https://pixel.nymag.com/imgs/daily/vulture/2015/07/13/13-50-cent-money.w700.h700.jpg" ,
                            "It is the mark of an educated mind to be able to entertain a thought without accepting it.\n- DeShawn, the Prosperous",
                            rarity_type.common  ),
        new Entrepreneur(   "Cradlerboy, the Broke Nigga", 
                            "https://m.media-amazon.com/images/I/81sTCqmqwNL._SS500_.jpg" ,
                            "Turns out the broke nigga was you all along",
                            rarity_type.epic  ),
        new Entrepreneur(   "Tyrone, the Hustler", 
                            "https://channel45news.com/wp-content/uploads/2017/06/IMG_0502-696x670.jpg",
                            "He just can't stop hustling",
                            rarity_type.rare  ),
        new Entrepreneur(   "Mansa Musa, Sultan of Mali", 
                            "https://magazine.northwestern.edu/assets/2019/Spring/6dd846b396/mansa-musa__FocusFillWzEyNDIsMTI0OCwieCIsMzY2XQ.jpg",
                            "Rejoice with me, friend, for we are free from every want and can devote our time to the will of God.",
                            rarity_type.legendary  ),
        new Entrepreneur(   "Maurice, the Dastard", 
                            "https://i.pinimg.com/474x/7e/56/04/7e5604d9c44a5d374051bb4f48c45d5c.jpg",
                            "Tbh he was always a mama's boy",
                            rarity_type.epic  ),
        new Entrepreneur(   "Jamal, the Divine", 
                            "https://i.pinimg.com/474x/a9/4e/2d/a94e2dbc296d7960b4b55b7da45952c5.jpg",
                            "Word on the street is he can see everything; even you jacking off",
                            rarity_type.rare  ),
        new Entrepreneur(   "Xavier, the Bard", 
                            "https://i.pinimg.com/474x/94/14/10/9414101c710ea88a652bf2af18f754d1.jpg",
                            "On the weekends he sings in the chorus of the local baptist church",
                            rarity_type.common  ),
        new Entrepreneur(   "Demetrius, the Engineer", 
                            "https://i.pinimg.com/474x/7d/7f/2f/7d7f2f8b000c1f95e7bdc74a83fdcc3b.jpg",
                            "Guess where Steve Jobs got the idea of the iPhone; That's right it was the demetriusPhone",
                            rarity_type.rare  ),
        new Entrepreneur(   "The phantom of X", 
                            "https://i.pinimg.com/474x/f8/7c/25/f87c251e47c0042c006a53753254fe36.jpg",
                            "The king has returned and ye shall rejoice",
                            rarity_type.legendary  ),
        new Entrepreneur(   "Trevon, the Transcendental", 
                            "https://i.pinimg.com/474x/4d/be/e0/4dbee0610a75eae2a70a2a2d87831d87.jpg",
                            "He is a pretty average dude tho",
                            rarity_type.common  ),
        new Entrepreneur(   "Darius, the Humble Knight", 
                            "https://i.pinimg.com/474x/dd/08/5d/dd085dd8ba89aa63ed60f77da791f503.jpg",
                            "Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win.",
                            rarity_type.common  ),     
        
    ]

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    get_entrepreneur():Entrepreneur{

        var chance = Math.random()
        let ret

        if(chance<0.05){
            let entr_list = this.get_entrepreneurs_by_rarity(rarity_type.legendary)
            ret = entr_list[Math.floor(Math.random()*entr_list.length)]
        }else if(0.05<=chance && chance<0.2){
            let entr_list = this.get_entrepreneurs_by_rarity(rarity_type.epic)
            ret = entr_list[Math.floor(Math.random()*entr_list.length)]
        }else if(0.2<=chance && chance<0.5){
            let entr_list = this.get_entrepreneurs_by_rarity(rarity_type.rare)
            ret = entr_list[Math.floor(Math.random()*entr_list.length)]
        }else{
            let entr_list = this.get_entrepreneurs_by_rarity(rarity_type.common)
            ret = entr_list[Math.floor(Math.random()*entr_list.length)]
        }

        return ret
    }

    get_entrepreneurs_by_rarity(rarity:rarity_type):Entrepreneur[]{
        let ret = []
        this.collectibles.forEach(function(elem){
            if (elem.rarity == rarity){
                ret.push(elem)
            }
        })
        return ret
    }

    onButtonTap(){
        this.balance += 100

        let obtained = this.get_entrepreneur()
        this.name = obtained.name
        this.color = this.color_codes[obtained.rarity]
        this.description = obtained.description
        this.img_src = obtained.url
        this.rarity = obtained.rarity
    }


}
