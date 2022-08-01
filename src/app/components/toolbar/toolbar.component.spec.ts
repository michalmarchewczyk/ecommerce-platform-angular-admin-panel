import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';
import { cold } from 'jasmine-marbles';
import { selectUserEmail } from '../../core/auth/store';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let loader: HarnessLoader;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatToolbarModule, MatIconModule],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectUserEmail,
              value: 'test@test.local',
            },
          ],
        }),
      ],
      declarations: [ToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    store = TestBed.inject(MockStore);
    store.setState({
      auth: {
        user: {
          user: { id: 123, email: 'test@test.local', role: 'admin' },
          checked: true,
        },
      },
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have menu and logout buttons', async () => {
    const logoutButton = await loader.getHarness(
      MatButtonHarness.with({ text: 'logout' }),
    );
    const menuButton = await loader.getHarness(
      MatButtonHarness.with({ text: 'menu' }),
    );
    expect(logoutButton).toBeTruthy();
    expect(menuButton).toBeTruthy();
  });

  it('should emit toggle event', async () => {
    const spy = spyOn(component.sidenavToggle, 'emit');
    await component.toggleSidenav();
    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch logout action on logout button click', async () => {
    const logoutButton = await loader.getHarness(
      MatButtonHarness.with({ text: 'logout' }),
    );
    await logoutButton.click();
    const expected = cold('a', { a: { type: '[Auth] Logout' } });
    expect(store.scannedActions$).toBeObservable(expected);
  });
});
