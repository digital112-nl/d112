import { Injectable } from '@angular/core';
import * as Fuse from 'fuse.js';
import * as _ from 'lodash';

@Injectable()
export class FuseService {
  /**
   * Default Options
   */
  public defaults: FuseOptions = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    minSearchStringLength: 1
  };

  /**
   * Search Options
   */
  public searchOptions: FuseOptions = this.defaults;

  /**
   * Search Function
   */
  public search(
    collection: any[],
    searchString: string,
    options: FuseOptions = {}
  ) {
    if ( collection.length > 0 && _.isString(collection[ 0 ]) ) {
      return this.stringSearch(collection, searchString);
    }

    const settings = Object.assign(this.searchOptions, this.defaults, options);
    return this.baseSearch(collection, searchString, settings);
  }

  private stringSearch(
    collection: any[],
    searchString: string
  ) {
    const settings = Object.assign(this.searchOptions, this.defaults, {
      keys: [ 'str' ]
    });

    collection = collection.map((str) => ({ str }));

    return this.baseSearch(collection, searchString, settings)
      .map((result) => result.str);
  }

  private baseSearch(
    collection: any[],
    searchString: string,
    settings: FuseOptions
  ): any[] {
    let results = [];
    if ( searchString && searchString.length >= this.searchOptions.minSearchStringLength ) {
      const fuse = new Fuse(collection, settings);
      results = fuse.search(searchString);
      return results;
    } else {
      return collection;
    }
  }
}

export interface FuseOptions extends Fuse.FuseOptions {
  minSearchStringLength?: 1;
}
