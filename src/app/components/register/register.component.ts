import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email: string;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onRgeisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
      //required Fileds
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all Fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please Enter Valid Email Address', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Rtegister User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Your Now register and Login', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['./login']);
      } else {
        this.flashMessage.show('Something  went Wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['./register']);
      }
    });
  }

}
