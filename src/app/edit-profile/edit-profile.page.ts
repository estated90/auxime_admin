import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
  import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
  import { RedditService } from 'src/providers/reddit-service';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Observable, fromEvent } from 'rxjs';
  import { pluck } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
  
  @NgModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
  @Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.page.html',
    styleUrls: ['./edit-profile.page.scss'],
  })
  export class EditProfilePage implements OnInit {
    public editorValue: string = '';
  
    id: number;
    table: string="accountManagement/accounts/details?id=";
    table1: string="accountManagement/banks/details/create";
    table2: string="accountManagement/banks/createMyBank";
    table3: string="accountManagement/phones/create";
    table4: string="accountManagement/profiles/details/editMyProfile";
    table5: string="accountManagement/phones/create";
  
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
    birthplace: any;
    birthdate: any;
    childnumber: any;
    countrybirth: any;
    maritalname: any;
    nationality: any;
    socialNumber: any;
    studieslevel: any;
    maritalstatus: any;
    socialnumber: any;
    email: any;
    user: any;
    postsbanks: any;
    namebank: any;
    dombank: any;
    iban: any;
    rib: any;
    bic: any;
    profilid: any;
    profilId: any;

    edit:boolean=false;
    formbank:boolean=false;
    formphone:boolean=false;

    segType: string = 'info';
    indicatif : string = '+33';
    phone: any;
    street: any;
    number:any = '';
    complement: any;
    city: any;
    zip: any;
    addressComplement: any;
    complemement: any;
    postall: any;

 
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
    }
  
    segmentChanged(ev: any) {
      console.log('Segment changed', ev);
    }
  
    
       async editpage() {
        this.segType = 'info';
        this.edit=!this.edit;
       }


       async editbank() {
        this.formbank=!this.formbank;
       }

       async editphone() {
        this.formphone=!this.formphone;
       }
    
       async getdata() {
    
        this.redditService.getMyAccount().subscribe(data=>{
            this.postall = data;
            this.postdata = data.profile;
            console.log(data);
            this.profilId = data.profile.profileId;
            this.firstname = data.profile.firstName;
            this.lastname = data.profile.lastName;
            this.birthplace = data.profile.birthPlace;
            this.birthdate = data.profile.birthdate;
            this.childnumber = data.profile.childNumber;
            this.countrybirth = data.profile.countryBirth;
            this.maritalstatus = data.profile.maritalStatus;
            this.nationality = data.profile.nationality;
            this.maritalname = data.profile.maritalName;
            this.socialnumber = data.profile.socialNumber;
            this.studieslevel = data.profile.studiesLevel;




            this.email = data.email;

             if (data.profile.address!==null){
              this.number = data.profile.address.number;
              this.street = data.profile.address.street;
              this.zip = data.profile.address.zip;
              this.city = data.profile.address.city;
               }
  

            this.postsphone = data.profile.phoneList;
            this.postsbanks = data.profile.banks;
            this.posts = [data];

        
        })
  
       }


       async  doSaveProfil() {

        this.birthdate = this.datePipe.transform(this.birthdate,"yyyy-MM-dd");


        this.postdata.firstName= this.firstname;
        this.postdata.lastName=this.lastname;
        
        this.postdata.birthPlace=this.birthplace;
        this.postdata.birthdate=this.birthdate;
        this.postdata.childNumber=this.childnumber;
        this.postdata.countryBirth=this.countrybirth;
        this.postdata.maritalStatus=this.maritalstatus;
        this.postdata.nationality=this.nationality;
        this.postdata.maritalName=this.maritalname;
        this.postdata.socialNumber=this.socialnumber;
        this.postdata.studiesLevel=this.studieslevel;

        this.postdata.address.number=this.number;
        this.postdata.address.zip=this.zip;
        this.postdata.address.street=this.street;
        this.postdata.address.city=this.city;
   
      
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
            
             this.redditService.updateByid(this.table4,this.postdata) 
             .toPromise()
             .then((response) =>
   
             {
               console.log(response);
               setTimeout(() => { 
               this.editpage();
 
               this.getdata();
              // this.router.navigateByUrl('/task/'+this.id);
              }, 400); 
             
             })}}]
           });
           await alert.present();
       
        }


        async  doSaveEmail() {

          this.postall.email=this.email;
    
         console.log( this.posts);
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
              
               this.redditService.updateByid(this.table4,this.posts) 
               .toPromise()
               .then((response) =>
     
               {
                 console.log(response);
                 setTimeout(() => { 
                 this.editpage();
   
                 this.getdata();
                // this.router.navigateByUrl('/task/'+this.id);
                }, 400); 
               
               })}}]
             });
             await alert.present();
         
          }
  


       async getdatabank() {
        this.redditService.getByid(this.table, this.id).subscribe(data=>{
            this.postsbanks = data.profile.banks;
        })
  
       }


       async getdataphone() {
        this.redditService.getByid(this.table, this.id).subscribe(data=>{
            this.postsphone = data.profile.phoneList;
        })
  
       }



       async SavePhone() {
        var    data =  {         
          countryCode: "FR",
          indicative: this.indicatif,
          phoneNumber: this.phone,
          numberType: "MOBILE",
          profileId:this.profilId
     }

     console.log( data);
        this.redditService.addPost(this.table5,data)  
             .subscribe(async (response) => {
             setTimeout(() => { 
              this.getdataphone();
              this.phone="";
              this.editphone();
            
            }, 400);  
         
            },
            error => {    
           console.log(error);
           this.presentAlert();
           });
    }



      async SaveBank() {
        var    data = {
        name: this.namebank,
        domiciliation: this.dombank,
        iban: this.iban,
        rib: this.bic,
        active: true
       }
        this.redditService.addPost(this.table2,data)  
             .subscribe(async (response) => {
              var    data = {
                bankId: response.bankId,
                domiciliation: response.domiciliation,
                iban: response.iban,
                name: response.name,
                rib: response.rib,
                profileId:this.profilId
                }
              this.redditService.addPost(this.table1,data)  
                   .subscribe(async (response) => {
                    setTimeout(() => { 
                      this.getdatabank();
                      this.namebank="";
                      this.dombank="";
                      this.iban="";
                      this.bic="";
                      this.editbank();
                    }, 400);  
               },
               error => {    
              console.log(error);
              this.presentAlert();
              });
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

      
  }
  
