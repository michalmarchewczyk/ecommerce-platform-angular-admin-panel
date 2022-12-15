import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesListComponent } from './pages-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { provideMockStore } from '@ngrx/store/testing';
import { selectPagesList } from '../../store';
import { Page } from '../../../core/api';
import { HarnessLoader } from '@angular/cdk/testing';
import {
  MatRowHarness,
  MatTableHarness,
} from '@angular/material/table/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('PagesListComponent', () => {
  let component: PagesListComponent;
  let fixture: ComponentFixture<PagesListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatCardModule],
      declarations: [PagesListComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectPagesList,
              value: [
                {
                  id: 1,
                  title: 'test title',
                  content: 'test content',
                  slug: 'test slug',
                } as Page,
              ],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesListComponent);
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
      'Updated',
      'Title',
      'Slug',
      'Content',
    ]);
  });

  it('should render page row', async () => {
    const row = await loader.getHarness(MatRowHarness);
    expect(row).toBeTruthy();
    expect(await row.getCellTextByIndex()).toEqual([
      '1',
      '',
      'test title',
      'test slug',
      'test content',
    ]);
  });
});
