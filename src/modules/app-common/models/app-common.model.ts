export class PermissionUser {
    private user_id: number;
    private route_ids: Array<number>;
    private type: string;
    constructor(userid: number, routeids: Array<number>, type: string) {
        this.user_id = userid;
        this.route_ids = routeids;
        this.type = type;
    }
}
export class PermissionRole {
    public role_name: string;
    public route_ids: Array<number>;
    constructor(role_name: string, route_ids: Array<number>) {
        this.role_name = role_name;
        this.route_ids = route_ids;
    }
}
