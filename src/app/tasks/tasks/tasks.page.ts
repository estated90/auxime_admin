import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';

import { addDays, format, parseISO } from 'date-fns';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  id:number;
  pages: any;
  items: any;
  posts: any;
  postspush: any;
  datapost: any;
  page:number;
  region: string;
  currentpage: number;
  table: string="taskManament/tasks/listTasks";
  table2:string="taskManament/tasks/delete";
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

  enddate:any = new Date().toISOString();
  startdate:any = new Date("2022-04-01").toISOString();

  sd: string;
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
    

  
       setTimeout(() => {
        this.onChangeDate();
       }, 100);  
      this.page=1;
  }


  onChangeWord(event){
    this.filter=event.target.value;
    this.startdate = this.datePipe.transform(this.startdate,"yyyy-MM-ddTHH:00:00");
    this.enddate = this.datePipe.transform(this.enddate,"yyyy-MM-ddTHH:00:00");
    console.log(this.enddate);
    console.log(this.startdate);
       this.page=1;
       setTimeout(() => { 
        // this.getData();
        this.getData();
       }, 100);  
    
  }
        
  
  onChangeDate(){
  
    this.startdate = this.datePipe.transform(this.startdate,"yyyy-MM-ddTHH:00:00");
    this.enddate = this.datePipe.transform(this.enddate,"yyyy-MM-ddTHH:00:00");
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
            
  getData(){
     this.redditService.getDataBypage(this.page,this.table,this.per_page,this.startdate,this.enddate, this.priority,this.filter).subscribe(data => {
        console.log(data);
        this.posts=data.tasks;
        this.total=data.totalItems;
        this.currentpage=data.currentPage;  
        this.last_page=data.totalPages;   
      })
   }  


   doInfinite(event) {
    if (this.currentpage < this.last_page) {
      this.page = this.page + 1;
      setTimeout(() => {
        this.redditService.getDataBypage(this.page,this.table,this.per_page,this.startdate,this.enddate, this.priority,this.filter).subscribe(data => {
     
     console.log(data);
          let postspush = data.tasks;
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
              this.getData();
           }, 400); 

              })}}]
            });
          await alert.present();
        
         }


         async edit(event, item) {
          this.router.navigateByUrl('/task/' + item.taskId);

         }
     
         async add(){
         this.router.navigateByUrl('/create-task');
        }

      }
  
  