import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../http.service';
import { ILogin } from '../../interfaces/Login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
 

export class LoginComponent {
  router = inject(Router);
  httpService = inject(HttpService);

  UserList:ILogin[]=[];
  email = "";
  password  = "";
  userId:number|undefined = 0;

  ngOnInit(){
    this.httpService.getAllUser().subscribe(result =>{
      this.UserList = result;
      console.log(this.UserList);
      });
  }
  
  Login() {
    for (let i = 0; i < this.UserList.length; i++) {
      
      const currentUser = this.UserList[i];
      console.log("success");
      if (this.email === currentUser.email && this.password === currentUser.password) {
        if(currentUser.role === "user"){
          this.email="";
          this.userId = currentUser.id;
          this.router.navigateByUrl("/user-page/"+this.userId); 
          console.log(this.userId);
          return;
        }else if(currentUser.role === "admin-tool"){
          this.email = "";
          this.userId = currentUser.id;
          this.router.navigateByUrl("/tool-list"); 
          return;
        }else if(currentUser.role === "admin-event"){
          this.email = "";
          this.userId = currentUser.id;
          this.router.navigateByUrl("/Event-List"); 
          return;
        }else if(currentUser.role === "admin-report"){
          this.email = "";
          this.userId = currentUser.id;
          this.router.navigateByUrl("/report-list"); 
          return;
        }
      }
    }
    console.log("Invalid credentials");
  }
  
}