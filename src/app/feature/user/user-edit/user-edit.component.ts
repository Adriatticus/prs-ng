import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent implements OnInit, OnDestroy {
  title: string = 'User-Edit';
  userId!: number;
  user!: User;
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

  constructor(
    private userSvc: UserService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get the userId from the URL
    this.actRoute.params.subscribe((parms) => {
      this.userId = parms['id'];
      // get the user for the id
      this.subscription = this.userSvc.getById(this.userId).subscribe({
        next: (resp) => {
          this.user = resp;
        },
        error: (err) => {
          console.log('Error retrieving user: ', err);
        },
      });
    });
  }

  save() {
    this.userSvc.update(this.user).subscribe({
      next: (resp) => {
        this.user = resp;
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        console.log('error saving user', err);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
