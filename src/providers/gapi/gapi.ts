import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GapiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GapiProvider Provider');
  }
  public helloword(){
  	console.log("lovely");
  	return 0;
  }
}
