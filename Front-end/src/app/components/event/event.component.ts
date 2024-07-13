import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IEvent } from '../../interfaces/Event';
import { HttpService } from '../../http.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ICreateRequest } from '../../interfaces/CreateRequest';
import { ButtonStateService } from '../../button-state.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatToolbarModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  buttonStateService = inject(ButtonStateService);  // Inject the service

  EventList: IEvent[] = [];
  displayedColumns: string[] = ['counter', 'name', 'description', 'type', 'date', 'action'];

  userId!: number;

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    console.log(this.userId);
    this.httpService.getAllEvent().subscribe(result => {
      this.EventList = result.map(event => ({
        ...event,
        date: this.formatDate(event.date)
      }));
      console.log(this.EventList);
    });
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  isButtonDisabled(eventId: number): boolean {
    return this.buttonStateService.isButtonDisabled(this.userId, eventId);
  }

  Book(id: number) {
    const request: ICreateRequest = {
      eventId: id,
      userId: this.userId,
      Status: "In Progress"
    };

    this.httpService.CreatRequest(request).subscribe(() => {
      console.log("success");
      this.buttonStateService.setButtonDisabled(this.userId, id, true);  // Disable the button for this user
      this.router.navigateByUrl("/requests-user/" + this.userId);
    });
  }
}
