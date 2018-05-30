import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var gapi:  any;
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {
	today = new Date()
  public event = {
    'summary': 'Google I/O 2015',
	  'location': '800 Howard St., San Francisco, CA 94103',
	  'description': 'A chance to hear more about Google\'s developer products.',
	  'start': {
	    'dateTime': '',
	    'timeZone': 'America/Los_Angeles'
	  },
	  'end': {
	    'dateTime': '',
	    'timeZone': 'America/Los_Angeles'
	  },
	  'recurrence': [
	    'RRULE:FREQ=DAILY;COUNT=2'
	  ],
	  'reminders': {
	    'useDefault': false,
	    'overrides': [
	      {'method': 'email', 'minutes': 24 * 60},
	      {'method': 'popup', 'minutes': 10}
	    ]
	  }
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  		console.log(this.alertCtrl);
  		// this.navCtrl.pop();
  }
  onClickCreate = () =>{
  	console.log(this.event);
  	var request = gapi.client.calendar.events.insert({
				  'calendarId': 'primary',
				  'resource': this.event,
				});

	request.execute((event)=> {
		let alert = this.alertCtrl.create({
				title: 'Inform!',
				subTitle: 'New appointment was created!',
				buttons: ['OK']
		    });
		    alert.present();
		// this.nav.setRoot(page.component);
	});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }

}
