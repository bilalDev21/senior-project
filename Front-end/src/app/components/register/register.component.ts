import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../http.service';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl : './register.component.css'
})
export class RegisterComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);

  RegisterUser = this.formBuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required]],
  });
 
 
  Save(){
    console.log(this.RegisterUser.value);
    const User:IUser = {
      name: this.RegisterUser.value.name!,
      email: this.RegisterUser.value.email!,
      password: this.RegisterUser.value.password!,
    }

    this.httpService.CreatUser(User).subscribe(result => {
      console.log("success");
      this.router.navigateByUrl("/user-page/"+result);
    });
  
  }
}
