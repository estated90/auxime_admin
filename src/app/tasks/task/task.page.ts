import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  public editorValue: string = '';

  id: number;
  table: string="taskManament/tasks/details?taskId=";
  table1: string="taskManament/tasks/update";
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
  this.getDataType();
  this.page= 1;
  }


    async  doSave() {


      this.postdata.taskName = this.title;
    //  this.postdata.priority = this.priority;
  //    this.postdata.description = this.content;
     // this.postdata.deadlineTask="2021-01-02T01:55:00.232";


    var  data =    {
      "taskId": "70e3f617-375f-00fc-02cd-94b61808f545",
      "accountId": this.iduser,
      "porteId": "e6101a9b-07c8-e62b-8336-3255c1eab5b9",
      "deadlineTask": "2021-01-02T01:55:00.232",
      "reminder": "2021-03-04T15:34:07.616",
      "taskName": "I called Mike.  725507",
      "description": " TEST John has free time. Tony has free time. Tony bought new car. Tony bought new car. John is shopping. ",
      "eventType": [
         this.type
      ],
      "priority": 1,
      "archived": true
      }

      console.log(this.postdata);
   
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
            this.router.navigateByUrl('/task/'+this.id);
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
      
          this.postdata = data;
          console.log(this.postdata)
          this.posts = [data];
          this.events=this.posts[0].eventType;
          this.title = data.taskName;
          this.content = data.description;
          this.deadlineTask= data.deadlineTask;
          this.priority= data.priority;
      })

     }



     getDataType(){

      this.page=1;
      this.redditService.getDataByPage(this.page,this.table3,this.per_page,this.filter).subscribe(data => {
        console.log(data);
        this.poststypes=data.eventType;
        this.total=data.totalItems;
        this.currentpage=data.currentPage;  
        this.last_page=data.totalPages;   
        console 
      })
   }  

   onChangeType(event){
    console.log(event.target.value);
  }
  
   
  
}
