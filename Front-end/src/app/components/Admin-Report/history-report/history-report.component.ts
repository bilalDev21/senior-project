import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../../http.service';
import { IAdminReport } from '../../../interfaces/admin-report';

@Component({
  selector: 'app-history-report',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, MatCardModule, CommonModule],
  templateUrl: './history-report.component.html',
  styleUrl: './history-report.component.css'
})
export class HistoryReportComponent {

  httpService = inject(HttpService);

  HistoryList:IAdminReport[]=[]; 

  ngOnInit(){
    this.httpService.getAllHistory().subscribe(result =>{
      this.HistoryList = result;
      console.log(this.HistoryList);
      });
  }

}
