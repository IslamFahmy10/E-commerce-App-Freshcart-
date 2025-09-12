import { Pipe, PipeTransform } from '@angular/core';
import { Products } from './products';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list:Products[],term:string): Products[] {
    return list.filter((i)=>(i.title.toLowerCase().includes(term.toLowerCase())));
  }

} 
