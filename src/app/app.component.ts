import { Component } from '@angular/core';
import {SharedService} from "../app/service/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TodoApp3';

  isModalOpened = false;
  currentTaskId:any;

  constructor(private sharedService: SharedService) {
    this.sharedService.isModalOpened$.subscribe(status => this.isModalOpened = status );
    this.sharedService.taskId$.subscribe(taskId=> this.currentTaskId=taskId);
  }


  openModal(){
    console.log("running");
    this.isModalOpened =! this.isModalOpened;
    console.log(this.isModalOpened);
  }
}
