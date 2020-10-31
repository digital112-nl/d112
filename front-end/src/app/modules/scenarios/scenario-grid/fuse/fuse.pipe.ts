import { Pipe, PipeTransform } from '@angular/core';
import { FuseService, FuseOptions } from './fuse.service';

@Pipe({ name: 'diFuse' })
export class FusePipe implements PipeTransform {
  constructor(
    private fuseService: FuseService
  ) {
  }

  /**
   * Transform Data
   */
  public transform(
    collection: any[],
    searchString: string,
    options: FuseOptions = {}
  ): any {
    return this.fuseService.search(collection, searchString, options);
  }
}
