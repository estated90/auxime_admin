import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CalendarComponentOptions } from 'ion2-calendar';
import { ModalCreateSlidePage } from './modal-create-slide/modal-create-slide.page';
import { AuthenticationService } from 'src/providers/authentication.service';
import { ModalEditSlidePage } from './modal-edit-slide/modal-edit-slide.page';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  dateRange: { from: string; to: string; };
  type: 'string';
  
  optionsRange: CalendarComponentOptions = {
    monthFormat: 'YYYY 年 MM 月 ',
    weekdays: ['天', '一', '二', '三', '四', '五', '六'],
    weekStart: 1,
  };

  iduser: any;
  id: number;
  table: string="schedulerManagment/eventPlanning/allEvents";

  table2: string="homepage/slider";
  category:string="page";
  postStat: any;
  postSlider: any;

  contractValidated: any=0;
  invoice: any=0;
  trainingIncomming: any=0;
  imageid: any;
  sliderdata: any = [];
  posts: any;
  eventsdata: number;
  startdate:any = "2022-01-01";
  enddate: any= "2025-01-01";
  per_page:number=100;
  order_id:any="id";
  order_by:any="desc";
  page:any=1;
  filter: any="";
  priority:boolean=true;
  calendarOptions: any;
  allEvents: any[];

  contractToModify: any;
  contractToValidate: any;
  numberPorte: any;
  numberPorteExiting: any;
  taskDeadlines: any;
  trainingSubscribed : any;

  slideOpts = {
    autoplay: true,
    initialSlide: 1,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 0,
    zoom:{
      maxRatio: 1
    }
  };
  imagedata: any;
  imagedatatype: any;
  dataReturned: any;
  roleUser: any;
  calendarevents: any[];
  eventsall: { allDay: boolean; backgroundColor: string; data: string; start: string; title: string; }[];


  arr:[]  = []; 
  dateMulti: string[];
  dateList: string[] ;
  datearray :string;
  //type ='string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  };
  newdate: never;
 
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
      private alertCtrl: AlertController,
      public modalController: ModalController,
      private authService: AuthenticationService,
      private datePipe: DatePipe) {


     }

    


     ionViewWillEnter(){ 
      this.getHomeSlider();
        this.eventsall = [{
          allDay: true,
          backgroundColor: "#00BCD4",
          data: "3e65683b-7a1e-4e08-818c-eeda530c712e",
          start: "2022-08-10",
          title: "Excel "
      }];

   

      this.storage.get('roleUser').then((roleUser) => {
        this.roleUser=roleUser;
        console.log("--------------ROLE USER STORAGE----------")
      console.log(this.roleUser)
       });

    }


  ngOnInit() {
    console.log("--------------ROLE USER STORAGE----------")
    console.log(this.roleUser)

  this.getHomeStat();
  this.getData();

  }



  getToken(){
    this.redditService.refreshToken().subscribe(data=>{
  
      console.log(data); 

      this.storage.set("token",data.token);
      this.storage.set("refreshToken",data.refreshToken);
      this.storage.set("expirationDate",data.expirationDate);
 
      })
   }

   getHomeStat(){

    this.redditService.getHomaPageStat().subscribe(data=>{
      this.postStat = data; 

      this.contractValidated = data.contractValidated;
      this.invoice = data.invoice;
      this.trainingIncomming = data.trainingIncomming;


      this.contractToModify=data.contractToModify;
      this.contractToValidate=data.contractToValidate;
      this.contractValidated=data.contractValidated;
      this.invoice=data.invoice;
      this.numberPorte=data.numberPorte;
      this.numberPorteExiting =  data.numberPorteExiting;
      this.taskDeadlines =  data.taskDeadlines;
      this.trainingIncomming =  data.trainingIncomming;
      this.trainingSubscribed = data.trainingSubscribed;


      })
   }


   getHomeSlider(){
 
    this.sliderdata  = [];
    console.log("---------------GETSLIDE------------------");
    this.redditService.getHomaPageSlider().subscribe(data=>{
      this.postSlider = data.slides;  
    

      for(let i = 0; i < this.postSlider.length; i++) {
        if(this.postSlider[i].image!==null) {
          this.imageid =this.postSlider[i].image.id;

         this.redditService.getFile(this.imageid).subscribe(data=>{
           this.imagedata= data.data;
           this.imagedatatype= data.contentType;

          var dataslide = { 
            id: this.postSlider[i].sliderId,
            contenttype: this.imagedatatype,
            image: this.imagedata,
            content: this.postSlider[i].content,
            title:this.postSlider[i].title
            };


             setTimeout(() => {
              this.sliderdata.push(dataslide);
            }, 500);
          })
          }


        }
        console.log("------------------------LIDRESULT--------");
        console.log(this.sliderdata);
})

}

async openModal() {

  console.log("MODALE");
  const modal = await this.modalController.create({
    component: ModalCreateSlidePage
  });

  return await modal.present();
  /*

  modal.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
      this.dataReturned = dataReturned.data;
      //alert('Modal Sent Data :'+ dataReturned);


      setTimeout(() => { 
        this.getHomeSlider();
       // this.router.navigateByUrl('/task/'+this.id);
       }, 400); 
      
      } }  )

      */
    }  


    getData(){
       this.redditService.getDataBypageCalendar(this.page,this.table,this.per_page,this.startdate,this.enddate, this.priority,this.filter).subscribe(data => {
    
        this.posts=data.events;
        this.posts.forEach((currentValue, i) => {
        const newdate = this.datePipe.transform(currentValue.dayHourEvent,"yyyy-MM-dd");
        console.log( newdate); 
       // this.datearray = "'"+newdate+"'"+","+this.datearray;
     //   console.log( this.datearray); 
      
          this.arr.push(this.newdate);
            /*  this.eventsdata= arr.push({
                start: currentValue.dayHourEvent,
                title: currentValue.training.trainingName,
               //  content : currentValue.host.firstName + currentValue.host.lastName,
               /// textColor: 'black',  
                data: currentValue.eventId,
                backgroundColor:currentValue.training.eventColor,
                allDay: true,
              })
            */
          });
       
         console.log(this.arr);
        })


     
     }  

 async editslide(event, item) {
console.log(item);

this.redditService.delete(this.table2,item.id)  
  .subscribe(async (response) => {

   

 },
 error => {    
console.log(error);

});

} 

async deleteslide(event, item) {
  console.log(item);
  
  this.redditService.delete(this.table2,item.id)  
    .subscribe(async (response) => {
  
      this.getHomeSlider();
  
   },
   error => {    
  console.log(error);
  
  });
  
  } 
  


  

}

