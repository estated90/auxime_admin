import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'app-create-formation',
  templateUrl: './create-formation.page.html',
  styleUrls: ['./create-formation.page.scss'],
})
export class CreateFormationPage implements OnInit {



  id: number;
  table: string="schedulerManagment/training/create";
  data: any;
  posts: any;
  content: string="";
  image:string="";
  title: string="";
  email: any;
  address: any;
  city: any;
  cp: any;
  phone: any;
  firstname: any;
  lastname: any;
  per_page:number=10;
  filter: any="";
  page: number;
  events: any;
  deadlineTask: Date;
  priority: number=1;
  event: any;
  iduser: any;

  dayHourEvent: Date= new Date();
  deadline: Date= new Date();
  nbrAttendant: any= 2;

  Date = new Date()
  last_page: any;
  currentpage: any;
  total: any;
  trainings: any;
  trainingId: any;
  hosts: any;
  host: any;
  hostid: any;
  training: any;
  name: any;
  parcourstype: any;
  duration: any;

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

    this.storage.get('iduser').then((val) => {
      this.iduser=val;
    });
  }
   doSave(){

  var data = {
  "trainingName":  this.title,
  "trainingDescription":  this.content,
  "parcourType": this.parcourstype,
  "duration":this.duration,
  };

console.log(data);

this.redditService.addPost(this.table,data)  
.subscribe(async (response) => {
    setTimeout(() => { 
    this.router.navigateByUrl('/formations');
   }, 400); 
})
}


}


