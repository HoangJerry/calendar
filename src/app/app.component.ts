import { Component, ViewChild  } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController, NavParams, Nav } from 'ionic-angular';
declare var gapi:  any;
// import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { CreatePage } from '../pages/create/create';

export interface PageInterface{
  name: string;
  component: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = LoginPage;
  pages: PageInterface [] =[
    {name:"List page", component:ListPage},
    {name:"Create new", component:CreatePage}
  ]
  @ViewChild(Nav) nav:Nav;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ngAfterViewInit(){
    setTimeout(() => {
        console.log(this)
        this.nav.push(LoginPage);
      }, 2000);
  }

  openPage(page: PageInterface) {
    this.nav.setRoot(page.component);
    // this.navCtrl.setPages(page.component);
    // this.navCtrl.setRoot(page.component);
    // this.navCtrl.push(page.component).then(()=>{
  //           this.nav.setRoot(page.component);
  //           // this.navCtrl.pop();
  //     });
  }

  logout() {
    gapi.auth2.getAuthInstance().signOut().then(()=>{
        gapi.load('client:auth2', this.initClient);
        // this.nav.push(LoginPage);
      });
  }

  initClient = () =>{
        let CLIENT_ID = '1039414325227-5lrrm5itmjfc77kefd494o2tlsvlabsj.apps.googleusercontent.com';
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
      this.nav.push(LoginPage)
    }
  }
}

