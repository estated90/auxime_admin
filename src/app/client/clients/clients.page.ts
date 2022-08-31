import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})

export class ClientsPage implements OnInit {

  id:number;
  pages: any;
  items: any;
  posts: any;
  postspush: any;
  datapost: any;
  page:number;
  region: string;
  currentpage: number;
  table: string="thirdparty/clients/list";
  table2:string="thirdparty/clients/disable";
  word1: string="title";
  word2: string="content";
  
  category:number=0;
  filter: any="";
  word: any="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=10;
  order_id:any="id";
  order_by:any="desc";
  tabBarElement: any;
  supplier: any;
  postData: any;
  priority: any="";
  firstdate: any;
  enddateany:any;
  occupation: any="";
  exitstatus: any="";
  manager: any="";
  buisnessmanager: any="";
  exitstatuslist: any;
  occupationlist: any;

  constructor(public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController, 
    public menu: MenuController ,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private storage: Storage ) {
    this.page=1;

    }


  ngOnInit() {


    this.storage.get('ExitStatus').then((data) => {
      this.exitstatuslist=data;
     });

     this.storage.get('Occupation').then((data) => {
      this.occupationlist=data;
     });



      this.page=1;
      this.getData();
  }


  ionViewWillEnter(){ 
  }
  
  next() {
    if (this.currentpage<this.last_page){
    this.page = this.page +1 ;
      this.getData();
     }
    }
  
  prev() {
    if  (this.page>1){
    this.page = this.page -1;
    this.getData();
    }
   }
  
  
  forward(){
      if  (this.currentpage<this.last_page){
      this.page = this.last_page
      this.getData();}}

  backward() {
      if  (this.currentpage>1){
      this.page=1;
      this.getData();}}


      onChangeCategory(event){
       
        this.page=1;
        this.getData();
   }
      
  onChangeWord(event){
       this.filter=event.target.value;
       this.page=1;
       this.getData();
  }

  onChangeWordManager(event){
    this.manager=event.target.value;
    this.page=1;
    this.getData();
}
onChangeWordBuisnessManager(event){
  this.buisnessmanager=event.target.value;
  this.page=1;
  this.getData();
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

    console.log(this.occupation);
      this.redditService.getDataPartenaires(this.page,this.table,this.per_page,this.exitstatus,this.filter).subscribe(data => {
        console.log(data);
        this.posts=data.clients;
        this.total=data.totalItems;
        this.currentpage=data.currentPage;  
        this.last_page=data.totalPages;   
  
      })
   }  



   doInfinite(event) {
    if (this.currentpage < this.last_page) {
      this.page = this.page + 1;
      setTimeout(() => {
        this.redditService.getDataPartenaires(this.page,this.table,this.per_page,this.exitstatus,this.filter).subscribe(data => {
          let postspush = data.clients;
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

            this.redditService.deletePost(this.table2,item.clientId)  
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
          this.router.navigateByUrl('/client/' + item.thirdPartyId);

         }
     
         async add(){
         this.router.navigateByUrl('/create-client');
        }

      }
  
  