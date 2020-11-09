import { Component, OnInit , TemplateRef, ViewChild} from '@angular/core';
import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { ImageUploaderOptions, FileQueueObject, ImageResult } from 'ngx-image-uploader-next';
import { HttpClient } from '@angular/common/http';
// import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import { observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})




export class ProductsComponent implements OnInit {

  fileData: string;
  fileDataEdit: string;
  productData: Array<String>;
  productEditImage: '';
  updateImage = false;
  value : NbWindowRef;
  value2 : NbWindowRef;
  updateID = '';

 addProducts = new FormGroup({
    productCatergory: new FormControl('1'),
    productName: new FormControl(''),
    productPrice: new FormControl(''),
    productDiscount: new FormControl(''),
    productDescription: new FormControl(''), 
  })

  EditProducts = new FormGroup({
    productCatergoryEdit: new FormControl('2'),
    productNameEdit: new FormControl(''),
    productPriceEdit: new FormControl(''),
    productDiscountEdit: new FormControl(''),
    productStockEdit: new FormControl(''),
    productDescriptionEdit: new FormControl(''), 
  })

  productNameEdit = new FormControl('');
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


  constructor(private windowService: NbWindowService, private http: HttpClient, private db: AngularFireDatabase) { 

  }

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










  this.db.database.ref('product').on('value', (snapshot) => {

this.productData = [];


   snapshot.forEach(data => {
    this.productData =   [...this.productData, {id: data.key, ... data.val()}];



   });
  }
);




  }

  setValuesEdit(image, productName, productPrice, productDiscount, productDescription, productStatus, id) {
console.warn('working')
   
    this.EditProducts.get('productNameEdit').patchValue(productName);
    this.EditProducts.get('productPriceEdit').patchValue(productPrice);
    this.EditProducts.get('productDiscountEdit').patchValue(productDiscount);
    this.EditProducts.get('productStockEdit').patchValue(productStatus);
    this.EditProducts.get('productDescriptionEdit').patchValue(productDescription);
    this.productEditImage = image;
    this.updateID = id;


  }


  UpdateImageFunction(){
    //this.value.close()
    this.updateImage = true;
  }


  onProductSubmit() {
    const data = {
image: this.fileData,
productCatergory: this.addProducts.value.productCatergory,
productStatus:"1",
productName: this.addProducts.value.productName,
productPrice: parseFloat(this.addProducts.value.productPrice).toFixed(2),
productDiscount: parseFloat(this.addProducts.value.productDiscount).toFixed(2),
productDescription: this.addProducts.value.productDescription, 

    }
    console.warn("visitd function")
    console.warn(this.addProducts.value);
this.db.database.ref('product').push().set(data).catch(err => console.warn(err));
 this.addProducts.reset();
 this.value2.close();

 Swal.fire(
  'Good job!',
  'You clicked the button!',
  'success'
)

  }




  onProductUpdate() {
    let data1;

    if(this.updateImage === false)
    {

      data1 = {
        image: this.productEditImage,
        productCatergory: this.EditProducts.value.productCatergoryEdit,
        productStatus:this.EditProducts.value.productStockEdit,
        productName: this.EditProducts.value.productNameEdit,
        productPrice: parseFloat(this.EditProducts.value.productPriceEdit).toFixed(2),
        productDiscount: parseFloat(this.EditProducts.value.productDiscountEdit).toFixed(2),
        productDescription: this.EditProducts.value.productDescriptionEdit,
        }

    } else {

       data1 = {
        image: this.fileDataEdit,
        productCatergory: this.EditProducts.value.productCatergoryEdit,
        productStatus:this.EditProducts.value.productStockEdit,
        productName: this.EditProducts.value.productNameEdit,
        productPrice: parseFloat(this.EditProducts.value.productPriceEdit).toFixed(2),
        productDiscount: parseFloat(this.EditProducts.value.productDiscountEdit).toFixed(2),
        productDescription: this.EditProducts.value.productDescriptionEdit, 
        
            }
    }



    this.db.database.ref('product').orderByKey().equalTo(this.updateID).once('value',(snapshot) => {
      snapshot.forEach( data =>{
        this.db.database.ref(`product/${data.key}/`).update(data1)
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