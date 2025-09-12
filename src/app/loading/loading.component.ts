import { LoadingService } from './../loading.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  isLoading:boolean=false
constructor(_loading:LoadingService){
  _loading.isLoading.subscribe({
    next:(res)=>{
      if(res==true){
        this.isLoading=true
      }
        else {
          this.isLoading=false
        }
      }})
    }
  }