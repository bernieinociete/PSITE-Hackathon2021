import { Component } from '@angular/core';
import geoDistance from './geoDistance';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PSITE-Hackathon2021';

  distance: any;
  ngOnInit() {
    
    const point1 = { lat: 36, lng: 42}
    const point2 = { lat: 64, lng: 21}

    this.distance = geoDistance(point1, point2, 'K')
    const eta = 23/this.distance
    console.log(this.distance)
  }
}
