import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InventoryService} from "../services/inventory.service";
import {ProductElementModel} from "../../product/models/product-element.model";
import {ProductServiceService} from "../../product/services/product-service.service";

@Component({
  selector: 'app-dialog-inventory',
  templateUrl: './dialog-inventory.component.html',
  styleUrls: ['./dialog-inventory.component.scss']
})
export class DialogInventoryComponent implements OnInit {
  inventoryForm !: FormGroup;
  actionBtn: string = "Bestätigen";
  selectedValue!: string;
  products: ProductElementModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData : any,
    public dialogRef: MatDialogRef<DialogInventoryComponent>,
    private formBuilder : FormBuilder,
    private inventoryService: InventoryService,
    private productService: ProductServiceService,
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    })
    this.inventoryForm = this.formBuilder.group({
      skuCode: ['', Validators.required],
      stock: ['', Validators.required],
    });
    if (this.editData) {
      this.actionBtn = "Bestätigen";
      this.inventoryForm.controls['skuCode'].setValue(this.editData.skuCode);
      this.inventoryForm.controls['stock'].setValue(this.editData.stock);
    }
  }

  addInventory() {
    if (!this.editData) {
      console.log(this.inventoryForm.value);
      this.inventoryService.postInventory(this.inventoryForm.value)
        .subscribe({
          next:(res) => {
            alert("Inventory added successfully");
            this.inventoryForm.reset();
            this.dialogRef.close('save');
          },
          error:(err) => {
            console.log(err);
            //alert('Product not exist');
            this.inventoryForm.reset();
            this.dialogRef.close('save');
          }
        })
    } else {
      this.updateInventory();
    }
  }

  updateInventory() {
    this.inventoryService.editInventory(this.inventoryForm.value, this.editData.inventoryId)
      .subscribe({
        next:(res) => {
          alert("Inventory updated successfully");
          this.inventoryForm.reset();
          this.dialogRef.close('update');
        },
        error:(err) => {
          console.log(err);
          alert('Something wrong please try again');
        }
      })
  }
}
