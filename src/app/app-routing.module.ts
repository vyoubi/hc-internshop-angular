import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {OrderComponent} from "./order/order.component";
import {InventoryComponent} from "./inventory/inventory.component";
import {NotificationComponent} from "./notification/notification.component";
import {ProductListComponent} from "./product/product-list/product-list.component";
import {AddProductComponent} from "./product/add-product/add-product.component";

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'shop', component: OrderComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'notifications', component: NotificationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
