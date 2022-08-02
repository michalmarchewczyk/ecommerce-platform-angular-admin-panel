import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectUsersList } from '../../store/selectors/accounts.selectors';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {
  MatRowHarness,
  MatTableHarness,
} from '@angular/material/table/testing';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RoleNamePipe } from '../../../shared/pipes/role-name.pipe';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSortModule,
        MatCardModule,
        NoopAnimationsModule,
      ],
      declarations: [UsersListComponent, RoleNamePipe],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectUsersList,
              value: [
                {
                  id: '1',
                  email: 'test@test.local',
                  registered: '',
                  role: 'customer',
                },
              ],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table', async () => {
    const table = await loader.getHarness(MatTableHarness);
    expect(table).toBeTruthy();
    const [row] = await table.getHeaderRows();
    expect(await row.getCellTextByIndex()).toEqual([
      'ID',
      'Email',
      'First name',
      'Last name',
      'Role',
      '',
    ]);
  });

  it('should render user row', async () => {
    const [row, expandRow] = await loader.getAllHarnesses(MatRowHarness);
    expect(row).toBeTruthy();
    expect(await row.getCellTextByIndex()).toEqual([
      '1',
      'test@test.local',
      '',
      '',
      'Customer',
      'keyboard_arrow_down',
    ]);
    expect(expandRow).toBeTruthy();
  });
});
