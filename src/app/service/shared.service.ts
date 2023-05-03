import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  //BehaviorSubject sınıfı, bir başlangıç değeri ile birlikte bir Observable nesnesi oluşturur ve bu değeri kaydeder. Daha sonra bu değer, Observable'a abone olan herhangi bir yerde okunabilir veya değiştirilebilir
  //Bu özellik, başlangıçta false değeriyle tanımlanır, yani bir modal penceresinin açık olmadığı anlamına gelir
  //isModalOpened$ adlı bir Observable nesnesi de tanımlanır. Bu Observable, isModalOpened özelliğini takip eder ve herhangi bir değişiklik olduğunda yeni bir değer yayınlar. Bu sayede, bileşenin dışında bu özelliği dinleyen diğer parçalar, örneğin farklı bileşenler veya servisler, modal pencerenin açık veya kapalı olup olmadığını takip edebilirler
  //Bu Observable, asObservable() metodu ile sadece okunabilir hale getirilir
  private isModalOpened = new BehaviorSubject<boolean>(false);
  isModalOpened$ = this.isModalOpened.asObservable();

  private taskId=new BehaviorSubject<any>(null);
  taskId$ = this.taskId.asObservable();

  constructor() { }

  //updateModalStatus adlı bir metod, bir status parametresi alır ve isModalOpened özelliğinin değerini bu status değeri ile günceller. next() metodu, BehaviorSubject nesnesine yeni bir değer yayınlar
  updateModalStatus(status: boolean, id:any){
    this.taskId.next(id);
    this.isModalOpened.next(status);
    console.log(id);
  }
}
