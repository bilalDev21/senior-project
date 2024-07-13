import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpService } from '../../../http.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IAmount } from '../../../interfaces/amount';
@Component({
  selector: 'app-list-tool',
  standalone: true,
  imports: [MatCardModule, CommonModule, RouterLink, MatToolbarModule],
  templateUrl: './list-tool.component.html',
  styleUrl: './list-tool.component.css'
})
export class ListToolComponent {

  httpService = inject(HttpService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ToolList:any[]=[];

  userId!:number;

  ngOnInit(){
    this.userId = this.route.snapshot.params['id'];
    this.httpService.getAllTool().subscribe(result =>{
      this.ToolList = result;
      });
  }

  Order(id:number, amount:number){
    const order = {
      toolId: id,
      userId: this.userId,
      Status: "In Progress"
    };
    
    const a:IAmount = {
      Amount: amount,
    };

    this.httpService.CreateOrder(order).subscribe(() => {
      this.router.navigateByUrl("/order/"+this.userId);
    });

    this.httpService.UpdateQuantity(id).subscribe();
    this.httpService.createTaxOfTool(this.userId,a).subscribe();
  }
}