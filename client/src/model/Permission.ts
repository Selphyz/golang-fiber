export class Permission {
    constructor(
        public id = 0,
        public name = ''
    ) { }
}

export interface IPermission {
    id: number;
    name: string;
}