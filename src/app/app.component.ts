import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router, ActivatedRoute } from "@angular/router";
import { Deeplinks } from "@ionic-native/deeplinks/ngx";
import { AuthGuard } from '../providers/auth-guard.service';
import { AuthenticationService } from '../providers/authentication.service';
import { Storage } from '@ionic/storage';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent   {
  id: any;
  loginmenu: boolean=false;
  state:boolean=false;
  private urlParameters: Array<any> = [];
  category: string;
  lastname: any;
  role: any;
  firstname: any;
  isHome:boolean=false;
  isCalendar:boolean=false;
  isTasks:boolean=false;
  isScopes:boolean=false;
  isContrats:boolean=false;
  isPartenaires:boolean=false;
  roleUser: any;

  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private deeplinks: Deeplinks,
    private authenticationService: AuthenticationService,
    public AuthGuard: AuthGuard,
    private storage: Storage,
    public alertController: AlertController,
    public menu: MenuController,
    public menuCtrl: MenuController

    
    
  ) {

    this.initializeApp();
  }



  ionViewWillEnter(){ 
   console.log("NGYH");


   this.storage.get('roleUser').then((roleUser) => {
    this.roleUser=roleUser;
    console.log(this.roleUser);
    });
}

initializeApp() {

    this.platform.ready().then(() => {
      this.menu.enable(false);
      this.storage.get('firstname').then((firstname) => {
        this.firstname=firstname;
       });
       this.storage.get('lastname').then((lastname) => {
       this.lastname=lastname;
       });
    
       this.storage.get('role').then((role) => {
        this.role=role;
        });

      
        this.router.navigateByUrl('/login');


        
     //this.router.navigate(['/home']);     
 //   });

 // this.authenticationService.authState.subscribe(state => {
   // this.loginmenu=state;
   // console.log(this.loginmenu);
 //   });
  //  console.log("AuthGuard");
   // console.log( this.AuthGuard.canActivate());
 //    this.login= this.AuthGuard.canActivate()
      // this.setupDeeplinks();
      // this.splashScreen.hide();
      /*   this.deeplinks
        .route({
          "/home": HomePage,
        })
        .subscribe(
          (match) => {
            // match.$route - the route we matched, which is the matched entry from the arguments to route()
            // match.$args - the args passed in the link
            // match.$link - the full link data
            console.log("Successfully matched route", match);
          },
          (nomatch) => {
            // nomatch.$link - the full link data
            console.error("Got a deeplink that didn't match", nomatch);
          }
        );*/
    });
  }

  public appPages = [


    
    {
      title: '',
      url: '/edit-profile',
      icon: './assets/icon/picto_utilisateur_1.png',
      icon2: './assets/icon/picto_utilisateur_2.png',
      color:'#F4F4F4'
    },
    {
      title: 'Accueil',
      url: '/home',
      icon: './assets/icon/picto_accueil_1.png',
      icon2: './assets/icon/picto_accueil_2.png'
    },
    {
      title: 'Webinaire et collefctif',
      url: '/calendar',
      icon: './assets/icon/picto_formations_1.png',
      icon2: './assets/icon/picto_formations_2.png',
      subPages: [
        { title: 'Contrats',
        url: '/contrats-cape',
        icon: 'paper'}
    ]
    },
    {
      title: 'Formations',
      url: '/formations',
      icon: './assets/icon/picto_formations_1.png',
      icon2: './assets/icon/picto_formations_2.png'
    },
    {
      title: 'Hôtes',
      url: '/hotes',
      icon: './assets/icon/picto_formations_1.png',
      icon2: './assets/icon/picto_formations_2.png'
    },
    {
      title: 'Contrats CAPE',
      url: '/contrats-cape',
      icon: './assets/icon/picto_contrats_1.png',
      icon2: './assets/icon/picto_contrats_2.png'
    },
    {
      title: 'Tâches',
      url: '/tasks',
      icon: './assets/icon/picto_tache_1.png',
      icon2: './assets/icon/picto_tache_2.png'
    },
    {
      title: 'Types de tâches',
      url: '/events',
      icon: './assets/icon/picto_tache_1.png',
      icon2: './assets/icon/picto_tache_2.png'
    },
    {
      title: 'Mon scope',
      url: '/scopes',
      icon: './assets/icon/picto_scope_1.png',
      icon2: './assets/icon/picto_scope_2.png'
    },    
    {
      title: 'Partenaires',
      url: '/partenaires',
      icon: './assets/icon/picto_formations_1.png',
      icon2: './assets/icon/picto_formations_2.png'
    },

  
 
 /*
   {
      title: 'Mon chargé d accompagnement',
      url: '/edit-profil',
      icon: 'contacts'
    },
        subPages: [
      { title: 'Contrats',
      url: '/contrats-cape',
      icon: 'paper'},
      { title: 'Contrats',
      url: '/contrats-cape',
      icon: 'paper' },
      { title: 'Contrats',
      url: '/contrats-cape',
      icon: 'paper' },
  ]},
        {
      title: 'Pages',
      url: '/pages',
      icon: 'filing'
     },
         {
      title: 'Services',
      url: '/posts/service',
      icon: 'paper'
    },
    {
      title: 'Produits',
      url: '/products',
      icon: 'archive'
    },
   
    {
      title: 'Rendez-vous',
      url: '/appointements',
      icon: 'clock'
    },
    {
      title: 'Projects',
      url: '/projects',
      icon: 'archive'
    },

   
     {
      title: 'Entreprises',
      url: '/listing',
      icon: 'list'
    },
  
   {
      title: 'Réglages',
      url: '/settings',
      icon: 'md-settings'
    },
     {
      title: 'Notifications',
      url: '/list',
      icon: 'notifications'
    },
    {
      title: 'Exporter',
      url: '/list1',
      icon: 'list'
    },
    {
      title: 'Statistiques',
      url: '/list2',
      icon: 'md-stats'
    }*/
  ];



    async logout() {


    const alert = await this.alertController.create({
      header: 'Déconnexion',
      subHeader: '',
      message: 'Voulez-vous vraiment déconnecter ?',
      buttons: [{
        text: 'Ok',
        cssClass: 'primary',
        handler: (blah) => {
          console.log('Confirm Ok: blah');




          this.authenticationService.logout();



           setTimeout(() => { 
         //  this.login= this.AuthGuard.canActivate()
           
          this.menu.enable(false);
           this.router.navigateByUrl('/login');
         }, 1000); 
        }
      },
      {
        text: 'Annuler',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }
    ]
    });

    await alert.present();
  }


  ngAfterViewInit(){
    console.log("INIT");

    this.storage.get('firstname').then((firstname) => {
      this.firstname=firstname;
     });
     this.storage.get('lastname').then((lastname) => {
     this.lastname=lastname;
     });
  
     this.storage.get('role').then((role) => {
      this.role=role;
      });
  
  }


  reload(){

    console.log("realod"); 

    
    this.storage.get('firstname').then((firstname) => {
      this.firstname=firstname;
     });
     this.storage.get('lastname').then((lastname) => {
     this.lastname=lastname;
     });
  
     this.storage.get('role').then((role) => {
      this.role=role;
      });
  
  }


}
