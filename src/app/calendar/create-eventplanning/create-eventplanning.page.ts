import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'app-create-eventplanning',
  templateUrl: './create-eventplanning.page.html',
  styleUrls: ['./create-eventplanning.page.scss'],
})
export class CreateEventplanningPage implements OnInit {


  id: number;
  table: string="schedulerManagment/eventPlanning/create";
  table2: string="schedulerManagment/training/list";
  table3: string="schedulerManagment/host/allHosts";
  table4: string="schedulerManagment/training/details?trainingId=";
  
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

  dayHourEvent: any = new Date().toISOString();
  deadline: any = new Date().toISOString();
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
  trainingname: any;
  trainingdescription: any;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private storage: Storage,
    private datePipe: DatePipe) {
   }

  ngOnInit() {

    this.storage.get('iduser').then((val) => {
      this.iduser=val;
    });
    this.redditService.allData(this.table3).subscribe(data => {
      console.log(data);
      this.hosts=data.hosts;
      this.hostid=data.hosts[0].hostId;
    
    })
   this.page=1;
    this.redditService.allData(this.table2).subscribe(data => {
      this.trainings=data.trainings;
      this.trainingId=data.trainings[0].trainingId;
    })

   


  }
   doSave(){

   // this.deadline= this.datePipe.transform(this.deadline,"yyyy-MM-ddTHH:00:00");
  //  this.dayHourEvent= this.datePipe.transform(this.dayHourEvent,"yyyy-MM-ddTHH:00:00");
  var data = {
  "dayHourEvent":  this.dayHourEvent,
  "nbrAttendant":  this.nbrAttendant,
  "deadline": this.deadline,
  "trainingId":this.trainingId,
  "hostId": this.hostid
  };

console.log(data);

this.redditService.addPost(this.table,data)  
.subscribe(async (response) => {
    setTimeout(() => { 
    this.router.navigateByUrl('/calendar');
   }, 1000); 
})
}


onChangeType(event: { target: { value: any; }; }){
  this.trainingId=event.target.value;
    this.redditService.getByid(this.table4, this.trainingId).subscribe(data=>{
      //  this.trainingname=data.trainingName;
        this.trainingdescription=data.trainingDescription;
    })

  
}
onChangeHost(event: { target: { value: any; }; }){
  console.log(event);
  this.hostid=event.target.value;
 console.log(this.hostid);
}


doCancel(){
   setTimeout(() => { 
   this.router.navigateByUrl('/calendar');
  }, 1000); 

}

}


