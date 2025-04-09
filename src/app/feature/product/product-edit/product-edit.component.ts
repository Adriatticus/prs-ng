import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { Vendor } from '../../../model/vendor';
import { ProductService } from '../../../service/product.service';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit, OnDestroy{
  title: string = 'Product-Edit';
  newProduct: Product = new Product();
  subscription!: Subscription;
  product!: Product;
  productId!: number;
  vendors: Vendor[] =[];

  constructor(private productSvc: ProductService, private router: Router, private vendorSvc: VendorService, private actRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((parms) => {
      this.productId = parms['id'];
      this.subscription = this.productSvc.getById(this.productId).subscribe({
        next: (resp) => {
          this.product = resp;
        },
        error: (err) => {
          console.log('Error retirieving product: ', err);
        },
      });
    });
    this.subscription = this.vendorSvc.list().subscribe({
      next: (resp) => {
        this.vendors = resp;
      },
      error: (err) => {
        console.error(
          "Product Create Error: error loading products." + err.message
        );
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save() {
    this.productSvc.update(this.product).subscribe({
      next: (resp) => {
        this.product = resp;
        this.router.navigateByUrl('/credit-list');
      },
      error: (err) => {
        console.log('error saving credit', err);
      },
    });
  }
  
  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id == b.id;
  }
}
