import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpService } from '../../../http.service';
 

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css'
})
export class ReportFormComponent {

  router = inject(Router);
  route = inject(ActivatedRoute);
  httpService = inject(HttpService);
  formData: any = {};
  userId!:number;

  ngOnInit(){
    this.userId = this.route.snapshot.params['id'];
  }

  submitForm() {
    console.log('Form Data:', this.formData); 
    
    const formData = new FormData();
    formData.append('title', this.formData.title);
    formData.append('description', this.formData.description);
    formData.append('location', this.formData.location);  
    formData.append('status', "In Progress");  
    formData.append('image', this.formData.image);
    formData.append('userId', this.userId.toString());
  
    // Logging formData again to ensure correct values are appended
 
    
    this.httpService.CreateReport(formData).subscribe(
      response => {
        console.log('Report created successfully:', response);
        // Reset form after submission
        this.formData = {};
        this.router.navigateByUrl("/report-list/"+this.userId);
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      // Convert the image to a data URL
      this.formData.image = e.target.result;
    };
  
    // Read the file as a data URL
    reader.readAsDataURL(file);
  }
  
}
