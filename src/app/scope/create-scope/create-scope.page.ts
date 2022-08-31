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
  selector: 'app-create-scope',
  templateUrl: './create-scope.page.html',
  styleUrls: ['./create-scope.page.scss'],
})
export class CreateScopePage implements OnInit {
  public editorValue: string = '';

  id: number;
  table: string="accountManagement/accounts/signupPorte";
  table1: string="accountManagement/banks/details/create";
  table2: string="accountManagement/banks/createMyBank";
  table3: string="accountManagement/phones/create";
  table4: string="accountManagement/profiles/details/edit";
  table5: string="accountManagement/phones/create";

  view:boolean=true;
  push: boolean=false;
  data: any;
  posts: any;
  content: string="";
  image:string="";
  title: string="";
  url: string="";
  urlrewiting: string="";
  meta: string="";
  keyword: string="";
  keywords: any;
  deadlineTask: any;
  postdata: any;
  events: any;

  priority: any;
  postsphone: any[];
  firstname: any;
  lastname: any;
  birthplace: any;
  birthdate: any;
  childnumber: any;
  countrybirth: any;
  maritalname: any;
  nationality: any;
  socialNumber: any;
  studieslevel: any;
  maritalstatus: any;
  socialnumber: any;
  email: any;
  user: any;
  postsbanks: any;
  namebank: any;
  dombank: any;
  iban: any;
  rib: any;
  bic: any;
  profilid: any;
  profilId: any;

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
  portagecompagny: any;
  password: any;
  roles: any;


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
        "firstName": this.firstname,
        "lastName": this.lastname,
        "title": "Monsieur",
        "email": this.email,
        "role": ["ROLE_USER"],
        "password": this.password,
        "portageCompany": this.portagecompagny,
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
             this.router.navigateByUrl('/scope/'+response.accountsId);
            }, 400); 
           
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
