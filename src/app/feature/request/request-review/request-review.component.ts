import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { RequestService } from '../../../service/request.service';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-review',
  standalone: false,
  templateUrl: './request-review.component.html',
  styleUrl: './request-review.component.css'
})
export class RequestReviewComponent implements OnInit, OnDestroy{
  title: string = "Request Review"
  requestTitle: string = "Request"
  users: User[] = [];
  userId!: number;
  requests!: Request[];
  subscription!: Subscription;

  constructor(
    private actRoute: ActivatedRoute, 
    private userSvc: UserService, 
    private requestSvc: RequestService,
    private systemSvc: SystemService
  ){}
  

  ngOnInit(): void {
    this.actRoute.params.subscribe((parms) => {
      this.userId = parms['id'];
      // get the request for the id
      this.subscription = this.requestSvc.getReviewList(this.systemSvc.loggedInUser.id).subscribe({
        next: (resp) => {
          this.requests = resp;
          console.log(this.requests)
        },
        error: (err) => {
          console.log('Error retrieving request-lines: ', err);
        },
      });
    });

    

  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
