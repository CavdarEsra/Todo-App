export class Task{
  id:number=0;
  name:string='';
  status:boolean | undefined;
  priority?:"URGENT" | "NORMAL" | "LOW";
  categoryId?:number;
}
