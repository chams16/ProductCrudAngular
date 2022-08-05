import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { productModel } from './ProductModel';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css']
})
export class ProductDashboardComponent implements OnInit {

  formValue !:FormGroup
  productModel:productModel=new productModel()
  productList!:any;

  constructor(private formbuilder:FormBuilder, private service:ProductServiceService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      name:[''],
      price:['']
    })
    this.getAllProduct()
  }

  addProduct(){
    this.productModel.name=this.formValue.value.name;
    this.productModel.price=this.formValue.value.price;

    this.service.addProduct(this.productModel)
    .subscribe(res=>{
      console.log(res);
      let ref = document.getElementById("close")
      ref?.click()
      alert("Product added successfully")
      this.formValue.reset()
      this.getAllProduct()
    },err=>{
      alert("there's an error")
      console.log(err);
    })
  }

  getAllProduct(){
    this.service.getProduct().subscribe(res=>{
      this.productList=res
    })
  }

  deleteProduct(product:any){
    this.service.deleteProduct(product.id).subscribe(res =>{
      alert("Employee deleted")
      this.getAllProduct()
    })
  }

  editProduct(product:any ){
      this.productModel.id=product.id
      this.formValue.controls['name'].setValue(product.name)
      this.formValue.controls['price'].setValue(product.price)
  }

  updateProduct(){
    this.productModel.name=this.formValue.value.name;
    this.productModel.price=this.formValue.value.price;

    this.service.updateProduct(this.productModel.id,this.productModel).subscribe(res=>{
        alert("updated succesfully")
        let ref = document.getElementById("close2")
        ref?.click()
        this.formValue.reset()
        this.getAllProduct()
    })
  }


}
