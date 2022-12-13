import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PagesActions } from '../../store';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(PagesActions.loadPages());
  }
}
