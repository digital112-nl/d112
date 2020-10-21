import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'initials',
  pure: true
})
export class InitialsPipe implements PipeTransform {

  transform(value: string): any {
    if ( _.isNil(value) ) {
      return '';
    }

    const parts = `${value}`.match(/\b\w/g) || [];

    return ((parts.shift() || '') + (parts.pop() || '')).toUpperCase();
  }

}
