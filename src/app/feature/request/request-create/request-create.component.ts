import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { User } from '../../../model/user';
import { Router } from '@angular/router';
import { RequestService } from '../../../service/request.service';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-create',
  standalone: false,
  templateUrl: './request-create.component.html',
  styleUrl: './request-create.component.css'
})
export class RequestCreateComponent implements OnInit, OnDestroy {
  title: string = "Request-Create";
  newRequest: Request = new Request();
  users: User[] = [];
  subscription!: Subscription;
  deliveries: string[] = ["Delivery", "Pick-up"];


  constructor(
    private requestSvc: RequestService, 
    private userSvc: UserService, 
    private router: Router,
    private sysSvc: SystemService
  ) {}


  ngOnInit(): void {
    // this.subscription = this.userSvc.getById(1).subscribe((resp) => {
    //   this.newRequest.user = resp;
    // });


    this.newRequest.user = this.sysSvc.loggedInUser


    this.subscription = this.userSvc.list().subscribe({
      next: (resp) => {
        this.users = resp;
      },
      error: (err) => {
        console.error(
          "Request Create Error: error loading users." + err.message
        );
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  addRequest(): void {
    this.subscription = this.requestSvc.add(this.newRequest).subscribe((resp) => {
      this.router.navigateByUrl('/request-list');
    });
  }
}

