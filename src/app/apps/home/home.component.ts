import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TablePagesComponent } from '../../components/table-pages/table-pages.component';
import { UserType } from './home.type';
import { HomeService } from './home.service';
import { TableFirstLastComponent } from '../../components/table-first-last/table-first-last.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    //Modules
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    //Components
    TablePagesComponent,
    TableFirstLastComponent,
  ],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterFormControl = new FormControl();

  activePage: number = 1;
  parentPageList: number[] = new Array(10);
  UserList: UserType[] = [];
  firstPage: boolean = true;
  lastPage: boolean = false;

  displayedColumns: string[] = [
    'no',
    'name',
    'age',
    'gender',
    'race',
    'religion',
    'occupation',
    'menu',
  ];

  userList: UserType[] = [];
  dataSource = new MatTableDataSource<UserType>();
  filteredUserList: UserType[] = [];

  constructor(private homeService: HomeService) {
    this.homeService.getUserFromServer().then((users) => {
      // this.dataSource.data = users;
      this.userList = users;
      this.filterUserList('');
    });

    this.filterFormControl.valueChanges.pipe(debounceTime(800)).subscribe({
      next: (value) => this.filterUserList(value),
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.tablePaginator;
  }

  //Methods
  pageChanged(pageNo: number) {
    if (pageNo != 1 && 10) {
      this.activePage = pageNo;
      this.firstPage = false;
      this.lastPage = false;
    }

    if (pageNo == 1) {
      this.firstPageSelected(true);
    }

    if (pageNo == 10) {
      this.lastPageSelected(true);
    }
  }

  firstPageSelected(status: boolean) {
    this.firstPage = status;
    if (status) {
      this.lastPage = false;
      this.activePage = 1;
    }
  }

  lastPageSelected(status: boolean) {
    this.lastPage = status;
    if (status) {
      this.firstPage = false;
      this.activePage = 10;
    }
  }

  filterUserList(name: string) {
    this.filteredUserList = [];

    this.filteredUserList = this.userList.filter((u) =>
      u.name.toLowerCase().includes(name.toLowerCase()),
    );

    this.dataSource.data = this.filteredUserList;
  }
}
