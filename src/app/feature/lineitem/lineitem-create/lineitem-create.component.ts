import { Component, OnDestroy, OnInit } from '@angular/core';
import { Lineitem } from '../../../model/lineitem';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { LineitemService } from '../../../service/lineitem.service';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-lineitem-create',
  standalone: false,
  templateUrl: './lineitem-create.component.html',
  styleUrl: './lineitem-create.component.css'
})
export class LineitemCreateComponent implements OnInit, OnDestroy{
  title: string = "Product Request"
  requestTitle: string = "Request"
  newLineitem: Lineitem = new Lineitem();
  products: Product[] = [];
  requestId!: number;
  productId!: number;
  request!: Request;
  subscription!: Subscription;

  constructor(
    private actRoute: ActivatedRoute, private lineitemSvc: LineitemService, private productSvc: ProductService, private requestSvc: RequestService, private router: Router
  ) {}

  ngOnInit(): void {
    
    // get the requestId from the URL
    this.actRoute.params.subscribe((parms) => {
      this.requestId = parms['id'];
      // get the request for the id
      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: (resp) => {
          this.request = resp;
          console.log(this.request)
        },
        error: (err) => {
          console.log('Error retrieving request: ', err);
        },
      });
    });  
    
    this.subscription = this.productSvc.list().subscribe({
      next: (resp) => {
        this.products = resp;
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
    
    compProduct(a: Product, b: Product): boolean {
      return a && b && a.id == b.id;
    }
    
    addLineitemToRequest(): void {

      const lineItemToSend: Lineitem = {
        id: 0,
        request: { id: this.request.id } as Request,
        product: { id: this.newLineitem.product.id } as Product,
        quantity: this.newLineitem.quantity
      }

      console.log("Sending clean Lineitem object:", lineItemToSend);

      this.subscription = this.lineitemSvc.add(lineItemToSend).subscribe({
        next: (resp) => {
          console.log("LineItem added:", resp)
          this.router.navigateByUrl(`/request-lines/${this.requestId}`);
        },
        error: (err) => {
          console.error("Failed to add line item:", err);
        }
      });
    }
}
