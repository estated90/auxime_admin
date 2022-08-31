  import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
  import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
  import { RedditService } from 'src/providers/reddit-service';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Observable, fromEvent } from 'rxjs';
  import { pluck } from 'rxjs/operators';
  import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { DayTable } from '@fullcalendar/daygrid';
  @NgModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
  @Component({
    selector: 'app-contrat-cape',
    templateUrl: './contrat-cape.page.html',
    styleUrls: ['./contrat-cape.page.scss'],
  })
  export class ContratCapePage implements OnInit {
  
    public editorValue: string = '';
  
    id: number;
    table: string="contractManagement/commercialContract/details?contractId=";
    table1: string="contractManagement/commercialContract/update";
    table3: string="taskManament/eventType/listEvent";
    table4: string="contractManagement/commercialContract/addComment?contractId=";
    table5: string="thirdparty/clients/details?clientId=";
    table6: string="accountManagement/accounts/getInfoUser?porteId=";
    table7: string="thirdparty/clients/list";


    category:string="page";
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
    edit:boolean=false;
    priority: any;
  
    currentpage: number;
    total:number=0;
    last_page:number=0;
    per_page:number=10;
    order_id:any="id";
    order_by:any="desc";
    page: number;
    filter: any="";
    poststypes: any;
    iduser: any;
    rates: any;
    contractId: any;
    structureContract: any;
    enddate: any;
    startdate: any;
    contractDate: any;
    comment: any;
    accountId: any;
    clientId: any;
    nameClient: any;
    lastNamePorte: any;
    firstNamePorte: any;
    contractsName: any;
    contractsStates: any;
    contractsDurations: any;
    exitstatus: any="";
    clients: any;
    monthlyAmountunity: any;
    duration: any;
    monthlyAmount: any;
    globalAmount: any;
    endDate: any;
    firstname: any;
    lastname: any;
    roleUser: any;

  
    constructor(
      public navCtrl: NavController, 
      public popoverCtrl: PopoverController,
      public alertController: AlertController,
      private route: ActivatedRoute,
      public loadingController:LoadingController,  
      public redditService:RedditService, 
      private router: Router,  
      public toastCtrl: ToastController,
      private storage: Storage,
      private datePipe: DatePipe) {
     }
  
    ngOnInit() {
     this.route.params.subscribe(params => {
        this.id = params['id']; 
    });
  
    this.storage.get('iduser').then((iduser) => {
      this.iduser=iduser;
      });

    this.storage.get('firstname').then((firstname) => {
       this.firstname=firstname;
      });

    this.storage.get('lastname').then((lastname) => {
       this.lastname=lastname;
      });
      this.storage.get('roleUser').then((roleUser) => {
        this.roleUser=roleUser;
        console.log(this.roleUser);
       });
    
    this.getdata();
    this.getDataType();
    this.page= 1;


    this.redditService.getcontractsName().subscribe(data => {
    this.contractsName=data;
    })

    this.redditService.getcontractsState().subscribe(data => {
    this.contractsStates=data;
    
    })
    this.redditService.getcontractdurationUnits().subscribe(data => {
    this.contractsDurations=data;
    })
    

    this.redditService.getDataPartenaires(this.page,this.table7,this.per_page,this.exitstatus,this.filter).subscribe(data => {
      console.log(data);
      this.clients=data.clients;
    })



    }
  
      async  doSave() {
       this.startdate = this.datePipe.transform(this.startdate,"yyyy-MM-dd");
       //this.enddate = this.datePipe.transform(this.enddate,"yyyy-MM-dd");
       this.contractDate = this.datePipe.transform(this.contractDate,"yyyy-MM-dd");
       setTimeout(() => { 
        this.updatedata();
       }, 800); 
       
       }
  
  

       async  updatedata() {
  
       var  data =    {

        "contractTitle": this.title,
        "structureContract": this.structureContract,

        "startingDate": this.startdate,
        "endDate":   this.endDate,
        "contractDate": this.contractDate,


        "globalAmount": this.globalAmount,
        "monthlyAmount": this.monthlyAmount,
        "missionDuration": this.duration,
        "durationUnit": this.monthlyAmountunity,


        "accountId": this.accountId,
        "clientId": this.clientId,
      
        "contractId": this.id,
       
        "fse": false,
        

     }
     console.log(data);
 
 
      
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
            
              
             
             this.redditService.updateByid(this.table1,data) 
             .toPromise()
             .then((response) =>
   
             {
               console.log(response);
               setTimeout(() => { 
               this.editpage();
               this.getdata();
              }, 800); 
             
             })
           }}]
           });
           await alert.present();
        
        }
   
       async editpage() {
        this.edit=!this.edit;
  
       }
    
       async getdata() {


        this.comment="";
        this.redditService.getByid(this.table, this.id).subscribe(data=>{
            this.postdata = data;

            console.log(this.postdata);


            this.posts = [data];
            this.rates=this.posts[0].rates;
            this.contractId = data.contractId;


            this.title = data.contractTitle;
            this.structureContract = data.structureContract;

            this.startdate = data.startingDate;
            this.endDate = data.endDate;
            this.contractDate= data.contractDate;


            this.globalAmount=data.globalAmount;
            this.monthlyAmount=data.monthlyAmount;
            this.duration=data.missionDuration;
            this.monthlyAmountunity=data.durationUnit;

            this.accountId= data.accountId;
            this.clientId= data.clientId;


            this.getPorte();
            this.getClient();     
      
           
       
        })
  
       }


       async getClient() {
        console.log( this.clientId);
          this.redditService.getByid(this.table5, this.clientId).subscribe(data=>{
            console.log(data);
          this.nameClient = data.denomination;
          })
       }

       async getPorte() {
          this.redditService.getByid(this.table6, this.accountId).subscribe(data=>{
          console.log(data);
          this.lastNamePorte =  data.lastName;
          this.firstNamePorte = data.firstName;
          })
  
       }
  

    getDataType(){
        this.page=1;
        this.redditService.getDataByPage(this.page,this.table3,this.per_page,this.filter).subscribe(data => {
          console.log(data);
          this.poststypes=data.eventType;
          this.total=data.totalItems;
          this.currentpage=data.currentPage;  
          this.last_page=data.totalPages;   
        })
     }  
  
  AddComment(){
     var data = {
       "lastName": this.firstname,
       "firstName":this.lastname,
       "comment": this.comment
     };
     this.redditService.addcommentContrat(this.id, data)  
     .subscribe(async (response) => {
       console.log(response); 
         setTimeout(() => { 
         this.getdata();
        }, 1000); 
     })
   }

 askModification(){

  var data = {
    "lastName": this.firstname,
    "firstName":this.lastname,
    "comment": this.comment
  };

 this.redditService.askModification(this.id,data)  
 .subscribe(async (response) => {
   console.log(response); 
     setTimeout(() => { 
     this.getdata();
    }, 1000); 
 })
 }

 askValidation(){

  var data = {
    "lastName": this.firstname,
    "firstName":this.lastname,
    "comment": this.comment
  };
  this.redditService.askValidation(this.id, data)  
  .subscribe(async (response) => {
    console.log(response); 
      setTimeout(() => { 
      this.getdata();
     }, 1000); 
  })
  }


  refuseContrat(){

    var data = {
      "lastName": this.firstname,
      "firstName":this.lastname,
      "comment": this.comment
    };
  this.redditService.refuseContract(this.id, data)  
  .subscribe(async (response) => {
    console.log(response); 
      setTimeout(() => { 
      this.getdata();
     }, 1000); 
  })
  }

  validateContrat(){

    var data = {
      "lastName": this.firstname,
      "firstName":this.lastname,
      "comment": this.comment
    };
    this.redditService.validateContrat(this.id,data)  
    .subscribe(async (response) => {
      console.log(response); 
        setTimeout(() => { 
        this.getdata();
       }, 1000); 
    })
  }
   
  }
  