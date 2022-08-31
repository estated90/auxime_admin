import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-user-contrats',
  templateUrl: './user-contrats.page.html',
  styleUrls: ['./user-contrats.page.scss'],
})
export class UserContratsPage implements OnInit {


  id:number;
  pages: any;
  items: any;
  posts: any;
  postspush: any;
  datapost: any;
  page:number;
  region: string;
  currentpage: number;

  table: string="contractManagement/contracts/myContracts";
  table2:string="contractManagement/commercialContract/delete/";

  word1: string="title";
  word2: string="content";
  status:number=0;
  category:number=0;
  filter: any="";
  word: any="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=30;
  order_id:any="id";
  order_by:any="desc";
  tabBarElement: any;
  supplier: any;
  postData: any;

  enddate:any = new Date("01-01-2030").toISOString();
  startdate:any = new Date("01-01-2022").toISOString();

  priority: any="";
  startdateselect: any;
  startdatend: string;

  structure:string="AUXIME";
  contractStatus: string="";
  comment: any;

  segType: string = 'AUXIME';

  constructor(public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController, 
    public menu: MenuController ,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController, 
    private datePipe: DatePipe) {
    this.page=1;
    }


  ngOnInit() {

    console.log(this.startdate);
      this.page=1;
    

      /*
      this.redditService.getcontractStatus().subscribe(data => {
        this.contractStatus=[data][0];
        console.log(this.contractStatus);
      })*/
  }



  async ionViewWillEnter(){ 
    this.startdate = this.datePipe.transform(this.startdate,"yyyy-MM-dd");
    this.enddate = this.datePipe.transform(this.enddate,"yyyy-MM-dd");


    this.page=1;
    setTimeout(() => { 
     // this.getData();
     this.getData();
    }, 100);  

  }



  segmentChanged(ev: any) {
    console.log(ev.detail.value);
    this.structure=ev.detail.value;
    setTimeout(() => { 
      // this.getData();
      this.getData();
     }, 300);  
  }




  onChangeWord(event){
    this.filter=event.target.value;
    console.log(this.filter);
    this.startdate = this.datePipe.transform(this.startdate,"yyyy-MM-dd");
    this.enddate = this.datePipe.transform(this.enddate,"yyyy-MM-dd");
    console.log(this.enddate);
    console.log(this.startdate);
       this.page=1;
       setTimeout(() => { 
        // this.getData();
        this.getData();
       }, 100);  
    
  }
        
  
  onChangeDate(){
  
    this.startdate = this.datePipe.transform(this.startdate,"yyyy-MM-dd");
    this.enddate = this.datePipe.transform(this.enddate,"yyyy-MM-dd");
    console.log(this.enddate);
    console.log(this.startdate);


       this.page=1;
       setTimeout(() => { 
        // this.getData();
        this.getData();
       }, 100);  
  }
      
    
  onCancelword(selectedValue: any) {
       this.filter=="";
  }
            
  reset(){
      this.filter="";
      this.page=1;
      this.per_page=10;
      this.getData();
  }
 

  getData(){
      this.redditService.getContrats(this.page,this.table,this.per_page,this.startdate,this.enddate, this.priority,this.structure,this.contractStatus, this.filter).subscribe(data => {
        console.log(data);
        this.posts=data.contracts;
        this.total=data.totalItems;
        this.currentpage=data.currentPage;  
        this.last_page=data.totalPages;   
       
      })
   }  


   doInfinite(event) {
    if (this.currentpage < this.last_page) {
      this.page = this.page + 1;
      setTimeout(() => {
        this.redditService.getContrats(this.page,this.table,this.per_page,this.startdate,this.enddate, this.priority,this.structure,this.contractStatus,this.filter).subscribe(data => {
          let postspush = data.contracts;
          for (let post of postspush) {
            this.posts.push(post);
          }
          this.total=data.totalItems;
          this.currentpage=data.currentPage;  
          this.last_page=data.totalPages;  
        });
        event.target.complete();
      }, 1000);
    } else {
      setTimeout(() => {
        event.target.complete();
      }, 1000);

    }
  }

   async delete(event, item) {

          const alert = await this.alertController.create({
            header: 'Supprimer',
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

            this.redditService.deletePost(this.table2,item.taskId)  
              .toPromise()
              .then((response) =>
              
              {
                console.log(response);
             setTimeout(() => { 
                 this.ngOnInit();
           }, 400); 

              })}}]
            });
          await alert.present();
        
         }


         async edit(event, item) {
          this.router.navigateByUrl('/contrat-cape/' + item.contractId);

         }
     

     

      }
  
  