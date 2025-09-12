import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isLoading:boolean=false;
  registerError:string=''
  registerForm =new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.maxLength(12),Validators.minLength(3)]),
    email: new FormControl(null,[Validators.email,Validators.required]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][A-Za-z0-9!@#$%^&*()_\-+=.?]{7,15}$/)]),
    rePassword: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][A-Za-z0-9!@#$%^&*()_\-+=.?]{7,15}$/)]),
    phone: new FormControl(null,[Validators.pattern('01[0125][0-9]{8}')])
  },{validators:this.passMatch})
  constructor(private _AuthService:AuthService){}
  getData(Data:FormGroup){
    this.isLoading=true
    console.log(Data);
    this._AuthService.register(Data.value).subscribe({
      next:(res :any) => {
        this.isLoading=false
        console.log(res);
      },
      error: (err) => {
        console.log("feeeh karsaa");

        this.isLoading=false
        this.registerError=err.error;
        console.log(err);


      },
      complete:() => {console.log('done');
      }
    })
  }

  passMatch(registerForm:any){
    let pass=registerForm.get('password')
    let repass=registerForm.get('rePassword')
    if(pass.value===repass.value){
      return null
    }
  else {
        repass.setErrors({match:"password & re-password not matched"})


        return {match: "password & re-password not matched"}
      }
  }
}
