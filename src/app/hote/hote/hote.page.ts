import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-hote',
  templateUrl: './hote.page.html',
  styleUrls: ['./hote.page.scss'],
})
export class HotePage implements OnInit {

  public editorValue: string = '';

  id: number;
  table: string="schedulerManagment/host/details?id=";
  table1: string="schedulerManagment/host/update";
  table3: string="taskManament/eventType/listEvent";
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
  nationality: any;

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


     // this.postdata.taskName = this.title;
    //  this.postdata.priority = this.priority;
  //    this.postdata.description = this.content;
     // this.postdata.deadlineTask="2021-01-02T01:55:00.232";


    var  data =    {


      "hostId":this.id,
      "accountId": this.iduser,
      "email": this.email
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
            this.router.navigateByUrl('/hotes');
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
        console.log("-----------data-----------");
        console.log(data);
          this.firstname = data.firstName;
          this.lastname = data.lastName;
          this.email= data.email;
          this.priority= data.priority;
          this.portagecompagny=data.company    
      })

     }



  
   
  
}
