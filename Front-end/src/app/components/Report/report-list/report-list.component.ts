import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { IReport } from '../../../interfaces/Report';
import { HttpService } from '../../../http.service';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, MatCardModule, CommonModule],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.css'
})

export class ReportListComponent {
 
  router = inject(Router);
  route = inject(ActivatedRoute);
  httpService = inject(HttpService);

  ReportList:IReport[]=[]; 
  userId!:number;

  ngOnInit(){
    this.userId = this.route.snapshot.params['id'];
    this.httpService.getAllReportById(this.userId).subscribe(result =>{
      this.ReportList = result;
      console.log(this.ReportList);
      });
  }

  delete(id:number){
    this.httpService.deleteReport(id).subscribe(()=>{
      console.log("deleted");
      this.ReportList = this.ReportList.filter(x => x.reportId!=id);
    })
  }

}
