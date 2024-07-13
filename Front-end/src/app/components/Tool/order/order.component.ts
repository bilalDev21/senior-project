import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpService } from '../../../http.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, MatTableModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  httpService = inject(HttpService);
  route = inject(ActivatedRoute);

  OrderList:any=[];
  userId!:number;
  displayedColumns: string[] = ['orderId', 'userName', 'toolName', 'status', 'action'];

  ngOnInit(){
    console.log("success");
    this.userId = this.route.snapshot.params['id'];
    console.log("success" + this.userId);
    this.httpService.getAllOrderById(this.userId).subscribe(result =>{
      this.OrderList = result;
      console.log(this.OrderList);
      });
  }
}
