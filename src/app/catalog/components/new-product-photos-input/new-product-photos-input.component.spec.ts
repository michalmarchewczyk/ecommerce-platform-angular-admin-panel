import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductPhotosInputComponent } from './new-product-photos-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FileInput, MaterialFileInputModule } from 'ngx-material-file-input';
import { SafeUrlPipe } from '../../../shared/pipes/safe-url.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('NewProductPhotosInputComponent', () => {
  let component: NewProductPhotosInputComponent;
  let fixture: ComponentFixture<NewProductPhotosInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MaterialFileInputModule,
        NoopAnimationsModule,
      ],
      declarations: [NewProductPhotosInputComponent, SafeUrlPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(NewProductPhotosInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display input photos', async () => {
    const file = new File(['file'], 'test.jpg', {
      type: 'image/jpeg',
    });
    component.photosToSave.setValue(new FileInput([file]));
    component.updatePhotosToDisplay();
    fixture.detectChanges();
    const images = fixture.debugElement.queryAll(By.css('img'));
    expect(images.length).toBe(1);
    expect(images[0].attributes['src']).toMatch('blob:');
  });

  it('should remove photo from input', async () => {
    const file = new File(['file'], 'test.jpg', {
      type: 'image/jpeg',
    });
    component.photosToSave.setValue(new FileInput([file]));
    component.updatePhotosToDisplay();
    fixture.detectChanges();
    const images = fixture.debugElement.queryAll(By.css('img'));
    expect(images.length).toBe(1);
    component.removePhoto('test.jpg');
    fixture.detectChanges();
    const images2 = fixture.debugElement.queryAll(By.css('img'));
    expect(images2.length).toBe(0);
  });
});
