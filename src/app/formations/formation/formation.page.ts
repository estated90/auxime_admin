import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-formation',
  templateUrl: './formation.page.html',
  styleUrls: ['./formation.page.scss'],
})
export class FormationPage implements OnInit {


  public editorValue: string = '';

  id: number;
  table: string="schedulerManagment/training/details?trainingId=";
  table1: string="schedulerManagment/training/update";

  category:string="page";
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
  edit:boolean=false;
  priority: any;

  currentpage: number;
  total:number=0;
  last_page:number=0;
  per_page:number=10;
  order_id:any="id";
  order_by:any="desc";
  page: number;
  filter: any="";
  poststypes: any;
  iduser: any;
  type: any;
  email: any;
  lastname: any;
  firstname: any;
  portagecompagny: any;
  duration: any;
  parcourstype: any;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private storage: Storage) {
   }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.id = params['id']; 
  });

  this.storage.get('iduser').then((iduser) => {
    this.iduser=iduser;
    });

  this.getdata();
  this.page= 1;
  }


    async  doSave() {
    var  data =    {

      "trainingName":this.title,
      "trainingDescription":this.content,
      "parcourType":this.parcourstype,
      "duration":this.duration,
      "trainingId":this.id
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
         
           
          
          this.redditService.updateByid(this.table1,data) 
          .toPromise()
          .then((response) =>

          {
            console.log(response);
            setTimeout(() => { 
            this.editpage();
            this.router.navigateByUrl('/formations');
           }, 400); 
          
          })
        }}]
        });
        await alert.present();
    
     }


     async editpage() {
      this.edit=!this.edit;

     }
  
     async getdata() {
      this.redditService.getByid(this.table, this.id).subscribe(data=>{
          this.title = data.trainingName;
          this.content = data.trainingDescription;
          this.duration= data.duration;
          this.parcourstype= data.parcourType;          
      })

     }



  
   
  
}
