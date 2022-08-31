import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {

  id: number;
  table: string="taskManament/tasks/create";
  table2: string="taskManament/eventType/listEvent";
  
  role:any=1;
  view:boolean=true;
  push: boolean=false;
  data: any;
  posts: any;
  content: string="";
  image:string="";
  title: string="";
  email: any;
  address: any;
  city: any;
  cp: any;
  phone: any;
  firstname: any;
  lastname: any;
  per_page:number=10;
  filter: any="";
  page: number;
  events: any;
  deadlineTask: Date;
  priority: number=1;
  event: any;
  poststypes: any;
  total: any;
  currentpage: any;
  last_page: any;
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

    this.getDataType();
  
  }

   doSave(){

    var data =   {
      "accountId": "9f60d15a-c928-419e-869a-afe8d604b795",
      "porteId": "44dcf578-7555-4743-b2cc-c52cf202d353",
      "partnerId": null,
      "deadlineTask": this.deadlineTask,
      "reminder":"2021-12-23T15:00:00",
      "taskName":this.title,
      "description":this.content,
      "eventType": [this.type],
      "priority":this.priority,
  }

console.log(data);

this.redditService.addPost(this.table,data)  
.subscribe(async (response) => {

  console.log(response);

console.log(response);
    setTimeout(() => { 
    this.router.navigateByUrl('/tasks');
   }, 400); 
})
}



getDataType(){
  this.page=1;
  this.redditService.getDataByPage(this.page,this.table2,this.per_page,this.filter).subscribe(data => {
    this.poststypes=data.eventType;
    this.total=data.totalItems;
    this.currentpage=data.currentPage;  
    this.last_page=data.totalPages;   
  })
}  


onChangeType(event){
  console.log(event.target.value);

}

}


