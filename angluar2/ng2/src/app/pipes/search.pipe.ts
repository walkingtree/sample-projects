import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchEmployee'
})
export class SearchPipe implements PipeTransform {

  transform(values: any, args?: any): any {
      if (values) {
          return values.filter(value => {
              if (value) {
                  return  value[Object.keys(args)[0]].toUpperCase().indexOf(args[Object.keys(args)[0]].toUpperCase()) != -1;
              }
          });
      }
  }

}
