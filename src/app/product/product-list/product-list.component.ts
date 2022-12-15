import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ProductElementModel} from "../models/product-element.model";
import {MatDialog} from "@angular/material/dialog";
import {ProductServiceService} from "../services/product-service.service";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {


  @Input()
  products: ProductElementModel[] = [];

  product!: ProductElementModel;

  constructor(public dialog: MatDialog,
              private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.getAllProducts();
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
  getAllProducts(): void {
    this.productService.getAllProducts()
      .subscribe(data => {
        this.products = data;
        console.log(this.products);
      })
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
