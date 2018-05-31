import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list'

declare var gapi: any;
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	gapi.load('client:auth2', this.initClient);
  }

  ionViewDidLoad() {
    
  }

  onClickLogin(){
  	gapi.auth2.getAuthInstance().signIn().then(()=>{
  		gapi.load('client:auth2', this.initClient);
  	});
  	
  }

  	initClient = () =>{
  			
		  	let CLIENT_ID = '1039414325227-5lrrm5itmjfc77kefd494o2tlsvlabsj.apps.googleusercontent.com';
			let API_KEY = 'AIzaSyCoTO2G5lD5G-doyK8LtK4YW_jkHjAl_F8';
			let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
			let SCOPES = "https://www.googleapis.com/auth/calendar";
			gapi.client.init({
			  apiKey: API_KEY,
			  clientId: CLIENT_ID,
			  discoveryDocs: DISCOVERY_DOCS,
			  scope: SCOPES
			}).then(() => {

			  // Listen for sign-in state changes.
			  gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
  	
			  // Handle the initial sign-in state.
			  this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
			});
		}
	updateSigninStatus = (isSignedIn) =>{
		if (isSignedIn){
			this.navCtrl.setRoot(ListPage);
		}
	}
}
