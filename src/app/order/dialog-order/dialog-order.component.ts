import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.scss']
})
export class DialogOrderComponent implements OnInit {
  orderForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData : any,
    public dialogRef: MatDialogRef<DialogOrderComponent>,
    private formBuilder : FormBuilder,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      orderNumber: ['', Validators.required],
      skuCode: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
    if (this.editData) {
      this.actionBtn = "Update";
      this.orderForm.controls['orderNumber'].setValue(this.editData.orderNumber);
      this.orderForm.controls['skuCode'].setValue(this.editData.skuCode);
      this.orderForm.controls['price'].setValue(this.editData.price);
      this.orderForm.controls['quantity'].setValue(this.editData.quantity);
    }
  }

  addOrder() {
    if (!this.editData) {
      this.orderService.postOrder(this.orderForm.value)
        .subscribe({
          next:(res) => {
            alert("Order added successfully");
            this.orderForm.reset();
            this.dialogRef.close('save');
          },
          error:(err) => {
            console.log(err);
            alert('Inventory don\'t exist');
          }
        })
    } else {
     // this.updateOrder();
    }
  }

  // updateOrder() {
  //   this.orderService.editOrder(this.orderForm.value, this.editData.orderId)
  //     .subscribe({
  //       next:(res) => {
  //         alert("Product updated successfully");
  //         this.orderForm.reset();
  //         this.dialogRef.close('update');
  //       },
  //       error:(err) => {
  //         console.log(err);
  //         alert('Something wrong');
  //       }
  //     })
  // }
}
