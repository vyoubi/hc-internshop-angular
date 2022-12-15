import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }

  postProduct(data: any) {
    return this.http.post<any>(environment.server + "/products/product", data);
  }
  getAllProducts() {
    return this.http.get<any>(environment.server + "/products");
  }
  editProduct(data: any, productId: number) {
    return this.http.put<any>(environment.server + "/products/update/" + productId, data);
  }
  deleteProduct(productId: number) {
    return this.http.delete<any>(environment.server + "/products/remove/" + productId);
  }

  postOrder(data: any) {
    return this.http.post<any>(environment.server + "/orders", data);
  }

  public uploadFile(formData: FormData, productName: string): Observable<HttpEvent<any>> {
    return this.http.post<any>(environment.server + '/products/images/files/upload/' + productName, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
