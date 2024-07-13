import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpService } from '../../../http.service';

@Component({
  selector: 'app-tool-form',
  standalone: true,
  imports: [RouterLink, MatInputModule, FormsModule, MatToolbarModule, ReactiveFormsModule],
  templateUrl: './tool-form.component.html',
  styleUrl: './tool-form.component.css'
})
export class ToolFormComponent {

  router = inject(Router);
  route = inject(ActivatedRoute);
  httpService = inject(HttpService);
  ToolData: any = {};


  toolId!: number;
  isEdit = false;
  ngOnInit(){
    this.toolId = this.route.snapshot.params['id'];
    if(this.toolId){
      this.isEdit = true;
      this.httpService.getTool(this.toolId).subscribe(result =>{
        console.log(result);
        this.ToolData = result
        // this.employeeForm.controls.email.disable();
      })
    }
  }

  submitForm() {
    console.log("success");
    const ToolData = new FormData();
    ToolData.append('name', this.ToolData.name);
    ToolData.append('description', this.ToolData.description);
    ToolData.append('quantity', this.ToolData.quantity.toString());  
    ToolData.append('status', "Available");  
    ToolData.append('image', this.ToolData.image);      
    ToolData.append('tax', this.ToolData.tax.toString());
    console.log("success" + ToolData);
    // Logging formData again to ensure correct values are appended

    if(this.isEdit){
      this.httpService.updateTool(this.toolId,ToolData).subscribe(() => {
        console.log("success");
        this.router.navigateByUrl("/tool-list");
      });
    }else{
        this.httpService.CreateTool(ToolData).subscribe(
          response => {
            console.log("success" + response);
            this.router.navigateByUrl("/tool-list");
            // Reset form after submission
            this.ToolData = {};
         
          });
      }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      // Convert the image to a data URL
      this.ToolData.image = e.target.result;
    };
  
    // Read the file as a data URL
    reader.readAsDataURL(file);
  }

}
