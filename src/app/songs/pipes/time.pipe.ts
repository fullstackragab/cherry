import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number | null): string {
    if(value === null) return "00:00"
    else {
      const calc: number = parseFloat(Math.floor(value / 6000).toFixed(2));
      const calc2 = (value - calc * 60).toFixed(2);
      const tokens = calc2.split('.');
      const seconds = (tokens[0].length === 1 ? ('0' + tokens[0]) : tokens[0]) + '.' + tokens[1];
      const minutes = calc.toString();
      return (minutes.length === 1 ? ('0' + minutes) : minutes) + ':' + seconds;
    }
  }

}
