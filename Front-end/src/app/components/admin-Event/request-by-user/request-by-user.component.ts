import { Component, inject } from '@angular/core';
import { HttpService } from '../../../http.service';
import { IRequest } from '../../../interfaces/Request';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IStatus } from '../../../interfaces/Status';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-request-by-user',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatToolbarModule, MatFormFieldModule, MatInputModule],
  templateUrl: './request-by-user.component.html',
  styleUrls: ['./request-by-user.component.css']
})
export class RequestByUserComponent {
  httpService = inject(HttpService);

  RequestList: IRequest[] = [];
  filteredRequestList: IRequest[] = [];
  displayedColumns: string[] = ['counter', 'userName', 'eventName', 'status', 'action'];

  ngOnInit() {
    this.httpService.getAllRequest().subscribe(result => {
      this.RequestList = result;
      this.filteredRequestList = result;
      console.log(this.RequestList);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredRequestList = this.RequestList.filter(request => request.userName.toLowerCase().includes(filterValue));
  }

  Accepted(id: number) {
    const r: IStatus = {
      Status: "Accepted",
    };
    this.httpService.updateRequest(id, r).subscribe(() => {
      console.log("success");
      this.refreshList();
    });
  }

  Removed(id: number) {
    const r: IStatus = {
      Status: "Removed",
    };
    this.httpService.updateRequest(id, r).subscribe(() => {
      console.log("success");
      this.refreshList();
    });
  }

  private refreshList() {
    this.httpService.getAllRequest().subscribe(result => {
      this.RequestList = result;
      this.filteredRequestList = result;
    });
  }
}
