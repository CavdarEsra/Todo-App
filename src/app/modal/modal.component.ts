import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasksService } from '../service/tasks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() getTaskId: any;
  @Output() closeModal = new EventEmitter<void>();
  taskData: any;
  categoriesData: any;
  formValue!: FormGroup;

  constructor(private service: TasksService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['',Validators.required],
      priority: ['', Validators.required]
    })
    this.getTaskData();
    this.service.getCategories().subscribe(res => this.categoriesData = res);

  }
  getTaskData() {
    this.service.getTaskById(this.getTaskId).subscribe(res => this.taskData = res);
  }
  updateTask() {
    this.taskData.name = this.formValue.value.name;
    this.taskData.categoryId = Number(this.formValue.value.category);
    this.taskData.priority = this.formValue.value.priority;
    console.log(this.taskData);
    this.service.putTask(this.taskData, this.taskData.id).subscribe(
      res => {
        if (res) {
          this.formValue.reset();
          this.closeModal.emit();
          location.reload();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your task update is successful',
            showConfirmButton: false,
            timer: 1500
          });
        }
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Please try again later.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }
}
