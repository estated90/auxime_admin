import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.page.html',
  styleUrls: ['./useredit.page.scss'],
  
})
export class UsereditPage implements OnInit {
  public editorValue: string = '';

  id: number;
  page:number;
  table: string="users";
  view:boolean;
  push: boolean=false;
  data: any;
  posts: any;
  notifs: any;
  content: string="";
  image:string="";
  title: string="";
  viewdata: any;
  lastname: any;
  firstname: any;
  category: any;
  email: any;
  address: any;
  city: any;
  cp: any;
  phone: any;
  label: any;
  role: number;

  table2: string="notifs";
  word1: string="title";
  word2: string="content";
  status:number=0;
  filter: any="";
  word: any="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=10;
  order_id:any="id";
  order_by:any="desc";
  currentpage: any;
  message: any;
  idnotif: any;

  constructor(
  public navCtrl: NavController, 
  public popoverCtrl: PopoverController,
  public alertController: AlertController,
  private route: ActivatedRoute,
  public loadingController:LoadingController,  
  public redditService:RedditService, private router: Router, 
  public toastCtrl: ToastController) 
  {}

  

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.id = params['id']; 
  });

  this.redditService.postByid(this.table, this.id).subscribe(data=>{
    this.posts=data;
    this.firstname=data.firstname;
    this.role=data.role;
    this.lastname=data.lastname;
    this.city=data.city;
    this.address=data.address;
    this.cp=data.cp;
    this.email=data.email;
    this.phone=data.phone_number;
    this.image=data.image;
    this.view=data.state;
  })
  }


  

async  doSave() {
          var data = JSON.stringify({ 
                lastname: this.lastname,
                firstname: this.firstname,
                email: this.email,
                address: this.address,
                city: this.city,
                cp: this.cp,
                phone_number:this.phone,
                image:this.image,
                role:this.role,
                state:this.view, 
          });


          console.log(data); 
     
          this.redditService.update(this.table,this.id,data)
        .toPromise()
          .then((response) => {

            console.log(response);
            this.router.navigateByUrl('/users');
          })
}



getdata() {
  this.page=1;
        this.redditService.notifsByid(this.id,this.page,this.table2,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
        this.notifs=data.data;
        this.total=data.total;
        this.per_page=data.per_page;
        this.currentpage=data.current_page;    
        this.last_page=data.last_page;   
      })  

}

doRefresh(event) {
    setTimeout(() => {
      this.page=1 ;
       this.redditService.notifsByid(this.id,this.page,this.table2,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
         this.notifs=data.data;
        this.total=data.total;
        this.per_page=data.per_page;
        this.currentpage=data.current_page;    
        this.last_page=data.last_page;   
      })
      event.target.complete();
    }, 2000);
}



doInfinite(event) {
    if  (this.currentpage<this.last_page){
         this.page = this.page +1 ;
        setTimeout(() => {       
           this.redditService.notifsByid(this.id,this.page,this.table2,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
          let postspush=data.data;          
          for(let post of postspush){
               this.notifs.push(post); 
          }
           this.total=data.total;
           this.per_page=data.per_page;
           this.currentpage=data.current_page;    
           this.last_page=data.last_page;   
          });
          event.target.complete();
        }, 1000);
        } else{
          setTimeout(() => {
            event.target.complete();
        }, 1000);
        
        }
      }


   async delete(event, item) {
       this.idnotif=item.id;
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
            
         
            this.redditService.delete(this.table2,this.idnotif)  
              .toPromise()
              .then((response) =>
              {
                
                console.log(response);
            
                
                 setTimeout(() => {this.ngOnInit();}, 400); 
              })}}]
            });
          await alert.present();
        
         }

addquestionnaire(){

var data = JSON.stringify({ 
title: "Questionnaire",
content: "Veuillez remplir le formulaire suivant, et nous vous contacterons pour vous fournir des renseignements supplémentaires ",
edited_by : this.id,
link: "/form1",
category:"questionnaire",
view:0,
});

this.redditService.addPost(this.table2,data)  
.toPromise()
.then((response) =>{
    setTimeout(() => { 
    this.ngOnInit();
   }, 400); 
})
}




addmessage(){

var data = JSON.stringify({ 
title: "Nouveau message",
content: this.message,
edited_by : this.id,
link: "",
category:"message",
view:0,
});

this.redditService.addPost(this.table2,data)  
.toPromise()
.then((response) =>{
    setTimeout(() => { 
      this.message="";
      this.ngOnInit();
   }, 400); 
})
}







}


