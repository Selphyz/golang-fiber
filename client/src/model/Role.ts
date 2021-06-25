export class Role {
    constructor(
        public id:number=0,
        public name:string=""
    ) {
        
    }
}
export interface IRole{
    id:number;
    name:string;
}