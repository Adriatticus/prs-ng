import { Component, OnDestroy, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { Subscription } from 'rxjs';
import { Lineitem } from '../../../model/lineitem';
import { RequestService } from '../../../service/request.service';
import { LineitemService } from '../../../service/lineitem.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-lines',
  standalone: false,
  templateUrl: './request-lines.component.html',
  styleUrl: './request-lines.component.css',
})
export class RequestLinesComponent implements OnInit, OnDestroy {
  requestTitle: string = 'Request';
  linesTitle: string = 'Purchase Request Line Items';
  request!: Request;
  requestId!: number;
  subscription!: Subscription;
  lineItems!: Lineitem[];
  lineItemId!: number;
  reqIdStorage!: number;

  constructor(
    private requestSvc: RequestService,
    private lineitemSvc: LineitemService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get the requestId from the URL
    this.actRoute.params.subscribe((parms) => {
      this.requestId = parms['id'];
      // get the request for the id
      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: (resp) => {
          this.request = resp;
          console.log(this.request);
        },
        error: (err) => {
          console.log('Error retrieving request-lines: ', err);
        },
      });
    });
    // get the requestId from the URL
    this.actRoute.params.subscribe((parms) => {
      this.requestId = parms['id'];
      // get the request for the id
      this.subscription = this.lineitemSvc
        .getLinesForRequest(this.requestId)
        .subscribe({
          next: (resp) => {
            this.lineItems = resp;
            console.log(this.lineItems);
          },
          error: (err) => {
            console.log('Error retrieving request-lines: ', err);
          },
        });
    });
  }

  submitForReview() {
    // this.actRoute.params.subscribe((parms) => {

    // })
    this.requestSvc.submitReview(this.request).subscribe({
      next: (rest) => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.log('Error submitting request for review', err);
      },
    });
  }

  delete(id: number) {
    this.subscription = this.lineitemSvc.delete(id).subscribe({
      next: (doThis) =>
        this.actRoute.params.subscribe((parms) => {
          this.requestId = parms['id'];
          // get the request for the id
          this.subscription = this.lineitemSvc
            .getLinesForRequest(this.request.id)
            .subscribe({
              next: (resp) => {
                this.lineItems = resp;
                console.log(this.lineItems);
                this.actRoute.params.subscribe((parms) => {
                  this.requestId = parms['id'];
                  this.subscription = this.requestSvc
                    .getById(this.requestId)
                    .subscribe((dosomeshit) => {
                      this.request = dosomeshit;
                    });
                });
              },
              error: (err) => {
                console.log('Error retrieving request-lines: ', err);
              },
            });
        }),
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
