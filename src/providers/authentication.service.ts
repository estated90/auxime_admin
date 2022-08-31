import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform, MenuController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from "jwt-decode";
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthenticationService {

  authState = new BehaviorSubject(false);
  token: string;
  decoded: any;
  getroleuser: any;
  userRole: number;
  roleUser: number;
  newroleUser: any;
  myroleUser: any;

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
    public http: HttpClient,
    private menu: MenuController,
    public navCtrl: NavController

  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  login(userinfo) {
    this.storage.set('USER_INFO', userinfo).then((response) => {
      console.log(response);
   //   this.router.navigate(['dashboard']);
      this.authState.next(true);
      this.decodeToken();
    });

    
  }

  logout() {

    this.storage.remove('token').then(() => {});
    this.storage.remove('iduser').then(() => {});
    this.storage.remove('role').then(() => {});
    this.storage.remove('roleUser').then(() => {});
    this.storage.remove('roleEditor').then(() => {});

    this.storage.remove('firstname').then(() => {
    
    });


   this.storage.remove('lastname').then(() => {
    
    });

   this.storage.remove('phone_number').then(() => {
    
    });

    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }


   getToken(): string {
    this.storage.get('token').then((token) => {
     this.token=token
   });
   return this.token;
  }  
  

  getrefreshToken(): string {
    this.storage.get('refreshToken').then((token) => {
     this.token=token
   });
   return this.token;
  }  
  
  getRoleUser(): any {
    this.storage.get('roleUser').then((roleUser) => {
     this.myroleUser=roleUser
   });
   return this.myroleUser;
  }  


  decodeToken(){
    this.token=this.getToken();
    this.decoded = jwt_decode(this.token); 
    console.log(this.decoded);
    this.storage.set('iduser', this.decoded.sub);
    this.storage.set('firstname', this.decoded.firstName);
    this.storage.set('lastname', this.decoded.lastName);
    this.storage.set('role', this.decoded.roles);
    this.newroleUser=this.decoded.roles[0];
    this.roleUser=this.getRole();
    console.log("------ROLE USER --------");
    console.log(this.roleUser);
    this.getMenu();
    this.storage.set('roleUser', this.roleUser);
 
  


    setTimeout(() => { 

      this.navCtrl.navigateRoot('/home');
      }, 1500); 
    
  }

  getMenu(){
    console.log("------MENU ROLE --------");

    console.log(this.roleUser);

    if(this.roleUser==1||this.roleUser==2){
      this.menu.enable(true, 'menu1');
      this.storage.set('roleEditor',false);
    }


    if(this.roleUser==5){
      this.menu.enable(true, 'menu1');
      this.storage.set('roleEditor',true);
    }

    if(this.roleUser==3||this.roleUser==4){
      this.menu.enable(true, 'menu3');
      this.storage.set('roleEditor',true);
    }

    if(this.roleUser==5||this.roleUser==6){
      this.menu.enable(true, 'menu5');
      this.storage.set('roleEditor',true);
    }


    if(this.roleUser==7||this.roleUser==8 ||this.roleUser==9||this.roleUser==10||this.roleUser==11){
      this.menu.enable(true, 'menu7');
      this.storage.set('roleEditor',true);
    }

    if(this.roleUser==12 ||this.roleUser==13 ||this.roleUser==14){
      this.menu.enable(true, 'menu12');
      this.storage.set('roleEditor',true);
    }

    if(this.roleUser==15 ||this.roleUser==16 ){
      this.menu.enable(true, 'menu15');
      this.storage.set('roleEditor',true);
    }
  }

  getRole(){

 


  
    if(this.newroleUser == "ROLE_USER"){
      return 1
    }
    if(this.newroleUser == "ROLE_DEVELOPMENT"){
      return 2
    }
    if(this.newroleUser == "ROLE_EXTERNAL_TRAINER"){
      return 3
    }
    if(this.newroleUser == "ROLE_INTERNAL_TRAINER"){
      return 4
    }
    if(this.newroleUser == "ROLE_QUALIOPI"){
      return 5
    }
    if(this.newroleUser == "ROLE_COUNSELOR"){
      return 6
    }
    if(this.newroleUser == "ROLE_ACCOUNTANCY_MANAGER"){
      return 7
    }
    if(this.newroleUser == "ROLE_INVOICING"){
      return 8
    }
    if(this.newroleUser == "ROLE_FSE"){
      return 9
    }
    if(this.newroleUser == "ROLE_EXPENSES"){
      return 10
    }
    if(this.newroleUser == "ROLE_PAYROLL_MANAGER"){
      return 11
    }
    if(this.newroleUser == "ROLE_DIRECTOR"){
      return 12
    }
    if(this.newroleUser == "ROLE_SHAREHOLDER"){
      return 13
    }
    if(this.newroleUser == "ROLE_IT"){
      return 14
    }
    if(this.newroleUser == "ROLE_APP"){
     // this.menu.enable(true, 'menu2');
      return 15
    }
     if(this.newroleUser == "ROLE_ADMIN"){
    // this.menu.enable(true, 'menu2');
      return 16
    }
    
  }




   
   
  






}