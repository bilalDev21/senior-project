import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IRequest } from '../../interfaces/Request';
import { HttpService } from '../../http.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatToolbarModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {

  httpService = inject(HttpService);
  route = inject(ActivatedRoute);
 
  
  RequestList:IRequest[]=[];
  displayedColumns: string[] = ['counter', 'eventName', 'status', 'action'];
 
  userId!:number
 
  ngOnInit(){
    this.userId = this.route.snapshot.params['id'];
    console.log(this.userId)
    this.httpService.getAllRequestById(this.userId).subscribe(result =>{
      this.RequestList = result;
      console.log(this.RequestList); 
      });
  }

  delete(id:number){
    this.httpService.deleteRequest(id).subscribe(()=>{
      console.log("deleted");
      this.httpService.getAllRequestById(this.userId).subscribe(result =>{
        this.RequestList = result;
        console.log(this.RequestList); 
        });
    })
  }
}
