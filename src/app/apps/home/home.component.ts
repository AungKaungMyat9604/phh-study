import { Component } from '@angular/core';
import { TablePagesComponent } from '../../components/table-pages/table-pages.component';
import { UserType } from './home.type';
import { HomeService } from './home.service';
import { TableFirstLastComponent } from '../../components/table-first-last/table-first-last.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    //Components
    TablePagesComponent,
    TableFirstLastComponent,
  ],
})
export class HomeComponent {
  activePage: number = 1;
  parentPageList: number[] = new Array(10);
  UserList: UserType[] = [];
  firstPage: boolean = true;
  lastPage: boolean = false;

  constructor(private homeService: HomeService) {
    this.homeService.getUserFromServer().then((users) => {
      this.UserList = users;
    });
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
}
