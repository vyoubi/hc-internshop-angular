import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../product/dialog/dialog.component";
import {InventoryService} from "./services/inventory.service";
import {DialogInventoryComponent} from "./dialog-inventory/dialog-inventory.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  displayedColumns: string[] = ['inventoryId', 'skuCode', 'stock', 'update', 'delete'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.getAllInventories();
  }

  openDialog() {
    this.dialog.open(DialogInventoryComponent, {
      width: '30%'
    }).afterClosed().subscribe(value => {
      if (value ==='save') {
        this.getAllInventories();
      }
    })
  }
  getAllInventories() {
    this.inventoryService.getAllInventories()
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

  editInventory(row: any) {
    this.dialog.open(DialogInventoryComponent, {
      width: '30%',
      data:row
    }).afterClosed().subscribe(value => {
      if (value === 'update') {
        this.getAllInventories();
      }
    })
  }

  deleteInventory(inventoryId: number) {
    this.inventoryService.deleteInventory(inventoryId)
      .subscribe({
        next:(res) => {
          this._snackBar.open('Inventar mit der Nummer' + inventoryId + ' erfolgreich gelöscht', 'Danke!');
          this.getAllInventories();
        },
        error:(err) => {
          console.log(err);
        }
      })
  }

}
