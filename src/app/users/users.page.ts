import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';

@Component({
  selector: 'users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})

export class UsersPage implements OnInit {
  id:number;
  role:any;
  pages: any;
  items: any;
  posts: any;
  page:number;
  region: string;
  currentpage: number;
  table: string="users";
  status:number=0;
  category:number=0;
  filter: any="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=10;
  order_id:any="id";
  order_by:any="desc";
  email_verified_at: any;

  constructor(public navCtrl: NavController, 
    public popoverCtrl: PopoverController,public alertController: AlertController,
    public menu: MenuController ,
    public loadingController:LoadingController, 
    public redditService:RedditService,
    private router: Router, 
    public toastCtrl: ToastController ) {
    this.page=1;
    }


  ngOnInit() {
     
  }


  ionViewWillEnter(){ 
        this.getData();
  }


  doRefresh(refresher) {
      setTimeout(() => {
        this.page=1 ;
           this.getData();
        refresher.complete();
      }, 1100);
  }
  
  next() {
     if (this.currentpage<this.last_page){
     this.page = this.page +1 ;
   /*   this.redditService.getDataBypage(this.page,this.table,this.per_page,this.filter).subscribe(data => {
        console.log(data);
        this.posts=data.data;
        this.total=data.total;
        this.per_page=data.per_page;
        this.currentpage=data.current_page;    
        this.last_page=data.last_page;   
      })*/
     
     }}
  
  prev() {
      if  (this.page>1){
      this.page = this.page -1;
      this.getData();}}
  
  
  forward(){
      if  (this.currentpage<this.last_page){
      this.page = this.last_page
    /* this.redditService.getDataBypage(this.page,this.table,this.per_page,this.filter).subscribe(data => {
        console.log(data);
        this.posts=data.data;
        this.total=data.total;
        this.per_page=data.per_page;
        this.currentpage=data.current_page;    
        this.last_page=data.last_page;   
      })
      */
      
      }}

  backward() {
      if  (this.currentpage>1){
      this.page=1;
      this.getData();}}
      
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
    this.simpleLoader();
      this.page=1;
    /*  this.redditService.getDataBypage(this.page,this.table,this.per_page,this.filter).subscribe(data => {

        this.dismissLoader();
        this.posts=data.data;
        this.total=data.total;
        this.per_page=data.per_page;
        this.currentpage=data.current_page;    
        this.last_page=data.last_page;   
      })*/
   }  

   async delete(event, item) {
       this.id=item.id;
          const alert = await this.alertController.create({
            header: 'Supprimer',
            message: 'Voulez-vous vraiment supprimer ? ',
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
            
         
            this.redditService.delete(this.table,this.id)  
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

  async verif(event, item) {
       this.id=item.id;
          const alert = await this.alertController.create({
            header: 'Validation',
            message: 'Voulez-vous valider ce compte ? ',
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
            


           console.log(this.id);
            this.redditService.verif(this.table,this.id)  
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
          this.router.navigateByUrl('/useredit/' + item.id);
         }
     
         async add(){
         this.router.navigateByUrl('/useradd');
        }

      

// start loader
async simpleLoader() {
  this.loadingController.create({
      message: 'Chargement...'
  }).then((response) => {
      response.present();
  });
}
// Dismiss loader
async dismissLoader() {
  this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
  }).catch((err) => {
      console.log('Error occured : ', err);
  });
}



      }
  
  