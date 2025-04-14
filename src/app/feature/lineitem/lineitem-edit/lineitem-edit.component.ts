import { Component, OnDestroy, OnInit } from '@angular/core';
import { Lineitem } from '../../../model/lineitem';
import { Subscription } from 'rxjs';
import { LineitemService } from '../../../service/lineitem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-lineitem-edit',
  standalone: false,
  templateUrl: './lineitem-edit.component.html',
  styleUrl: './lineitem-edit.component.css',
})
export class LineitemEditComponent implements OnInit, OnDestroy {
  title: string = 'LineItem Edit';
  lineitem!: Lineitem;
  lineitemId!: number;
  request!: Request;
  requestId!: number;
  products: Product[] = [];
  subscription!: Subscription;
  storeLiId!: number;

  constructor(
    private lineitemSvc: LineitemService,
    private productSvc: ProductService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((parms) => {
      this.lineitemId = parms['id'];
      this.subscription = this.lineitemSvc.getById(this.lineitemId).subscribe({
        next: (resp) => {
          this.lineitem = resp;
          console.log(this.lineitem);
        },
      });
    });

    this.subscription = this.productSvc.list().subscribe({
      next: (resp) => {
        this.products = resp;
      },
      error: (err) => {
        console.error('Product Edit Error: error loading products');
      },
    });
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id == b.id;
  }

  save() {
    this.lineitemSvc.update(this.lineitem).subscribe({
      next: (resp) => {
        this.router.navigateByUrl(`/request-lines/${this.lineitem.request.id}`);
      },
      error: (err) => {
        console.log('error saving line item', err);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
