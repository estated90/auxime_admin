import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'app-create-hote',
  templateUrl: './create-hote.page.html',
  styleUrls: ['./create-hote.page.scss'],
})
export class CreateHotePage implements OnInit {
  public editorValue: string = '';

  id: number;
  table: string="schedulerManagment/host/newAccountHost/create";


  view:boolean=true;
  push: boolean=false;
  data: any;
  posts: any;
  content: string="";
  image:string="";

  url: string="";
  urlrewiting: string="";
  meta: string="";
  keyword: string="";
  keywords: any;
  deadlineTask: any;
  postdata: any;
  events: any;


  edit:boolean=false;
  formbank:boolean=false;
  formphone:boolean=false;

  segType: string = 'info';
  indicatif : string = '+33';
  phone: any;
  street: any;
  number: any;
  complement: any;
  city: any;
  zip: any;
  addressComplement: any;
  complemement: any;
  postall: any;
  portagecompagny: string="AUXIME";
  password: any;
  roles: any;
  email: any;
  firstname: any;
  lastname: any;
  title: string="M";
  nationality: string="FRANCAISE";
 
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
   this.route.params.subscribe(params => {
      this.id = params['id']; 
  });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  
     async editpage() {
      this.segType = 'info';
      this.edit=!this.edit;
     }

     async  doSaveProfil() {

  
   var  data =  {

    "affiliatedQualiopi":true,
    "email":this.email,
    "role":"trainer",
    "title": this.title,
    "firstName": this.firstname,
    "lastName": this.lastname,
    "nationality": "FRANCAISE",
    //"nationality": this.nationality,
    "company":this.portagecompagny,



       
    }
 console.log(data);
    
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
             this.router.navigateByUrl('/hotes');
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

    
}
