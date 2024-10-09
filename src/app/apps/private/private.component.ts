import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss',
})
export class PrivateComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.checkUserInServer().then((u) => {
      if (u) {
        //Do Nothing
      } else {
        this.router.navigate(['signin'], { replaceUrl: true });
      }
    });
  }
}
