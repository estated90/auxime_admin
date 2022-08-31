import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';

import { addDays, format, parseISO } from 'date-fns';
@Component({
  selector: 'app-hotes',
  templateUrl: './hotes.page.html',
  styleUrls: ['./hotes.page.scss'],
})
export class HotesPage implements OnInit {


  id:number;
  pages: any;
  items: any;
  posts: any;
  postspush: any;
  datapost: any;
  page:number;
  region: string;

  currentpage: number;
  table: string="schedulerManagment/host/allHosts";
  table2:string="schedulerManagment/host/deactivateAccount?id=";
  word1: string="title";
  word2: string="content";
  status:number=0;
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
  startdateselect: any;
  sd: string;
  idHost: any;

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
       this.page=1;
  }


  async ionViewWillEnter(){ 
    this.getData();
  }


  onChangeWord(event){
    this.filter=event.target.value;
       this.page=1;
       setTimeout(() => { 
    
        this.getData();
       }, 100);  
    
  }
                 
  getData(){

    console.log(this.page );
    console.log(this.table );
    console.log(this.per_page );
    console.log(this.filter );
     this.redditService.getDataList(this.page,this.table,this.per_page,this.filter).subscribe(data => {
        console.log(data);
        this.posts=data.hosts;
        this.total=data.totalItems;
        this.currentpage=data.currentPage;  
        this.last_page=data.totalPages;   
      })
   }  


   doInfinite(event) {
    if (this.currentpage < this.last_page) {
      this.page = this.page + 1;
      setTimeout(() => {
        this.redditService.getDataList(this.page,this.table,this.per_page,this.filter).subscribe(data => {
     
     console.log(data);
          let postspush = data.hosts;
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

    console.log(item);
        this.idHost=item.hostId;
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

            this.redditService.desactiveById(this.table2,this.idHost)  
              .toPromise()
              .then((response) =>
              
              {
                console.log(response);
             setTimeout(() => { 
              this.getData();
           }, 400); 

              })}}]
            });
          await alert.present();
        
         }


         async edit(event, item) {
          this.router.navigateByUrl('/hote/' + item.hostId);

         }
     
         async add(){
         this.router.navigateByUrl('/create-hote');
        }

      }
  
  