import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { IEvent } from '../../../interfaces/Event';
import { HttpService } from '../../../http.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatToolbarModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent {
  router = inject(Router);
  httpService = inject(HttpService);

  EventList: IEvent[] = [];
  displayedColumns: string[] = ['counter', 'name', 'description', 'type', 'date', 'action'];

  ngOnInit() {
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

  Edit(id: number) {
    console.log(id);
    this.router.navigateByUrl("/create-event/" + id);
  }

  delete(id: number) {
    this.httpService.deleteEmployee(id).subscribe(() => {
      console.log("deleted");
      this.EventList = this.EventList.filter(x => x.id != id);
    })
  }
}
