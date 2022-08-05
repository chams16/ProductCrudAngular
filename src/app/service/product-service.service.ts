import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http:HttpClient) { }

  addProduct(data:any){
    return this.http.post<any>("http://localhost:8089/product/save",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getProduct(){
    return this.http.get<any>("http://localhost:8089/product/all")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:8089/product/delete/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateProduct(id:number,data:any){
    return this.http.put<any>("http://localhost:8089/product/update/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
