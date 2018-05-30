import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
declare var gapi:  any;
import { ListPage } from '../list/list';
import { CreatePage } from '../create/create';
import { LoginPage } from '../login/login';

export interface PageInterface{
	name: string;
	component: any;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	rootPage:any = ListPage;

	@ViewChild(Nav) nav:Nav;

	pages: PageInterface [] =[
		{name:"List page", component:ListPage},
		{name:"Create new", component:CreatePage}
	]

	weekday: any[];
	month: any[];
	h : any;
    m : any;
    s : any;
    d : any;
    y : any;
    wd : any;
    mt : any;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
       this.weekday=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
       this.month=['January','February','March','April',
       				'May','June','July','August','September',
       				'October','November','December'];
    }
    ionViewDidLoad() {
        return this.startTime();
    }
	startTime = () => {
		var today = new Date();
		console.log(today);
		this.h = today.getHours();
	    this.m = today.getMinutes();
	    this.s = today.getSeconds();
	    this.d = today.getDate();
	    this.y = today.getFullYear();
	    this.wd = this.weekday[today.getDay()];
	    this.mt = this.month[today.getMonth()];

	    this.m = this.checkTime(this.m);
    	this.s = this.checkTime(this.s);

	}

	checkTime(i) {
	    if (i < 10) {i = "0" + i};
	    return i;
	}

	openPage(page: PageInterface) {
		// this.nav.setRoot(page.component);
		// this.navCtrl.setPages(page.component);
		this.navCtrl.push(page.component).then(()=>{
            this.nav.setRoot(page.component);
            // this.navCtrl.pop();
      });
	}

	logout() {
		gapi.auth2.getAuthInstance().signOut().then(()=>{
	  		gapi.load('client:auth2', this.initClient);
	  	});
	}

	initClient = () =>{
		  	let CLIENT_ID = '1039414325227-qdtmn44sh4kivr9s3spq59niq5p7ro0f.apps.googleusercontent.com';
			let API_KEY = 'AIzaSyBAATV6OZmGn78Z9q-K20OiiLb3tyFFGK4';
			let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
			let SCOPES = "https://www.googleapis.com/auth/calendar";
			gapi.client.init({
			  apiKey: API_KEY,
			  clientId: CLIENT_ID,
			  discoveryDocs: DISCOVERY_DOCS,
			  scope: SCOPES
			}).then(() => {

			  // // Listen for sign-in state changes.
			  gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
  	
			  // // Handle the initial sign-in state.
			  this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
			});
		}

	updateSigninStatus = (isSignedIn) =>{
		if (!isSignedIn){
			this.navCtrl.setRoot(LoginPage)
		}
	}


}
