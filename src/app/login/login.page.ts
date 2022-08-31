import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../../providers/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public onLoginForm: FormGroup;
  email: any;
  password: number;
  token: any;
  password2: string | Int32Array;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public LoadingController: LoadingController,
    private formBuilder: FormBuilder,
    public redditService:RedditService,
    private router: Router,
    public alertController: AlertController,
    private storage: Storage,
    private authService: AuthenticationService
  ) { }

  ionViewWillEnter() {
 
   
    this.storage.get('email').then((email) => {
     this.email=email;
    });
    this.storage.get('password').then((password) => {
    this.password=password;
    });
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }



  async goLogin() {
    
    const loader = await this.LoadingController.create({
    message: 'Connexion en cours',
    });
    loader.present();

     this.storage.set('password', this.password);
     this.storage.set('email', this.email);

      var data =  { 
      username:this.email,
      password:this.password,
      }; 



       this.redditService.login(data).subscribe(async (response) => {


         console.log(response);

        setTimeout(() => { 
           loader.dismiss();
         }, 1300); 
         
          const toast = await this.toastCtrl.create({
          showCloseButton: true,
          cssClass: 'bg-profile',
          message: 'Connexion réussie ',
          duration: 3000,
          position: 'bottom',
          closeButtonText: 'Fermer'
        });
        toast.present();
  
      this.authService.login(response);
   this.storage.set("token",response.token);
   this.storage.set("refreshToken",response.refreshToken);
   this.storage.set("expirationDate",response.expirationDate);


      setTimeout(() => { 
        handler: async () => {
          
        }

        this.getDataCategory();

            
         }, 2000); 
         
       
              loader.dismiss();
          
         
        },
       error => {    
      console.log(error);
      loader.dismiss();
    //  this.presentAlertError();
      this.presentAlert();
      });
      
  }
 

  async goToRegister() {
    this.router.navigateByUrl('/register');
  }

  async forgotPass() {
    this.router.navigateByUrl('/forgotpassword');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Erreur',
      subHeader: '',
      message: 'E-mail ou mot de passe incorrect',
      buttons: [{
        text: 'Ok',
        cssClass: 'primary',
        handler: (blah) => {
          console.log('Confirm Ok: blah');
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

  async presentAlertError() {
    const alert = await this.alertController.create({
      header: 'Erreur',
      subHeader: '',
      message: 'Vous devez être administrateur ',
      buttons: [{
        text: 'Ok',
        cssClass: 'primary',
        handler: (blah) => {
          console.log('Confirm Ok: blah');
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



  getDataCategory(){
 
     this.redditService.getExitStatus().subscribe(data => {
       this.storage.set("ExitStatus",data);
      })


      this.redditService.getOccupation().subscribe(data => {
        this.storage.set("Occupation",data);
       })
 
      
      
     this.redditService.getphoneNumberType().subscribe(data => {
      this.storage.set("PhoneNumberType",data);
     })


     this.redditService.getRoleNames().subscribe(data => {
      this.storage.set("getRoleNames",data);
     })



   }  



}
