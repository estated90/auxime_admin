import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.page.html',
  styleUrls: ['./create-client.page.scss'],
})
export class CreateClientPage implements OnInit {

  public editorValue: string = '';

  id: number;
  table: string="thirdparty/clients/create";
  indicatif : string = '+33';
  phone: any;
  street: any;
  number: any;
  complement: any;
  city: any;
  zip: any;
  addressComplement:  string="";
  complemement: any;
  postall: any;
  portagecompagny: any;
  password: any;
  roles: any;
  addressLine1:  string="";
  name: any;
  siren: any;


  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private datePipe: DatePipe) {
   }

  ngOnInit() {
 
  }

  

  async  doSaveProfil() {

  
   var  data =  {
    denomination: this.name,
    addressComplement: this.addressComplement,
    addressLine1:this.addressLine1,
    city: this.city,
    country: "France",
    number: this.number,
    street: this.street,
    zip:this.zip,
    siren:this.siren,
    }
 
    
       const alert = await this.alertController.create({
         header: 'Enregistrement',
         message: 'Voulez-vous vraiment ? ',
         buttons: [
           {
             text: 'Annuler',
             role: 'cancel',
             cssClass: 'secondary',
             handler: (blah) => {
             }
           }, {
             text: 'Oui',
             handler: () => { 
          
           this.redditService.addPost(this.table,data) 
           .toPromise()
           .then((response) =>
 
           {
             console.log(response);
             setTimeout(() => {
             this.router.navigateByUrl('/clients');
            }, 1000); 
           
           })}}]
         });
         await alert.present();
     
      }



  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Erreur',
      subHeader: '',
      message: 'Enregistrement incorrect',
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



  async cancel() {
    this.router.navigateByUrl('/clients');
  }


    
}

