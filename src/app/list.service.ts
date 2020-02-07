import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  listUrl = 'https://5e3a62248d7e1300149cda67.mockapi.io/api/v1/data';

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get(this.listUrl);
  }

  getUser(id: number) {
    return this.http.get(this.listUrl + '/' + id);
  }

  deleteUser(id: number) {
    return this.http.delete(this.listUrl + '/' + id);
  }

  editUser(id: number, data: any) {
    return this.http.put(this.listUrl + '/' + id, data);
  }
}
