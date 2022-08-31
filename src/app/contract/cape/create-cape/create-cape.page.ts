import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { ModalSearchPortePage } from '../../modal-search-porte/modal-search-porte.page';
import { ModalCreateSlidePage } from 'src/app/home/modal-create-slide/modal-create-slide.page';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'app-create-cape',
  templateUrl: './create-cape.page.html',
  styleUrls: ['./create-cape.page.scss'],
})
export class CreateCapePage implements OnInit {


  modelData: any;


  id: number;
  table: string="thirdparty/clients/list";
  table2: string="contractManagement/commercialContract/create";
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
  per_page:number=100;
  filter: any="";
  page: number;
  events: any;
  deadlineTask: Date;
  priority: number=1;
  event: any;
  iduser: any;
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
  contractsName: any;

  exitstatus: any="";

  duration: any="6";
  monthlyAmount: any="5000";
  globalAmount: any="10000";
  monthlyAmountunity:any="MONTHS";


  name: any;
  contractsDurations: any;
  contractsStates: any;
  contractStatus: any;

  startDate: any = new Date().toISOString();
  endDate: any = new Date().toISOString();
  contractDate: any = new Date().toISOString();

  clients: any;
  compagny: any="AUXIME";

  idclient: any="";
  idporte: any="";
  dataReturned: any;

  
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
    private modalController: ModalController,
    private datePipe: DatePipe) {

   }

  ngOnInit() {

    this.storage.get('iduser').then((val) => {
      this.iduser=val;
    });



   this.page=1;
    this.redditService.getcontractsName().subscribe(data => {
      this.contractsName=data;
    })
    this.redditService.getcontractsState().subscribe(data => {
      this.contractsStates=data;
    })
    this.redditService.getcontractdurationUnits().subscribe(data => {
      this.contractsDurations=data;
    })
    this.redditService.getDataPartenaires(this.page,this.table,this.per_page,this.exitstatus,this.filter).subscribe(data => {
      this.clients=data.clients;
    })
     }  


  
   doSave(){


   // this.deadline= this.datePipe.transform(this.deadline,"yyyy-MM-ddTHH:00:00");
  //  this.dayHourEvent= this.datePipe.transform(this.dayHourEvent,"yyyy-MM-ddTHH:00:00");
  var data = {
    "accountId": this.idporte,
    "startingDate": this.endDate,
    "contractTitle": this.name,
    "structureContract": this.compagny,
    "contractDate": this.contractDate,
    "clientId": this.idclient,
    "endDate": this.startDate,
    "globalAmount": this.globalAmount,
    "monthlyAmount": this.monthlyAmount,
    "missionDuration": this.duration,
    "durationUnit": this.monthlyAmountunity,
  };



this.redditService.addPost(this.table2,data)  
.subscribe(async (response) => {
    setTimeout(() => { 
    this.router.navigateByUrl('/contrats-cape');
   }, 500); 
 },
 (error) => {
    console.log("----------- ");
    console.log(error);
 });
}

onChangeType(event, item){
  this.trainingId=event.target.value;
}


onChangeTypeDuration(event, item){
  this.monthlyAmountunity=event.target.value;

}
onChangeHost(event, item){
  console.log(event);
  this.hostid=event.target.value;
 console.log(this.hostid);
}


doCancel(){
   setTimeout(() => { 
   this.router.navigateByUrl('/contrats-cape');
  }, 1000); 

}




  async openModal() {
    const modal = await this.modalController.create({
      component: ModalSearchPortePage
    });
  
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
       console.log(dataReturned);


       this.idporte = dataReturned.data.idporte;
       this.firstname = dataReturned.data.firstname;
       this.lastname = dataReturned.data.lastname;
  
        setTimeout(() => { 
        //  this.getHomeSlider();
    
         }, 400); 
        
  
  
      
      }
    });
  
    return await modal.present();
  }
  


}
