import {Component, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {ProductServiceService} from "./services/product-service.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ProductElementModel} from "./models/product-element.model";
import {DialogOrderComponent} from "../order/dialog-order/dialog-order.component";
import {OrderService} from "../order/services/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public isActive: boolean = false;

  @Input()
  product!: ProductElementModel;

  @Output()
  selectProduct: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog,
              private router: Router,
              private productService: ProductServiceService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  goToWarenkorb(product: any): void {
    this.product = product;
    this.selectProduct.emit(this.product);
    this.orderService.postOrder({
      skuCode: this.product.name,
      price: this.product.price,
      quantity: 1
    })
      .subscribe({
        next: (res) => {
          alert("Order added successfully");
        },
        error: (err) => {
          // console.log(err);
          alert("Order added successfully");
        }
      });
    this.router.navigate(['shop']);
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(value => {
      if (value ==='save') {
        this.getAllProducts();
      }
    })
  }
  getAllProducts() {
    this.productService.getAllProducts();
  }


  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data:row
    }).afterClosed().subscribe(value => {
      if (value === 'update') {
        this.getAllProducts();
      }
    })
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId)
      .subscribe({
        next:(res) => {
          alert("product with the id " + productId + " removed successfully");
          this.getAllProducts();
        },
        error:(err) => {
          console.log(err);
        }
      })
  }

}
