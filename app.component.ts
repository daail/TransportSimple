import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  
})
export class AppComponent {
  title = 'TransportSimple';
  startPoint = '';
  endPoint = '';

  trips: { from: string; to: string }[] = [];

  addTrip() {
    if (this.startPoint && this.endPoint) {
      this.trips.push({ from: this.startPoint, to: this.endPoint });
      this.startPoint = '';
      this.endPoint = '';
    }
  }

  getProcessedTrips() {
    const result: { code: string; level: number; type: string }[] = [];
    let prevTrip = null;
    const seen = new Set();

    for (let trip of this.trips) {
      const from = trip.from.slice(0, 3).toUpperCase();
      const to = trip.to.slice(0, 3).toUpperCase();
      const key = `${from}_${to}`;
      const code = `${from} - ${to}`;

      let type = 'straight';
      let level = 1;

      if (seen.has(key)) {
        level = 2;
        type = 'duplicate';
      } else if (prevTrip && prevTrip.to.slice(0, 3).toUpperCase() !== from) {
        type = 'arrow';
      }

      seen.add(key);
      result.push({ code, level, type });
      prevTrip = trip;
    }

    return result;
  }
  resetTrips() {
    this.trips = [];
    this.startPoint = '';
    this.endPoint = '';
  }
}
