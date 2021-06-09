export class Datsan{
    id?:number;
    idsan: number;
    start_time : string;
    price: number;
    
    constructor(idsan: number, start_time: string,price: number) {
        this.idsan=idsan;
        this.start_time=start_time;
        this.price=price;
    }
};
export class User{
    name:string;
    gmail:string;
    address:string;
    password:string;
    constructor(name:string,gmail:string,address:string,password: string){
        this.name=name;
        this.gmail=gmail;
        this.address=address;
        this.password=password;
        
    }
}