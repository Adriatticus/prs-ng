import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item';
import { SystemService } from '../../service/system.service';
import { User } from '../../model/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  title: string = "prs";
  welcomeMsg: string = "";
  subscription!: Subscription;
  loggedInUser!: User;
  menuItems: MenuItem[] = [];

  constructor(
    private sysSvc: SystemService,
    private userSvc: UserService
  ) {}

  ngOnInit(): void {

    // this.subscription = this.userSvc.getById(1).subscribe((resp) => {
    //   this.sysSvc.loggedInUser = resp;
    //   console.log("logged in user is: ", this.sysSvc.loggedInUser)
    //   this.welcomeMsg = `Greetings! ${this.sysSvc.loggedInUser.characterName}, "${this.sysSvc.loggedInUser.title}", and ${this.sysSvc.loggedInUser.job} of the Order!`;  
    // });
      
    this.loggedInUser = this.sysSvc.loggedInUser;
      this.welcomeMsg = `Greetings! ${this.sysSvc.loggedInUser.characterName}, "${this.sysSvc.loggedInUser.title}", and ${this.sysSvc.loggedInUser.job} of the Order!`;  

      
      this.menuItems = [
        new MenuItem("Product", "/product-list", "Product List"),
        new MenuItem("Request", "/request-list", "Request List"),
        new MenuItem("User", "/user-list", "User List"),
        new MenuItem("Vendor", "/vendor-list", "Vendor List"),
        new MenuItem("Review", "/request-review/1", "Request Review List", true)
      ]
  }

}
