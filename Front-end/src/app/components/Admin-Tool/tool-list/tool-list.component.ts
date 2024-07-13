import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../../http.service';

@Component({
  selector: 'app-tool-list',
  standalone: true,
  imports: [RouterLink, MatInputModule, FormsModule, MatToolbarModule, ReactiveFormsModule, MatCardModule, CommonModule],
  templateUrl: './tool-list.component.html',
  styleUrl: './tool-list.component.css'
})
export class ToolListComponent {

  router = inject(Router);
  httpService = inject(HttpService);

  ToolList:any=[];

  ngOnInit(){
    this.httpService.getAllTool().subscribe(result =>{
      this.ToolList = result;
      });
  }


  Edit(id:number){
    console.log(id);
    this.router.navigateByUrl("/create-tool/"+id);
  }

  delete(id:number){
    this.httpService.deleteTool(id).subscribe(()=>{
      console.log("deleted");
      this.ToolList = this.ToolList.filter(((x: { id: number; }) => x.id!=id));
    })
  }

}
