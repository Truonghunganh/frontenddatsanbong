export class User {
    phone: string;
    password: string;
    constructor(phone: string, password: string) {
        this.phone = phone;
        this.password = password;
    }
 }
export class User1{
    role: string;
    name: string;
    phone: string;
    gmail: string;
    address: string;
    password: string;
    constructor(role:string, name: string, phone: string,gmail: string, address: string, password: string) {
        this.role = role;
        this.name= name;
        this.phone= phone;
        this.gmail=gmail;
        this.address= address;
        this.password= password;
    }
}