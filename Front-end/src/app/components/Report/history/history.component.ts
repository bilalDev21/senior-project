import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpService } from '../../../http.service';
 
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, MatCardModule, CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  router = inject(Router);
  route = inject(ActivatedRoute);
  httpService = inject(HttpService);

  HistoryList:any=[];
  userId!:number; 

  ngOnInit(){
    this.userId = this.route.snapshot.params['id'];
    this.httpService.getAllHistoryById(this.userId).subscribe(result => {
      this.HistoryList = result;
      console.log(this.HistoryList);
      });
  }

}
