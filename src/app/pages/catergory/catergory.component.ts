import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { ImageUploaderOptions, FileQueueObject, ImageResult } from 'ngx-image-uploader-next';
import { HttpClient } from '@angular/common/http';
// import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import { observable } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'ngx-catergory',
  templateUrl: './catergory.component.html',
  styleUrls: ['./catergory.component.scss']
})
export class CatergoryComponent implements OnInit {


  fileData: string;
  fileDataEdit: string;
  productData: Array<String>;
  productEditImage: '';
  updateImage = false;
  value : NbWindowRef;
  value2 : NbWindowRef;
  updateID = '';

  addCatergory = new FormGroup({
    catergoryName: new FormControl(''),
    catergoryDescription: new FormControl(''), 
  })

  EditCatergory = new FormGroup({
    
    catergoryNameEdit: new FormControl(''),
    catergoryStockEdit: new FormControl(''),
    catergoryDescriptionEdit: new FormControl(''), 
  })



  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;


  


options: ImageUploaderOptions  = {
  thumbnailHeight: 150,
  thumbnailWidth: 150,
  uploadUrl: 'https://fancy-image-uploader-demo.azurewebsites.net/api/demo/upload',
  allowedImageTypes: ['image/png', 'image/jpeg'],
  maxImageSize: 1,

};



onUpload(file: ImageResult) {
  console.log(file.file);
  this.readImage(file.file);
}



 readImage(file) {
  // Check if the file is an image.
  if (file.type && file.type.indexOf('image') === -1) {
    console.log('File is not an image.', file.type, file);
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    //img.src = event.target.result;
    console.log(event.target.result)
    this.fileData = event.target.result as string;
  });
  reader.readAsDataURL(file);
}






onUploadEdit(file: ImageResult) {
  console.log(file.file);
  this.readImageEdit(file.file);
}



 readImageEdit(file) {
  // Check if the file is an image.
  if (file.type && file.type.indexOf('image') === -1) {
    console.log('File is not an image.', file.type, file);
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    //img.src = event.target.result;
    console.log(event.target.result)
    this.fileDataEdit = event.target.result as string;
  });
  reader.readAsDataURL(file);
}


constructor(private windowService: NbWindowService, private http: HttpClient, private db: AngularFireDatabase) { }





  openWindow(contentTemplate) {
    this.value2 = this.windowService.open(
      contentTemplate,
      {
        title: 'Add New Product',
        context: {
          text: 'some text to pass into template',
        },
        closeOnBackdropClick: false,
      },
    );
  }


openWindowEdit(edittemplate) {
    this.value = this.windowService.open(
      edittemplate,
      {
        title: 'Edit Product',
        context: {
          text: 'some text to pass into template',
        },
        closeOnBackdropClick: false,
     
        
      },
    );

this.value.onClose.subscribe(val => {
this.updateImage = false;

});
  
  }

  close() {
    //this.windowRef.close();
    this.value.close();
  }


  ngOnInit(): void {


  //   const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
  //   this.http.get<any>('https://jsonplaceholder.typicode.com/posts', { headers }).subscribe({
  //     next: data => {
  //         console.warn(data);
  //     },
  //     error: error => { 
  //       console.warn(error);
  //     },
  // })










  this.db.database.ref('catergory').on('value', (snapshot) => {

this.productData = [];


   snapshot.forEach(data => {
    this.productData =   [...this.productData, {id: data.key, ... data.val()}];



   });
  }
);




  }

  setValuesEdit(image, catergoryName, catergoryDescription, catergoryStock, id) {

   
    this.EditCatergory.get('catergoryNameEdit').patchValue(catergoryName);
    this.EditCatergory.get('catergoryStockEdit').patchValue(catergoryStock);
    this.EditCatergory.get('catergoryDescriptionEdit').patchValue(catergoryDescription);
    this.productEditImage = image;
    this.updateID = id;


  }


  UpdateImageFunction(){
    //this.value.close()
    this.updateImage = true;
  }


  onCatergorySubmit() {
    const data = {
image: this.fileData,
catergoryStock:"1",
catergoryName: this.addCatergory.value.catergoryName,
catergoryDescription: this.addCatergory.value.catergoryDescription, 

    }

this.db.database.ref('catergory').push().set(data).catch(err => console.warn(err));
 this.addCatergory.reset();
 this.value2.close();

 Swal.fire(
  'Good job!',
  'You clicked the button!',
  'success'
)

  }




  oncatergoryUpdate() {
    let data1;

    if(this.updateImage === false)
    {

      data1 = {
        image: this.productEditImage,
        catergoryStock:this.EditCatergory.value.catergoryStockEdit,
        catergoryName: this.EditCatergory.value.catergoryNameEdit,
        catergoryDescription: this.EditCatergory.value.catergoryDescriptionEdit,
        }

    } else {

       data1 = {
        image: this.fileDataEdit,
        catergoryStock:this.EditCatergory.value.catergoryStockEdit,
        catergoryName: this.EditCatergory.value.catergoryNameEdit,
        catergoryDescription: this.EditCatergory.value.catergoryDescriptionEdit, 
        
            }
    }



    this.db.database.ref('catergory').orderByKey().equalTo(this.updateID).once('value',(snapshot) => {
      snapshot.forEach( data =>{
        this.db.database.ref(`catergory/${data.key}/`).update(data1)
      })
    })
    this.value.close();

    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )

  }




}
