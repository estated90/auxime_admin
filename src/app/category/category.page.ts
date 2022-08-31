import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  id:number;
  pages: any;
  items: any;
  posts: any;
  page:number;
  region: string;
  currentpage: number;
  table: string="public_tags";
  table2: string="tags";
  status: any=[1,0];
  category:string;
  filter: any="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=10;
  order_id:any="id";
  order_by:any="desc";
  view: any;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController, 
    public menu: MenuController ,  
    public redditService:RedditService, 
    private route: ActivatedRoute,
    public toastCtrl: ToastController,
    private router: Router,
    public loadingController: LoadingController) {
    this.page=1;
  }

  
  async ngOnInit() {

  
  
  }
  async ionViewWillEnter() {
    this.simpleLoader();
    this.redditService.allData(this.table).subscribe(data => {
      this.dismissLoader();
      this.posts=data;
    
     })
  

  }

 
   async delete(event, item) {
       this.id=item.id;
          const alert = await this.alertController.create({
            header: 'Supprimer',
            message: 'Voulez-vous vraiment supprimer ? En supprimant une catégorie, vous supprimez les relations exitantes associées à un post.',
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
            
         
            this.redditService.delete(this.table2,this.id)  
              .toPromise()
              .then((response) =>
              
              {
           setTimeout(() => { 
            this.redditService.allData(this.table).subscribe(data => {
              this.posts=data;
            
             })
           }, 400); 

             
              })}}]
            });
          await alert.present();
        
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


 async edit(event, item) {
 this.router.navigateByUrl('/categoryedit/'+item.id);
 }
     
async add(){
this.router.navigateByUrl('/categoryadd');
}




}
  
  