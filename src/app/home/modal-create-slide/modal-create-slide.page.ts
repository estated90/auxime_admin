// my-modal.page.ts
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';

@Component({
  selector: 'app-modal-create-slide',
  templateUrl: './modal-create-slide.page.html',
  styleUrls: ['./modal-create-slide.page.scss'],
})
export class ModalCreateSlidePage implements OnInit {


  private file: File;
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  modalTitle: string;
  modelId: number;

  table: string="homepage/slider";
  table2: string="homepage/image?sliderId=";
  title: any="";
  content: any="";
  idsilder: any;
  


  
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public redditService:RedditService
  ) { }



  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  
  fileOverBase(ev): void {
    this.hasBaseDropZoneOver = ev;
  }
  reorderFiles(reorderEvent: CustomEvent): void {
    let element = this.uploader.queue.splice(reorderEvent.detail.from, 1)[0];
    this.uploader.queue.splice(reorderEvent.detail.to, 0, element);
  }




  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    const onClosedData: string = "Slide ajouté";
    await this.modalController.dismiss(onClosedData);
  }




  doSave(){

    var data = JSON.stringify({ 
    title: this.title,
    content: this.content,
    status:false,
  
    });
    
    console.log(data);
    
    
    this.redditService.addPost(this.table,data)  
    .toPromise()
    .then((response) =>{
    console.log(response);
    this.idsilder=response.sliderId;
        setTimeout(() => { 

       }, 400); 
    })
    }
    
 


    onFileChange(fileChangeEvent) {


      console.log(fileChangeEvent);
      this.file = fileChangeEvent.target.files[0];
   
      console.log(this.file);
      console.log(this.file.name);


      var data = JSON.stringify({ 
        title: this.title,
        content: this.content,
        status:false,
      
        });
        
        console.log(data);
        
        
        this.redditService.addPost(this.table,data)  
        .toPromise()
        .then((response) =>{
        console.log(response);
        this.idsilder=response.sliderId;
            setTimeout(() => { 

              var formdata = new FormData();
          //formdata.append("file", this, this.file.name);
              formdata.append('file', this.file );
             // formdata.append("file", this.file, this.file.name);
              console.log(formdata);
            //  var datafile  =   console.log(formdata.get('file'));
            
              this.redditService.imageupload(this.table2,this.idsilder,formdata)  
              .toPromise()
              .then((response) =>{
              console.log(response);
               setTimeout(() => { 
               this.closeModal();
               }, 400); 
              })

    
           }, 600); 
        })


}





}


