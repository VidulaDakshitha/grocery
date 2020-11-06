import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule, NbButtonModule, NbWindowModule,  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule, NbTabsetModule } from '@nebular/theme';
  import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { SampleComponent } from './sample/sample.component';
import { ProductsComponent } from './products/products.component';
import { ImageUploaderModule } from 'ngx-image-uploader-next';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './order/order.component';
import { CatergoryComponent } from './catergory/catergory.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbCardModule, //
    NbButtonModule,
    NbWindowModule,
    ImageUploaderModule,
    NbInputModule,
    NbSelectModule,
    HttpClientModule,
    ngFormsModule,
    NbTabsetModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PagesComponent,
    SampleComponent,
    ProductsComponent,
    OrderComponent,
    CatergoryComponent,
  ],
})
export class PagesModule {
}
