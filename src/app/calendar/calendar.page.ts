import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { AlertController, LoadingController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
        selector: 'app-calendar',
        templateUrl: './calendar.page.html',
        styleUrls: ['./calendar.page.scss'],
  })
export class CalendarPage implements OnInit {

  
      
  calendarOptions: CalendarOptions;
  eventsModel: any;
  table: string="schedulerManagment/eventPlanning/allEvents";
  table2: string="schedulerManagment/eventPlanning/details?eventId=";
  table3: string="schedulerManagment/eventPlanning/signupEvent?eventId=";

  status:number=0;
  category:number=0;
  filter: any="";
  word: any="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=10;
  order_id:any="id";
  order_by:any="desc";
  tabBarElement: any;
  supplier: any;
  postData: any;
  startdate:any = "2022-01-15";
  enddate: any= "2025-06-17";
  startdateselect: any;
  startdatend: string;
  title: any;
  message: string;
  iduser: any;
  firstname: any;
  lastname: any;
  page:any=1;
  posts: any;
  currentpage: any;
  priority:boolean=true;
  events: any;
  eventsdata: number;
  startdate1:Date;
  handleDate: any;
  content: any;
  id: any;
  training: any[];
  hote: any[];
  idhote: any;
  duration: any;
  idevent: any;
  postsevent: any[];
  lngevnt: number=0;
  roleUser: any;

 


  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
     private route: ActivatedRoute,
     private router: Router,  
     public loadingController: LoadingController, 
     public redditService: RedditService, 
     public toastCtrl: ToastController,
     public popoverController: PopoverController,
     private storage: Storage,
     public alertController: AlertController

  ) {


  }


  
  ngOnInit() {





    this.storage.get('roleUser').then((roleUser) => {
      this.roleUser=roleUser;
     });

     
    this.storage.get('iduser').then((val) => {
      this.iduser=val;
      console.log(this.iduser)
    });

  
    var calendar = document.getElementById('calendar');

    this.calendarOptions = {
      timeZone: 'UTC',
      locale: 'fr',
      plugins: [dayGridPlugin, interactionPlugin],
      editable: false,
      initialView: 'dayGridMonth',
   //  initialView: 'timeGridDay',
      firstDay:1,
      scrollTime:15,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');

          }
          }
      },
  /*next: {
          text: 'Next',
          click: function() {
                      // so something before

                 
                   console.log("NEXTFFFF");
              //     console.log(calendar.currentRange);
        
          }
        },
      },*/
      headerToolbar: {
        left: 'prev,next,today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      contentHeight: 'auto',
      eventTimeFormat: { // like '14:30:00'
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false
      },
      buttonText: {
        today:    'Aujourd hui',
        month:    'mois',
        week:     'semaine',
        day:      'jour',
        list:     'list'
      },
      displayEventTime:true,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this),
      select: this.handleDateSelect.bind(this),
      //handleFullcalendar(this),
       visibleRange: function(currentDate) {
        // Generate a new date for manipulating in the next step
        var startDate = new Date(currentDate.valueOf());
        var endDate = new Date(currentDate.valueOf());
   
        // Adjust the start & end dates, respectively
        startDate.setDate(startDate.getDate() - 1); // One day in the past
        endDate.setDate(endDate.getDate() + 2); // Two days into the future
    
        return { start: startDate, end: endDate };
      }
  };
 


  // calendar = document.getElementById('calendar');
//this.dataview=calendar.fullcalendar('getView');
/*//console.log(this.dataview);
  var calendar = new Calendar(calendar, {
      initialView: 'dayGridWeek',
      views: {
        pastAndFutureView: {
          visibleRange: function(currentDate) {
            // Generate a new date for manipulating in the next step
            var startDate = new Date(currentDate.valueOf());
            var endDate = new Date(currentDate.valueOf());
            
            // Adjust the start & end dates, respectively
             startDate.setDate(startDate.getDate() - 1); // One day in the past
            endDate.setDate(endDate.getDate() + 2); // Two days into the future
    
            console.log("GGG");
    console.log(startDate);
            return { start: startDate, end: endDate };
          }
        }
      }
  
    });
*/
   // console.log(calendar.getEvents());
   /* this.route.params.subscribe(params => {
      this.iduser = params['id'];
      this.firstname = params['firstname'];
      this.lastname = params['lastname'];
      console.log( this.iduser );
     
    });*/

    // need for load calendar bundle first
    this.getData();
  }

  handleDateClick2(arg) {
    console.log(arg);
  }

  async handleEventClick(arg) {
    console.log(arg);

    console.log(arg.event._def.extendedProps.name);
    this.title = arg.event._def.title;
    this.message = this.title;
    
    this.idevent =  arg.event._def.extendedProps.data;
    this.getevent();
    /*
    const alert = await this.alertCtrl.create({
      header: this.title ,
      subHeader: "",
      message:  this.content,
      buttons: [
      {
          text: 'Voir plus',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.router.navigateByUrl('/edit-eventplanning/' + arg.event._def.extendedProps.data);
       
          }
      },
      {
        text: 'Fermer',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }
    ]
    });

    await alert.present();
*/
  }

  handleDateSelect(arg) {
    console.log(arg);
  }
  
  handleEventDragStop(arg) {
    console.log(arg);
  }

  handleDateClick(dateClickEvent) {
    console.log("DATE CLICKED !!!");
   // console.log(arg);
  }

  updateEvents() {
    const nowDate = new Date();
    const yearMonth = nowDate.getUTCFullYear() + '-' + (nowDate.getUTCMonth() + 1);

  
  }
  handleFullcalendar(arg){
    console.log(arg);
  }

  getData(){
    console.log(this.startdate);
     console.log(this.startdate);
     console.log(this.enddate);
      this.redditService.getDataBypageCalendar(this.page,this.table,this.per_page,this.startdate,this.enddate, this.priority,this.filter).subscribe(data => {
        console.log(data);
        this.posts=data.events;
        this.total=data.totalItems;
        this.currentpage=data.currentPage;  
        this.last_page=data.totalPages;   
       
        var arr = [];  
  
        this.posts.forEach((currentValue, i) => {
            console.log(currentValue);
            this.eventsdata= arr.push({
              start: currentValue.dayHourEvent,
              title: currentValue.training.trainingName,
            //  content : currentValue.host.firstName + currentValue.host.lastName,
             /// textColor: 'black',  
              data: currentValue.eventId,
              backgroundColor:currentValue.training.eventColor,
              allDay: true,
            })
            console.log(this.eventsdata);
        });

        this.calendarOptions.events = arr;
    
    
      })
   }  



   async getevent() {
    this.redditService.getByid(this.table2, this.idevent).subscribe(data=>{
        this.postsevent = [data];
        console.log(this.postsevent);
        this.training=[data.training];
        this.hote=[data.host];
        this.idhote= data.host.accountId;
        this.lngevnt =  this.postsevent.length;
        console.log(this.lngevnt);
    
    })

   }





   async  SignupEvent() {


  
     const alert = await this.alertController.create({
       header: 'Inscription',
       message: 'Voulez-vous vraiment vous inscrire ? ',
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
        
          
         
         this.redditService.signupEvent(this.table3,this.idevent) 
         .toPromise()
         .then((response) =>

         {
           console.log(response);
           setTimeout(() => { 
            this.getevent();
          
          }, 400); 
         
         })
       }}]
       });
       await alert.present();
   
    }




  
}

