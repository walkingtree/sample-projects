import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrdersService {

constructor(private http: Http) {}

    getOrders() {
        return this.http.get('assets/data/orders.json')
                    .toPromise()
                    .then(res =>  res.json())
                    .then(data => {  return data; });
    }

}
