export {};
export class Notification {
    private title: string;
    private message: string;
    private type: string;
    constructor(title: string, message: string, type: string) {
        this.title = title;
        this.message = message;
        this.type = type;
    }
}
