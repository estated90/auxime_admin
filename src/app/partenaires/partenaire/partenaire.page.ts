import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-partenaire',
  templateUrl: './partenaire.page.html',
  styleUrls: ['./partenaire.page.scss'],
})
export class PartenairePage implements OnInit {

  public editorValue: string = '';

  id: number;
  table: string="thirdparty/partners/details?partnerId=";
  table1: string="thirdparty/partners/update";
  table2: string="thirdparty/contacts/addPhone";
  table3: string="thirdparty/partners/addNewContact";
  table4: string="thirdparty/contacts/activate";
  table5: string="thirdparty/contacts/disable";
  table6: string="thirdparty/partners/unable";
  table7: string="thirdparty/partners/disable";
  table8: string="thirdparty/contacts/removePhone";
  table9: string="thirdparty/contacts/update";

  view:boolean=true;
  push: boolean=false;
  data: any;
  posts: any;
  content: string="";
  image:string="";
  title: string="";
  url: string="";
  urlrewiting: string="";
  meta: string="";
  keyword: string="";
  keywords: any;
  deadlineTask: any;
  postdata: any;
  events: any;

  priority: any;
  postsphone: any[];
  firstname: any;
  lastname: any;
  email: any;
  user: any;
  namebank: any;
  dombank: any;
  iban: any;
  rib: any;
  bic: any;
  profilid: any;
  profilId: any;

  edit:boolean=false;
  formnewcontact:boolean=false;
  formphone:boolean=false;
  formeditcontact:boolean=false;

  segType: string = 'info';
  indicatif : string = '+33';
  phone: any;
  street: any;
  number:any = '';
  complement: any;
  city: any;
  zip: any;

  complemement: any;
  postall: any;
  postsaddress: any = [];
  name: any;
  contactList: any;
  partnerId: any;
  addressLine1:  string;
  addressComplement: string;

  phonenew: any;
  firstnamenew: any;
  lastnamenew: any;
  emailnew: any;
  editcontactId: any;
  statuscontactedit: any;
  emailcontactedit: any;
  lastnamecontactedit: any;
  firstnamecontactedit: any;
  statuspartenaire: boolean=false;
  daycreatedAt: any;
  formaddphonetocontact:  boolean=false;
  addphonecontactId: string;
  contactId: any;

  addphone: any;
   
