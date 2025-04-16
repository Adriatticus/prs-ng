import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit, OnDestroy{
  title: string = 'Request-List';
  welcomeMsg: string = "";
  requests!: Request[];
  subscription!: Subscription;
  loggedInUser!: User;

  constructor(
    private requestSvc: RequestService,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.subscription = this.requestSvc.list().subscribe((resp) => {
      this.requests = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  delete(id: number) {
    this.subscription = this.requestSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.requestSvc.list().subscribe((resp) => {
          this.requests = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting request for id: '+id);
        alert('Error deleting request for id: '+id);
      }
    });
  }
}