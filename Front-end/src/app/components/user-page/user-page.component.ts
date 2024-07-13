import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatIconModule ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

  route = inject(ActivatedRoute); 
  httpService = inject(HttpService);
  user:any=[];
 

  userId!:number

  ngOnInit(){
    this.userId = this.route.snapshot.params['id'];
    console.log(this.userId)
    this.httpService.getUserById(this.userId).subscribe(result =>{
      this.user = result;
      console.log(this.user);
      console.log(this.user.name);
    })
  }

}
