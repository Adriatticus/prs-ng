import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lineitem } from '../../../model/lineitem';
import { LineitemService } from '../../../service/lineitem.service';
import { RequestService } from '../../../service/request.service';
import { Request } from '../../../model/request';

@Component({
  selector: 'app-request-approve',
  standalone: false,
  templateUrl: './request-approve.component.html',
  styleUrl: './request-approve.component.css'
})
export class RequestApproveComponent implements OnInit, OnDestroy{
  title: string = "Request Approve / Reject"
  requestTitle: string = "Request"
  linesTitle: string = "Purchase Request Lines"
  inputText: string = "";
  subscription!: Subscription;
  request!: Request;
  requestId!: number;
  lineItems!: Lineitem[];
  lineItemId!: number;
  
  constructor(
    private requestSvc: RequestService,  private lineitemSvc: LineitemService, private router: Router, private actRoute: ActivatedRoute
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
          console.log('Error retrieving request-lines: ', err);
        },
      });
    });
    // get the requestId from the URL
    this.actRoute.params.subscribe((parms) => {
      this.requestId = parms['id'];
      // get the request for the id
      this.subscription = this.lineitemSvc.getLinesForRequest(this.requestId).subscribe({
        next: (resp) => {
          this.lineItems = resp;
          console.log(this.lineItems)
        },
        error: (err) => {
          console.log('Error retrieving request-lines: ', err);
        },
      });
    });
  }

  approve(){
    this.requestSvc.approved(this.request).subscribe({
      next: (rest) => {
        this.router.navigateByUrl("/request-list");
      },
      error: (err) => {
        console.log("Error submitting request as approved", err);
      },
    });
  }

  deny(){
    this.requestSvc.denied(this.request).subscribe({
      next: (rest) => {
        this.router.navigateByUrl("/request-list");
      },
      error: (err) => {
        console.log("Error submitting request as denied", err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
