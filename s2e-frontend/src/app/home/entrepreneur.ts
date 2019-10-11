
export class Entrepreneur{

    name = ""
    url = ""
    description = ""
    rarity

    constructor( name:string, url:string, description:string, rarity:rarity_type) {
        this.name = name
        this.url = url
        this.description = description
        this .rarity = rarity
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

}

export enum rarity_type {
    common = "Common",
    rare = "Rare",
    epic = "Epic",
    legendary = "Legendary"
}