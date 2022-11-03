import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { environment } from '../../../../../environments/environment';
import { cold } from 'jasmine-marbles';
import { LoginActions } from '../../store';
import { firstValueFrom, of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ login: 'test', password: 'test' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch auto login action', async () => {
    environment.demo = true;
    fixture.detectChanges();

    await firstValueFrom(store.scannedActions$);

    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: LoginActions.login({ data: { email: 'test', password: 'test' } }),
      }),
    );

    environment.demo = false;
  });
});
