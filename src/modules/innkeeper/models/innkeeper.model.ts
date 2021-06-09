export class Datsan {
    id?: number;
    idsan: number;
    start_time: string;
    price: number;

    constructor(idsan: number, start_time: string, price: number) {
        this.idsan = idsan;
        this.start_time = start_time;
        this.price = price;
    }
};
export class Innkeeper {
    name: string;
    gmail: string;
    address: string;
    password: string;
    constructor(name: string, gmail: string, address: string, password: string) {
        this.name = name;
        this.gmail = gmail;
        this.address = address;
        this.password = password;

    }
}

export class Quan {
    name: string;
    address: string;
    linkaddress: string;
    image: FormData;
    constructor(name: string, address: string, linkaddress: string, image: FormData) {
        this.name = name;
        this.address = address;
        this.linkaddress = linkaddress;
        this.image = image;
    }
}
export class San {
    idquan: number;
    name: string;
    numberpeople: number;
    priceperhour: number;
    constructor(idquan: number, name: string, numberpeople: number, priceperhour: number) {
        this.idquan = idquan;
        this.name = name;
        this.numberpeople = numberpeople;
        this.priceperhour = priceperhour;
    }

}
export class Thaydoidatsan {
    idsanOld: number;
    idsanNew: number;
    timeOld: string;
    timeNew: string;
    constructor(idsanOld: number, idsanNew: number, timeOld: string, timeNew: string) {
        this.idsanOld = idsanOld;
        this.idsanNew = idsanNew;
        this.timeOld = timeOld;
        this.timeNew = timeNew;

    }
}
export class San1 {
    id: number;
    name: string;
    numberpeople: number;
    priceperhour: number;
    constructor(id: number, name: string, numberpeople: number, priceperhour: number) {
        this.id = id;
        this.name = name;
        this.numberpeople = numberpeople;
        this.priceperhour = priceperhour;
    }

}