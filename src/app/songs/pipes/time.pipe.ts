import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number | null): string {
    if(value === null) return "00:00"
    else {
      console.log(value);
      const minutes: number = Math.floor(value  / 60); // .toFixed(2));
      const seconds = Math.floor(value % 60); // (value - calc * 60).toFixed(2);
      // const tokens = calc2.split('.');
      // const seconds = (tokens[0].length === 1 ? ('0' + tokens[0]) : tokens[0]); // + '.' + tokens[1];
      // const minutes = calc.toString(); 
      const result =  (minutes < 10 ? ('0' + minutes) : minutes) + ':' + seconds;
      return result;
    }
  }

}
