import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'app-categoryadd',
  templateUrl: './categoryadd.page.html',
  styleUrls: ['./categoryadd.page.scss'],
})
export class CategoryaddPage implements OnInit {

  id: number;
  iduser: number;
  table:string="tags";
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
  file:any;
  type: any;
  tag_en: any;
  tag_fr: any;
  tag_de: any;


  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    private storage: Storage,
    public toastCtrl: ToastController) {

   }

  ngOnInit() {
  this.route.params.subscribe(params => {
         this.category = params['category']; 
   });
   this.storage.get('iduser').then((val) => {
    this.iduser=val;
  });
  }

    async  doSave() {
      const alert = await this.alertController.create({
        header: 'Enregister',
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

            var data = JSON.stringify({ 
            type:this.type,
            tag_fr:this.tag_fr,
            tag_en:this.tag_en,
            tag_de:this.tag_de,
            isChecked:1
            }); 


            console.log(data);
          this.redditService.addPost(this.table,data)  
          .toPromise()
          .then((response) =>
          {

            console.log(response);
            setTimeout(() => { 
            this.router.navigateByUrl('/category');
          }, 400); 
        
          })}}]
        });
      await alert.present();
    
     }


}
