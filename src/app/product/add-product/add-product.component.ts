import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductServiceService} from "../services/product-service.service";
import {environment} from "../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @ViewChild("fileUpload", {static: false}) public fileUpload!: ElementRef;
  productForm !: FormGroup;
  public fileForm!: FormGroup;
  public productFile: any = File;
  public fileSource: string = "";
  actionBtn: string = "Speichern";

  constructor(
    private router: Router,
    private formBuilder : FormBuilder,
    private _snackBar: MatSnackBar,
    private productService: ProductServiceService,
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
      // this.actionBtn = "Speichern";
      // this.productForm.controls['name'].setValue("");
      // this.productForm.controls['description'].setValue("");
      // this.productForm.controls['price'].setValue("");
  }

  public selectFile(event: any): void {
    this.productFile = event.target.files[0];
  }

  addProduct() {
    const formData: FormData = new FormData();
    formData.append('file', this.productFile);
    this.productService.uploadFile(formData, this.productForm.value.name)
      .subscribe((data: any) => {
        this.fileSource = environment.server + '/products/images/file/download/' + data.imageId;

        this.productService.postProduct({
          name: this.productForm.value.name,
          description: this.productForm.value.description,
          price: this.productForm.value.price
        })
          .subscribe({
            next:(res) => {
              this.productForm.reset();
              this._snackBar.open('Produkt erfolgreich hinzugefügt', 'Danke!');
              this.router.navigate(['/shop']);
            },
            error:(err) => {
              console.log(err);
              this._snackBar.open('Produkt erfolgreich hinzugefügt', 'Danke!');
              this.router.navigate(['/products']);
            }
          })
       });
  }

}
