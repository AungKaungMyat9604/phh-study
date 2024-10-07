import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TableFirstLastComponent } from '../table-first-last/table-first-last.component';

@Component({
  selector: 'app-table-pages',
  templateUrl: './table-pages.component.html',
  styleUrl: './table-pages.component.scss',
  standalone: true,
  imports: [
    //Modules
    MatButtonModule,
  ],
})
export class TablePagesComponent {
  //Child

  //Input
  @Input() activePage: number = 10;
  @Input() pageList: number[] = new Array(10);

  //Output
  @Output() onPageChanged = new EventEmitter();

  constructor() {}
  //Methods or Operations
  selectPage(pageIndex: number) {
    this.onPageChanged.emit(pageIndex + 1);
  }
}
