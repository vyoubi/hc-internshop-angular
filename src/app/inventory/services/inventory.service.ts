import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  postInventory(data: any) {
    return this.http.post<any>(environment.server + "/inventories", data);
  }
  getAllInventories() {
    return this.http.get<any>(environment.server + "/inventories");
  }
  editInventory(data: any, inventoryId: number) {
    return this.http.put<any>(environment.server + "/inventories/update/" + inventoryId, data);
  }
  deleteInventory(inventoryId: number) {
    return this.http.delete<any>(environment.server + "/inventories/remove/" + inventoryId);
  }
}
