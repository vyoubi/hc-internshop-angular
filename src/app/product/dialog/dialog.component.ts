import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductServiceService} from "../services/product-service.service";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  productForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData : any,
    public dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder : FormBuilder,
    private productService: ProductServiceService,
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['description'].setValue(this.editData.description);
      this.productForm.controls['price'].setValue(this.editData.price);
    }
  }

  addProduct() {
    if (!this.editData) {
      this.productService.postProduct(this.productForm.value)
        .subscribe({
          next:(res) => {
            alert("Product added successfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:(err) => {
            console.log(err);
            alert('Something wrong');
          }
        })
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.productService.editProduct(this.productForm.value, this.editData.productId)
      .subscribe({
        next:(res) => {
          alert("Product updated successfully");
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error:(err) => {
          console.log(err);
          alert('Something wrong');
        }
      })
  }
}
