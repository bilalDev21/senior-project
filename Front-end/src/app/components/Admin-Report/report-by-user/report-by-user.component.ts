import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../../http.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { IAdminReport } from '../../../interfaces/admin-report';
import { IStatus } from '../../../interfaces/Status';
 

@Component({
  selector: 'app-report-by-user',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, CommonModule, RouterLink],
  templateUrl: './report-by-user.component.html',
  styleUrl: './report-by-user.component.css'
})
export class ReportByUserComponent {

  httpService = inject(HttpService);
  router = inject(Router);

  ReportList:IAdminReport[]=[]; 

  ngOnInit(){
    this.httpService.getAllReport().subscribe(result =>{
      this.ReportList = result;
      console.log(this.ReportList);
      });
  }

  Accepted(id:number){
    const r:IStatus = {
      Status: "Done",
    };
    console.log("1");
    this.httpService.updateReport(id, r).subscribe(() => {
      console.log("2");
      this.httpService.CreateHistory().subscribe(()=>{
        console.log("succes")
        this.ReportList = this.ReportList.filter(x => x.reportId!=id);
        this.router.navigateByUrl("/report-history");
      })
    });      
  }

  Rejected(id:number){
    const r:IStatus = {
      Status: "Canceled",
    };
    console.log("1");
    this.httpService.updateReport(id, r).subscribe(() => {
      console.log("2");
      this.httpService.CreateHistory().subscribe(()=>{
        console.log("succes")
        this.ReportList = this.ReportList.filter(x => x.reportId!=id);
        this.router.navigateByUrl("/report-history");
      })
    });      
  }

}
