import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../service/tasks.service';
import { Task } from '../models/task.model';
import Swal from 'sweetalert2';
import {SharedService} from "../service/shared.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  taskModelObje: Task = new Task();  //modelde tanımlı tasktan nesne oluşturdum.HTTP isteklerinde gönderilecek olan verileri tutar
  isActiveModal: boolean = false;
  formValue!: FormGroup;
  taskData: any;
  categoriesData: any;
  query: string = '';

  constructor(private formBuilder: FormBuilder, private taskService: TasksService, private sharedService: SharedService) { }


  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['',Validators.required],
      priority: ['', Validators.required]
    })
    this.getCategoriesData();
    this.getTaskData();
  }

  //burdan shared servise id gönderdik. servisten de onu kullanana(app.comp). app comp. ten de modal a
  showUpModal(id:any){
    this.sharedService.updateModalStatus(true,id);
  }

  //navbar kısmında task ekleme butonuna tıklayınca modal içinde update butonu gösterilmez. Edit butonuna tıklayınca add butonu gösterilmez
  add() {
    this.isActiveModal = true;
  }
  openModal() {
    this.isActiveModal = true;
  }
  getCategoriesData() {
    this.taskService.getCategories().subscribe((result: any) => {
      this.categoriesData = result;
    });
  }
  getTaskData() {
    this.taskService.getTask().subscribe((result: any) => {
      this.taskData = result;
      this.categoriesData.forEach((category: any) => {
        this.taskData.forEach((task: any) => {
          if (task.categoryId === category.id) {
            task.category = category.name;
            //görevlerin kategorileri isimleriyle birlikte gösterilebilir
          }
        });
      });
    });
  }
  //checkbox-status için
  updateTaskStatus(task: Task) {
    task.status = !task.status; // Durumu tersine çevir (true -> false veya false -> true)
    this.taskService.updateStatus(task).subscribe();
  }

  addTask() {
    this.taskModelObje.name = this.formValue.value.name;
    this.taskModelObje.categoryId = Number(this.formValue.value.category);
    this.taskModelObje.priority = this.formValue.value.priority;
    this.taskModelObje.status=false;
    //HTTP POST isteği gönderilerek oluşturulan görev sunucuya kaydediliyor
    this.taskService.postTask(this.taskModelObje).subscribe((result: any) => {
      this.formValue.reset();
      this.getTaskData();
      this.isActiveModal = false;
      Swal.fire({
        position: 'top-end',  //center da yapılabilir
        icon: 'success',
        title: 'Your task has been successfully saved',
        showConfirmButton: false,  //tamam yerine kapatma ikonu
        timer: 1500
      })
    },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Please try again later.',
          showConfirmButton: false,
          timer: 1500
      })
    })
  }
  deletedTask(data: any) {
    Swal.fire({
      title: 'Are you sure you want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(data.id).subscribe(result => {
          Swal.fire('Deleted!', 'The task has been deleted successfully.', 'success');
        }, error => {
          Swal.fire('Error!', 'An error occurred while deleting the task.', 'error');
        }).add(() => {
          this.getTaskData();
        });
      }
    });
  }
  //id ye göre kategori id
  getCategoryNameById(id:any):String {
    let category= this.categoriesData.filter((item:any) => item.id===Number(id));
    return category[0].name;
  }

  //Bu kod bloğu, bir $event parametresi alan ve bir sorgu dizesi oluşturan bir fonksiyon içerir
  buildQuery($event: any) {
    if (!this.query) {  //mevcut sorgu yoksa ? ile başlar
      this.query = '?';
    }

    const value = $event.target.value;
    const name = $event.target.name;

    if (name === 'category') {
      this.query += `categoryId=${value}&`;    //categoryId=value&
    } else if (name === 'priority') {
      this.query += `priority=${value}&`;      //priority=value&
    }
  }

  //Bu fonksiyonun amacı, this.query değişkenine göre bir görev listesi almak ve bu görev listesini this.taskData değişkenine atamak
  listsTaskByQuery() {
    this.taskService.getTasksByQuery(this.query).subscribe((result: any) => {
      this.taskData = result;
      this.query = '';
    });
  }
  //Fonksiyon, "this.query" değişkenindeki mevcut sorguyu kontrol eder ve "params" parametresinde belirtilen değerin "=" işaretinden sonra mevcut sorguda var olup olmadığını kontrol eder. Yoksa kenarları boyar
  validateQuery(params: string): string {
    const queryParam = `${params}=`;
    return !this.query.includes(params) ? "border-1 border-warning form-control" : "form-control";
  }
}

