import { Component, OnInit , TemplateRef, ViewChild} from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { ImageUploaderOptions, FileQueueObject, ImageResult } from 'ngx-image-uploader-next';
import { HttpClient } from '@angular/common/http';
// import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent implements OnInit {

  fileData: string;
  productData: Array<String>;
  
 addProducts = new FormGroup({
    productCatergory: new FormControl('1'),
    productName: new FormControl(''),
    productPrice: new FormControl(''),
    productDiscount: new FormControl(''),
    productDescription: new FormControl(''), 
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


  constructor(private windowService: NbWindowService, private http: HttpClient, private db: AngularFireDatabase) { 

  }

  openWindow(contentTemplate) {
    this.windowService.open(
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










  this.db.database.ref('product').on('value', (snapshot) => {

this.productData = [];


   snapshot.forEach(data => {
    this.productData =   [...this.productData, {id: data.key, ... data.val()}];



   });


  }

);


  








  }


  onProductSubmit() {
    const data = {
image: this.fileData,
productCatergory: this.addProducts.value.productCatergory,
productName: this.addProducts.value.productName,
productPrice: this.addProducts.value.productPrice,
productDiscount: this.addProducts.value.productDiscount,
productDescription: this.addProducts.value.productDescription, 

    }
    console.warn("visitd function")
    console.warn(this.addProducts.value);
this.db.database.ref('product').push().set(data).catch(err => console.warn(err));
 this.addProducts.reset();

  }


}