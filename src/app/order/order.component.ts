import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../product/dialog/dialog.component";
import {OrderService} from "./services/order.service";
import {DialogOrderComponent} from "./dialog-order/dialog-order.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'orderNumber', 'skuCode', 'price', 'quantity', 'update', 'delete'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  openDialog() {
    this.dialog.open(DialogOrderComponent, {
      width: '30%'
    }).afterClosed().subscribe(value => {
      if (value ==='save') {
        this.getAllOrders();
      }
    })
  }
  getAllOrders() {
    this.orderService.getAllOrders()
      .subscribe({
        next:(res) => {
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(err) => {
          console.log(err);
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  payOrder(orderNumber: any) {
    this.orderService.payOrder(orderNumber)
      .subscribe({
        next:(res) => {
          this._snackBar.open('Bezahlung mit der Nummer' + orderNumber + ' initialisiert', 'Danke!');
          this.getAllOrders();
        },
        error:(err) => {
          console.log(err);
          this._snackBar.open('Bezahlung mit der Nummer' + orderNumber + ' initialisiert', 'Danke!');
          this.getAllOrders();
        }
      })
  }

  deleteProduct(orderId: number) {
    this.orderService.deleteOrder(orderId)
      .subscribe({
        next:(res) => {
          this._snackBar.open('Produkt mit der Nummer' + orderId + ' erfolgreich aus dem Warenkorb gelöscht', 'Danke!');
          this.getAllOrders();
        },
        error:(err) => {
          console.log(err);
        }
      })
  }

}
