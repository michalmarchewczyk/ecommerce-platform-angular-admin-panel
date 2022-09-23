import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import { MatSidenavHarness } from '@angular/material/sidenav/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../core/auth/store/reducers/user.reducer';
import { selectUserRole } from '../../core/auth/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        NoopAnimationsModule,
        MatListModule,
        RouterTestingModule,
      ],
      providers: [
        provideMockStore({
          initialState: { auth: { user: initialState } },
          selectors: [
            {
              selector: selectUserRole,
              value: 'admin',
            },
          ],
        }),
      ],
      declarations: [SidenavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle', async () => {
    const sidenav = await loader.getHarness(MatSidenavHarness);
    await component.toggle();
    expect(await sidenav.isOpen()).toBe(true);
    await component.toggle();
    expect(await sidenav.isOpen()).toBe(false);
  });
});
