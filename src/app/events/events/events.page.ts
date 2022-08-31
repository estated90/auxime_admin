import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  id:number;
  pages: any;
  items: any;
  posts: any;
  postspush: any;
  datapost: any;
  page:number;
  region: string;
  currentpage: number;
  table: string="taskManament/eventType/listEvent";
  table2: string="taskManament/eventType/delete";
  table3: string="taskManament/eventType/create";
  word1: string="title";
  word2: string="content";
  status:number=0;
  category:number=0;
  filter: any="";
  word: any="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=20;
  order_id:any="id";
  order_by:any="desc";
  title: string="";

  constructor(public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController, 
    public menu: MenuController ,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController ) {
    this.page=1;
    }


  ngOnInit() {
      this.page=1;
      this.getData();
  }




      
  onChangeWord(event){
       this.filter=event.target.value;
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
      this.redditService.getDataByPage(this.page,this.table,this.per_page,this.filter).subscribe(data => {
        console.log(data);
        this.posts=data.eventType;
        this.total=data.totalItems;
        this.currentpage=data.currentPage;  
        this.last_page=data.totalPages;   
        console 
      })
   }  



   doInfinite(event) {
    if (this.currentpage < this.last_page) {
      this.page = this.page + 1;
      setTimeout(() => {
        this.redditService.getDataByPage(this.page,this.table,this.per_page,this.filter).subscribe(data => {
          let postspush = data.eventType;
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

            this.redditService.deletePost(this.table2,item.eventId)  
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




         doSave(){
          var data = {
           "eventName": this.title
          };
       
       
       this.redditService.addPost(this.table3,data)  
       .subscribe(async (response) => {
           setTimeout(() => { 
           this.getData();
           this.title="";
          }, 400); 
       })
       }
     

      }
  
  