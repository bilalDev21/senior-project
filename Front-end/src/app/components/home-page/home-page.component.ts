import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, RouterLink, MatIconModule],
  templateUrl: './home-page.component.html',
  styleUrl:'./home-page.component.css'
 
})
export class HomePageComponent {

}
