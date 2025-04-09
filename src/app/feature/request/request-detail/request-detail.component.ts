import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request.service';
import { UserService } from '../../../service/user.service';
import { Request } from '../../../model/request';

@Component({
  selector: 'app-request-detail',
  standalone: false,
  templateUrl: './request-detail.component.html',
  styleUrl: './request-detail.component.css'
})
export class RequestDetailComponent implements OnInit, OnDestroy{
  title: string = 'Request-Edit';
  request!: Request;
  requestId!: number;
  subscription!: Subscription;
  deliveries: string[] = ["Delivery", "Pick-up"];
  statuses: string[] = ["NEW", "SUBMITTED", "APPROVED", "REJECTED"]

  constructor(
    private requestSvc: RequestService,
    private userSvc: UserService,
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
          console.log(this.request)
        },
        error: (err) => {
          console.log('Error retrieving request: ', err);
        },
      });
    }); 
    // this.subscription = this.userSvc.getById(1).subscribe((resp) => {
    //   this.request.user = resp;
    // });
  }

  delete() {
    this.requestSvc.delete(this.requestId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
