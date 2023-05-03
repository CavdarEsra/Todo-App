import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  BASE_URL: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }


  //getData() fonksiyonu, belirtilen URI'ye bir HTTP GET isteği gönderir ve döndürülen verileri Task türünde bir Observable nesnesinde paketler
  //T, generic bir tür parametresidir. fonksiyon çağrısı sırasında belirlenir ve fonksiyon, belirtilen türde bir Observable nesnesi döndürür

  private getData<T>(uri: string): Observable<T> { return this.http.get<T>(uri) }

  getTask(): Observable<Task> { return this.getData(this.BASE_URL + 'tasks') }

  getTaskById(id:any):Observable<any> { return this.getData(this.BASE_URL+'tasks/'+ id) }

  getCategories(): Observable<Category> { return this.getData(this.BASE_URL + 'categories') }

  //query parametresi, belirli bir filtreleme kriteri olan görev durumunu temsil eder
  getTasksByQuery(query: string):Observable<Task> { return this.getData(this.BASE_URL+'tasks/' + query) }

  //post
  postTask(data: any): Observable<Task> { return this.http.post<Task>(this.BASE_URL + 'tasks', data)}

  //put(güncellemek için)
  putTask(data: any, id: number): Observable<Task> { return this.http.put<Task>(this.BASE_URL + 'tasks/' + id, data) }

  //delete
  deleteTask(id: number):Observable<Task> { return this.http.delete<Task>(this.BASE_URL+'tasks/'+id) }

  //checkbox-status için. işaretlemeyi put ile gönderiyor
  updateStatus(task: Task): Observable<Task> {
    const url = `${this.BASE_URL + 'tasks'}/${task.id}`;
    return this.http.put<Task>(url, task);
  }
}
