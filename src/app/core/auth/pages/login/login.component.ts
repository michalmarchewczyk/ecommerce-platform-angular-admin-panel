import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { LoginActions } from '../../store';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store: Store) {}

  async ngOnInit() {
    if (!environment.demo) {
      return;
    }
    const params = await firstValueFrom(this.route.queryParams);
    if (params['login'] && params['password']) {
      this.store.dispatch(
        LoginActions.login({
          data: { email: params['login'], password: params['password'] },
        }),
      );
    }
  }
}
