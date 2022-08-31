import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

@Component({
  selector: 'app-categoryedit',
  templateUrl: './categoryedit.page.html',
  styleUrls: ['./categoryedit.page.scss'],
})
export class CategoryeditPage implements OnInit {
  
  public editorValue: string = '';
  id: number;
 
  category:string;
  view:boolean;
  push: boolean=false;
  data: any;
  posts: any;
  content: string="";
  image:string="";
  title: string="";
  subtitle: string="";
  viewdata: any;
  transfer: any;
  urlrewiting: any;
  url: string;
  keyword: any;
  meta: any;
  keywords: any;
  firstname: any;
  lastname: any;
  update: any;
  updated_at: any;
  tags: any;
  table: string="tags";
  tag_de: any;
  tag_en: any;
  tag_fr: any;
  type: any;


  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController) {

   }


   ngOnInit() {

    this.route.params.subscribe(params => {
       this.id = params['id']; 
   });
   

   this.redditService.postByid(this.table, this.id).subscribe(data=>{
       this.tag_de = data.tag_de;
       this.tag_en = data.tag_en;
       this.tag_fr = data.tag_fr;
       this.type = data.type;
   })
   }


    async  doSave() {

      console.log(this.tags);
      const alert = await this.alertController.create({
        header: 'Enregistrer',
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

            this.simpleLoader();
            var data = JSON.stringify({ 
            tag_en:this.tag_en,
            tag_fr:this.tag_fr,
            tag_de:this.tag_de,
            }); 
            console.log(this.id);

         this.redditService.update(this.table,this.id,data) 
          .toPromise()
          .then((response) =>

          {
            setTimeout(() => { 
            this.dismissLoader();
            this.router.navigateByUrl('/category');    
           }, 400); 
          
          })}}]
        });
        await alert.present();
    
     }

    

// start loader
  async simpleLoader() {
  this.loadingController.create({
      message: 'Enregistrement...'
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