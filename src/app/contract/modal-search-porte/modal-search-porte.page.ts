
import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';

@Component({
  selector: 'app-modal-search-porte',
  templateUrl: './modal-search-porte.page.html',
  styleUrls: ['./modal-search-porte.page.scss'],
})
export class ModalSearchPortePage implements OnInit {

  @Input() model_title: string;
  modelId: any;
  modalTitle: any;
  table: string="accountManagement/accounts/porteNameList";
  page:number;
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
  posts: any;
  idporte: any="";
  firstname:any="";
  lastname: any="";

  constructor(
    private modalController: ModalController,
    private navParams: NavParams, 
    public redditService:RedditService,
    public loadingController:LoadingController) { }


  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
    this.getData();
  }

  async closeModal() {
    const onClosedData  = {idporte : this.idporte,firstname : this.firstname, lastname : this.lastname};
    await this.modalController.dismiss(onClosedData);
  }


  async getData(){
    const loader = await this.loadingController.create({
      message: 'Chargement en cours...',
      });
      loader.present();

      this.redditService.allData(this.table).subscribe(data => {
        console.log(data);
        this.posts = data;
        loader.dismiss();
  
      })
   }  

   async selectPorte(event, item) {
   
   
    console.log(item.accountsId);

    this.idporte = item.accountsId;
    this.firstname = item.firstName;
    this.lastname= item.lastName;

    this.closeModal();

   }



}

