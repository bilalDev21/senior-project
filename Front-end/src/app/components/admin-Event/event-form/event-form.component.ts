import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { IEvent } from '../../../interfaces/Event';
import { HttpService } from '../../../http.service';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatInputModule, FormsModule, ReactiveFormsModule, MatToolbarModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent {

  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  
  EventForm = this.formBuilder.group({
    name:['',[Validators.required]],
    description:['',[Validators.required]], 
    type:['',[Validators.required]],
    date:['',[Validators.required]],
  });                                           
  eventId!: number;
  isEdit = false;
  ngOnInit(){
    this.eventId = this.route.snapshot.params['id'];
    if(this.eventId){
      this.isEdit = true;
      this.httpService.getEvent(this.eventId).subscribe(result =>{
        console.log(result);
        this.EventForm.patchValue(result);
        // this.employeeForm.controls.email.disable();
      })
    }
  }

  Save(){
    console.log("success");
    const event:IEvent = {
      name: this.EventForm.value.name!,
      description: this.EventForm.value.description!,
      type: this.EventForm.value.type!,
      date: this.EventForm.value.date!,
    };
    if(this.isEdit){
      this.httpService.updateEvent(this.eventId,event).subscribe(() => {
        console.log("success");
        this.router.navigateByUrl("/Event-List");
      });
    }else{
      this.httpService.CreatEvent(event).subscribe(()=>{
        console.log("success");
        this.router.navigateByUrl("/Event-List");
      });
    } 
  }
}