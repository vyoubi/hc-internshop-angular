import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  postOrder(data: any) {
    return this.http.post<any>(environment.server + "/orders", data);
  }
  getAllOrders() {
    return this.http.get<any>(environment.server + "/orders");
  }
  payOrder(orderNumber: any) {
    return this.http.get<any>(environment.server + "/orders/" + orderNumber);
  }
  deleteOrder(orderId: number) {
    return this.http.delete<any>(environment.server + "/orders/remove/" + orderId);
  }
}
