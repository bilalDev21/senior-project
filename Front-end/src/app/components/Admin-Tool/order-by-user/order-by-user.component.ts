import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpService } from '../../../http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-by-user',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, MatTableModule, CommonModule],
  templateUrl: './order-by-user.component.html',
  styleUrl: './order-by-user.component.css'
})
export class OrderByUserComponent {

  httpService = inject(HttpService);
  route = inject(ActivatedRoute);

  OrderList:any=[];
  
  displayedColumns: string[] = ['orderId', 'userName', 'toolName', 'status', 'action'];

  ngOnInit(){
    console.log("success");
    this.httpService.getAllOrder().subscribe(result =>{
      this.OrderList = result;
      console.log(this.OrderList);
      });
  }

  submit(orderId:number){
    console.log(orderId);
    this.httpService.UpdateOrderTool(orderId).subscribe(() =>{
      this.httpService.getAllOrder().subscribe(result =>{
        this.OrderList = result;
        console.log(this.OrderList);
        });
    });
  }

}
