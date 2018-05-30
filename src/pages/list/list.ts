import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { Observable }               from 'rxjs/Observable';
// import { fromPromise } from 'rxjs/observable/fromPromise';
declare var gapi:  any;
// import { GapiProvider } from '../../providers/gapi/gapi';
/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
	  appointments:any = null;
	  constructor(public navCtrl: NavController, public navParams: NavParams) {
      // this.listUpcomingEvents();
      
	    
    }

  ngOnInit(){
     // let subscription = fromPromise(this.listUpcomingEvents())
     //  subscription.subscribe((response) => {
     //    console.log(response.result);
        
     //    // this.appointments = response.result.items;
     //  })

     let a = this.listUpcomingEvents()
      console.log(a);
      this.appointments = null;

       this.listUpcomingEvents().then(res =>{
       console.log(res.result.items);
       this.appointments = res.result.items;
       console.log("appointments:",this.appointments);
     });


      
  }

  	public listUpcomingEvents = ()=> {
        return gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        })
    }
}