  indicatifnew:  string = '+33';
  addindicatif: string = '+33';
  phoneId: any;
  phonenumbertype: string = 'MOBILE';
  addtypephone:string = 'MOBILE';
  phonenumbertypenew:string = 'MOBILE';

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private datePipe: DatePipe) {

   }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.id = params['id']; 
  });
  this.getdata();
  this.getPhonenumbertype();
  }

     async getdata() {
      this.redditService.getByid(this.table, this.id).subscribe(data=>{
        console.log(data); 
          this.postall = data;
          this.postdata = data;
          this.partnerId = data.partnerId;
          this.name = data.denomination;
          this.daycreatedAt = data.createdAt;
          
          this.statuspartenaire = data.status;
          if (data.address!==null){
          this.number = data.address.number;
          this.street = data.address.street;
          this.zip = data.address.zip;
          this.city = data.address.city;
          this.addressComplement  = data.address.addressComplement;
           }
          this.contactList = data.contactList;
          this.posts = [data][0];
      })

     }


     async  doSaveProfil() {
      this.postdata.denomination= this.name;
      this.postdata.partnerId=this.partnerId;
      this.postdata = {
      partnerId:this.partnerId,
      denomination: this.name,
      addressComplement: this.addressComplement,
      addressLine1:this.addressLine1,
      city: this.city,
      country: "France",
      number: this.number,
      street: this.street,
      zip:this.zip,

    }

       const alert = await this.alertController.create({
         header: 'Enregistrement',
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
          
           this.redditService.updateByid(this.table1,this.postdata) 
           .toPromise()
           .then((response) =>
 
           {
             console.log(response);
             setTimeout(() => { 
             this.editpage();
             this.getdata();
            }, 400); 
           
           })}}]
         });
         await alert.present();
     
      }


  async savePhone(event, item) {
  this.contactId = item.contactId
      var    data =  {         
        countryCode: "FR",
        indicative: this.addindicatif,
        phoneNumber: this.addphone,
        numberType: this.addtypephone,
        contactId: this.contactId,
   }

      this.redditService.updateByid(this.table2,data)  
           .subscribe(async (response) => {
           setTimeout(() => { 
          //  this.getdataphone();
            this.addphone="";
            this.contactId="";
            this.addphonecontact();
            this.getdatacontactlist();
          }, 400);  
       
          },
          error => {    
         console.log(error);
         this.presentAlert();
         });
  }

  async removePhone(event, item) {
    this.phoneId = item.phoneId
    console.log(item);
        this.redditService.delete(this.table8,this.phoneId )  
             .subscribe(async (response) => {
             setTimeout(() => { 
            //  this.getdataphone();
              this.phoneId="";
              this.getdatacontactlist();
            }, 400);  
         
            },
            error => {    
           console.log(error);
           this.presentAlert();
           });
    }
  
  

    async Savenewcontact() {
    

      console.log("NEW PARTENER");
            var    data = {
             
              "thirdPartyId": this.id,
              "firstName":this.firstnamenew,
              "lastName": this.lastnamenew,
              "email": this.emailnew,
              "countryCode": "FR",
              "indicative":this.indicatifnew,
              "phoneNumber":this.phonenew,
              "numberType": this.phonenumbertypenew,
              }

              console.log(data);
            this.redditService.updateByid(this.table3,data)  
                 .subscribe(async (response) => {
                  setTimeout(() => { 
                //    this.getdatabank();
                    this.firstnamenew="";
                    this.lastnamenew="";
                    this.emailnew="";
                    this.indicatifnew="";
                    this.phonenew="";
                    this.phonenumbertype="";
                    this.editnewcontact();
                    this.getdatacontactlist();
                  }, 400);  
             },
             error => {    
            console.log(error);
            this.presentAlert();
            });
         
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Erreur',
      subHeader: '',
      message: 'Enregistrement incorrect',
      buttons: [{
        text: 'Ok',
        cssClass: 'primary',
        handler: (blah) => {
          console.log('Confirm Ok: blah');
        }
      },
      {
        text: 'Annuler',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }
    ]
    });

    await alert.present();
  }

  async editcontact(event, item) {
    this.editcontactId = "";
    this.editformcontact();
    this.editcontactId = item.contactId
    this.firstnamecontactedit = item.firstName;
    this.lastnamecontactedit = item.lastName;
    this.emailcontactedit = item.email;
    this.statuscontactedit = item.status;
   }



   async addphonetocontact(event, item) {
    this.addphonecontact();
    this.addphonecontactId = "";
    this.addphonecontactId = item.contactId
   }

   async Updatecontact(event, item) {
    this.editcontactId = item.contactId
    var data = {
      "contactId": this.editcontactId,
      "firstName": this.firstnamecontactedit,
      "lastName":this.lastnamecontactedit,
      "email": this.emailcontactedit 
   }

    this.redditService.updateByid(this.table9,data)  
         .subscribe(async (response) => {
            this.editformcontact();
            this.editcontactId = "";
            this.getdatacontactlist();    
        },
        error => {    
       console.log(error);
       this.presentAlert();
       });
}


async getdatacontactlist() {
  this.redditService.getByid(this.table, this.id).subscribe(data=>{
    console.log(data);
      this.contactList = data.contactList;
  })
 }

 async getdatareloadstatut() {
  this.redditService.getByid(this.table, this.id).subscribe(data=>{
      this.statuspartenaire = data.status;
  })
 }

 async onChangeCategory(event){
  this.phonenumbertype =event.target.value
 }

 async onChangeTypePhone(event){
  this.addtypephone =event.target.value
 }

 async activecontact(event, item) {
  this.editcontactId = item.contactId
  var data = {};
  this.redditService.update(this.table4,this.editcontactId,data).subscribe(async (response) => {
  this.getdatacontactlist();  },
 error => {  this.presentAlert();}); }

 async desactivecontact(event, item) {
  this.editcontactId = item.contactId
  var data = {};
  this.redditService.delete(this.table5,this.editcontactId).subscribe(async (response) => {
    this.getdatacontactlist();  },
 error => {    
this.presentAlert();
});}

async activepartenaire() {
  var data = {};
  this.redditService.update(this.table6,this.id,data).subscribe(async (response) => {
    this.getdatareloadstatut();  },
  error => {    
 this.presentAlert();
 });}

 async desactivepartenaire() {
  var data = {};
  this.redditService.delete(this.table7,this.id).subscribe(async (response) => {
    this.getdatareloadstatut();  },
 error => {    
this.presentAlert();
});
}
    
   async editpage() {
    this.segType = 'info';
    this.edit=!this.edit;
   }


   async editnewcontact() {
    this.formnewcontact=!this.formnewcontact;
   }

   async editformcontact() {
    this.formeditcontact=!this.formeditcontact;
   }


   async editphone() {
    this.formphone=!this.formphone;
   }


   async addphonecontact() {
    this.formaddphonetocontact=!this.formaddphonetocontact;
   }

   async getPhonenumbertype(){
    this.redditService.getphoneNumberType().subscribe(data=>{
      this.phonenumbertype =[data][0];
      })
   }


   segmentChanged(ev: any) {
    console.log('Segment changed', ev);
   }
  


}
