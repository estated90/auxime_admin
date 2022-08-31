




import { Injectable } from '@angular/core';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { throwError, Observable, from } from 'rxjs';
import { retry,  } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class RedditService {
URLbase = "http://10.10.10.18:8500/api/";
language: string="EN";
exp: any;
token: any;
headers: HttpHeaders; 
tokenrefresh: string;
  alertmsg: string;
  alertmessage: any;


constructor(public http: HttpClient, public storage: Storage,  public alertController: AlertController, 
  public auth: AuthenticationService ) {
  this.storage.get('token').then((token) => {
    this.token=token;
  });

  this.storage.get('token').then((token) => {
    this.token=token;
  });
} 


httpOptions = {
  headers: new HttpHeaders({
    'X-XSRF-TOKEN': "null",
   'Content-Type': 'application/json',
})}

httpOptionsfile = {
  headers: new HttpHeaders({
     'enctype':'multipart/form-data',
     'Content-Type': 'application/json',
})}


/////// List
getPageList(): Observable<any> {
  return this.http
    .get<any>(this.URLbase + 'getPageList',this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

/////Login

login(data): Observable<any> {
  return this.http
    .post<any>(this.URLbase +'auth/signin',data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}


verif(table,id): Observable<any> {
  return this.http
    .get<any>(this.URLbase+'email/verify/'+id,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

getDataBypage(page, table, per_page,startdate,enddate,priority, filter): Observable<any> {
  return this.http
    .get<any>(this.URLbase + table + '?page=' + page + '&size=' + per_page +'&startDate=' +startdate+'&endDate=' +enddate+'&priority='+priority+'&filter='+filter)
    .pipe(retry(2), catchError(this.handleError))
}


getDataByPage(page, table, per_page,filter): Observable<any> {
  return this.http
    .get<any>(this.URLbase + table + '?page=' + page + '&size=' + per_page +'&filter='+filter)
    .pipe(retry(2), catchError(this.handleError))
}

getTrainingList(page, table, per_page,filter): Observable<any> {
  return this.http
    .get<any>(this.URLbase + table + '?page=' + page + '&size=' + per_page +'&filter='+filter,this.httpOptions)
    .pipe(retry(2), catchError(this.handleError))
}


getDataPartenaires(page, table, per_page,exitstatus,filter): Observable<any> {
  return this.http
    .get<any>(this.URLbase + table + '?page=' + page + '&size=' + per_page+'&status='+exitstatus+'&filter='+filter)
    .pipe(retry(2), catchError(this.handleError))
}
getDataList(page, table, per_page,filter): Observable<any> {
  return this.http
    .get<any>(this.URLbase + table + '?page=' + page + '&size=' + per_page +'&filter='+filter,this.httpOptions)
    .pipe(retry(2), catchError(this.handleError))
}

getDataByPagePorte(page, table, per_page,occupation,exitstatus,filter, manager, buisnessmanager): Observable<any> {
  return this.http
    .get<any>(this.URLbase + table + '?page=' + page + '&size=' + per_page +'&occupation='+occupation+'&exitStatus='+exitstatus+'&filter='+filter+'&manager='+manager+'&businessManager='+buisnessmanager)
    .pipe(retry(2), catchError(this.handleError))
}

getDataBypageCalendar(page, table, per_page,startdate,enddate,priority, filter): Observable<any> {
  return this.http
    .get<any>(this.URLbase + table + '?page=' + page + '&size=' + per_page +'&startDate=' +startdate+'&endDate=' +enddate+'&active='+priority+'&filter='+filter)
    .pipe(retry(2), catchError(this.handleError))
}



getMyAccount(): Observable<any> {
  return this.http
    .get<any>(this.URLbase+"accountManagement/accounts/getMyAccount",this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}




updatecontratByid(table,id, data): Observable<any> {
  return this.http
    .put<any>(this.URLbase+table+id,data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

refreshToken(): Observable<any> {

  this.storage.get('refreshToken').then((rT) => {
    this.tokenrefresh=rT;
    console.log(this.tokenrefresh);
  });
  let headers: {};

  this.storage.get('refreshToken').then(token => {
    headers = {
      'Authorization': 'Bearer '+ this.tokenrefresh
    };
  })

console.log(headers)
  return this.http
  .get<any>(this.URLbase+"auth/refreshToken", headers)
  .pipe(retry(2),catchError(this.handleError))
  
  }
  

getExitStatus(): Observable<any> {
  return this.http
    .get<any>(this.URLbase + 'accountManagement/enums/exitStatus',this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}


getOccupation(): Observable<any> {
  return this.http
    .get<any>(this.URLbase + 'accountManagement/enums/occupation',this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

getphoneNumberType(): Observable<any> {
  return this.http
    .get<any>(this.URLbase + 'accountManagement/enums/phoneNumberType',this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}


getRoleNames(): Observable<any> {
  return this.http
    .get<any>(this.URLbase + 'accountManagement/enums/roleNames',this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}





//////HOMAPAGE 


getHomaPageStat(): Observable<any> {
  return this.http
    .get<any>(this.URLbase + 'homepage/statsHome',this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}


getHomaPageSlider(): Observable<any> {
  return this.http
    .get<any>(this.URLbase + 'homepage/slider?page=1&size=10&status=true',this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}


///

getDataByPageUsers(page, table, per_page,filter): Observable<any> {
  return this.http
    .get<any>(this.URLbase + table + '?page=' + page + '&size=' + per_page +'&filter='+filter)
    .pipe(retry(2), catchError(this.handleError))
}

getByid(table,id): Observable<any> {
  return this.http
    .get<any>(this.URLbase+table+id,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}


updateByid(table, data): Observable<any> {
  return this.http
    .put<any>(this.URLbase+table,data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

signupEvent(table,id): Observable<any> {
  return this.http
    .put<any>(this.URLbase+table+id,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}


addPost(table,data): Observable<any> {
  return this.http
    .post<any>(this.URLbase+table,data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

putPost(table,data): Observable<any> {
  return this.http
    .put<any>(this.URLbase+table,data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
} 
deletePost(table, id): Observable<any> {
  return this.http
    .delete<any>(this.URLbase+table+'/'+id)
    .pipe(retry(2),catchError(this.handleError))
   
}


getFile(id): Observable<any> {
  return this.http
    .get<any>(this.URLbase+'homepage/image/'+id)
    .pipe(retry(2),catchError(this.handleError))
}





postByid(table,id): Observable<any> {
  return this.http
    .get<any>(this.URLbase+table+'/'+id,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}


update(table,id, data): Observable<any> {
  return this.http
    .put<any>(this.URLbase+table+'/'+id,data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

delete(table,id): Observable<any> {
  return this.http
    .delete<any>(this.URLbase+table+'/'+id,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}



allData(table): Observable<any> {
  return this.http
    .get<any>(this.URLbase+table,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}


forgetpassword(data): Observable<any> {
  return this.http
    .post<any>(this.URLbase +'forgotpassword',data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}



imageupload(table, idslider,formdata): Observable<any> {
  return this.http
    .post<any>(this.URLbase+table+idslider,formdata, this.httpOptionsfile
      
      
    /*  {
 headers: new HttpHeaders({

        'Content-Type': 'multipart/form-data'

    })}*/
    
    )

    .pipe(retry(2),catchError(this.handleError))
}


notifsByid(id,page,table,per_page,order_id,order_by,category,status,filter): Observable<any> {
  return this.http
    .get<any>(this.URLbase+table+'/notifs_user/'+id+'?page='+page+'&per_page='+per_page+'&order_id='+order_id+'&order_by='+order_by+'&filter='+filter)
    .pipe(retry(2),catchError(this.handleError))
}

////////////SEND MESSAGE
sendmessage(data): Observable<any> {
  return this.http
  .post<any>(this.URLbase +'sendrdv',data,this.httpOptions)
  .pipe(retry(2),catchError(this.handleError))
}

sendform1(data): Observable<any> {
  return this.http
  .post<any>(this.URLbase+'sendform1',data,this.httpOptions)
  .pipe(retry(2),catchError(this.handleError))
}

adduser(data): Observable<any> {
  return this.http
    .post<any>(this.URLbase+'adduser',data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

getContrats(page, table, per_page,startdate,enddate,priority,structure,contractStatus, filter): Observable<any> {
  return this.http
    .get<any>(this.URLbase + table + '?page=' + page + '&size=' + per_page +'&startDate=' +startdate+'&endDate=' +enddate+'&contractState='+priority+'&structureContract='+structure+'&contractStatus='+contractStatus+'&filter='+filter)
    .pipe(retry(2), catchError(this.handleError))
}


getcontractsName(): Observable<any> {
  return this.http
    .get<any>(this.URLbase + 'contractManagement/enums/contractsName',this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}


getcontractsState(): Observable<any> {
  return this.http
    .get<any>(this.URLbase + 'contractManagement/enums/contractsState',this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

getcontractStatus(): Observable<any> {
  return this.http
    .get<any>(this.URLbase + 'contractManagement/enums/contractStatus',this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}


getcontractdurationUnits(): Observable<any> {
  return this.http
    .get<any>(this.URLbase + 'contractManagement/enums/durationUnits',this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}




///////////


askModification(id, data): Observable<any> {
  return this.http
    .put<any>(this.URLbase+'contractManagement/commercialContract/askModification?contractId='+id,data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

askValidation(id,data): Observable<any> {
  return this.http
    .put<any>(this.URLbase+'contractManagement/commercialContract/pendingValidation?contractId='+id,data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

refuseContract(id,data): Observable<any> {
  return this.http
    .put<any>(this.URLbase+'contractManagement/commercialContract/refuseContract?contractId='+id,data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

validateContrat(id,data): Observable<any> {
  return this.http
    .put<any>(this.URLbase+'contractManagement/commercialContract/validateContract?contractId='+id,data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}


addcommentContrat(id,data): Observable<any> {
  return this.http
    .put<any>(this.URLbase+'contractManagement/commercialContract/addComment?contractId='+id,data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}



desactiveById(table,id): Observable<any> {
  return this.http
    .put<any>(this.URLbase+table+id,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

////USER
updateUser(data): Observable<any> {
  return this.http
    .post<any>(this.URLbase +'updateuser',data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}
updatepassword(data): Observable<any> {
  return this.http
    .post<any>(this.URLbase +'updatepassword',data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

updateuserpassword(data): Observable<any> {
  return this.http
    .post<any>(this.URLbase +'updateuserpassword',data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

///////PAGES 

addPage(data): Observable<any> {
  return this.http
    .post<any>(this.URLbase +'addPage',data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

updatePage(data): Observable<any> {
  return this.http
    .post<any>(this.URLbase +'updatePage',data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

///////USERS

userExist(data): Observable<any> {
  return this.http
    .post<any>(this.URLbase +'userexist',data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

register(data): Observable<any> {
  return this.http
    .post<any>(this.URLbase +'register',data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

updateUserAdmin(data): Observable<any> {
  return this.http
    .post<any>(this.URLbase +'updateuseradmin',data,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
}

////////////FONCTION PFA
usersbyfkid(page,fkuser): Observable<any> {
  return this.http
  .get<any>(this.URLbase +'usersbyfkid/'+page+'?fkuser='+fkuser,this.httpOptions)
  .pipe(retry(2),catchError(this.handleError))
}


////////////FONCTION NOTIF 

addnotif(data): Observable<any> {
  return this.http
  .post<any>(this.URLbase +'addnotif',data,this.httpOptions)
  .pipe(retry(2),catchError(this.handleError))
}


///////////LOG 

/** Log a HeroService message with the MessageService */
private log(message: string) {
  console.log(message);
}
// Handle API errors
  async handleError(error: HttpErrorResponse) {


  console.log("-----------");
  console.log(error.error.errors);

  this.alertmessage=error.error.errors;
  this.alertmsg=JSON.stringify(this.alertmessage);
  console.log("-----------");
  console.log(this.alertmessage);
  console.log(this.alertmsg);

  alert(this.alertmsg);

  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
 // return throwError(
  //  'Something bad happened; please try again later.');
};



  async alert(alertmsg){
await this.alertController.create({
  header: 'Erreusssr',
  message: this.alertmsg,
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
  
  }}]
  });

}


}









