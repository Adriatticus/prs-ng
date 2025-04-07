import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-create',
  standalone: false,
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent implements OnInit, OnDestroy {
  title: string = 'User-Create';
  newUser: User = new User();
  subscription!: Subscription;
  jobs: string[] = [
    'Paladin',
    'Mageblade',
    'Death Knight',
    'Cleric',
    'Hunter',
    'Smuggler',
    'Warrior',
  ];

  constructor(private userSvc: UserService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addUser(): void {
    this.subscription = this.userSvc.add(this.newUser).subscribe((resp) => {
      this.router.navigateByUrl('/user-list');
    });
  }
}
