import { MatIconModule } from '@angular/material/icon';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


import { ListService } from '../list.service';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { User } from './user-edit/user.model';
import { FormAddComponent } from '../form-add/form-add.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  listUsers: any[] = [];
  selectedUser: User;
  addUser: User;

  constructor(
    private listService: ListService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getList();
  }

  ngAfterViewInit() {
    this.getList();
  }

  openDialog(id: number): void {
    this.onSelectedUser(id);

    const dialogRef = this.dialog.open(ListDetailComponent, {
      width: '300px',
      data: {
        user: this.selectedUser
      },
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }

  openDialogAddUser(): void {

    const dialogRef = this.dialog.open(FormAddComponent, {
      width: '500px',
      // data: {
      //   id: this.listUsers.length + 1,
      //   name: this.addUser.name,
      //   country: this.addUser.country,
      //   avatar: this.addUser.avatar
      // },
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }

  onSelectedUser(id: number) {
    this.selectedUser = this.listUsers.filter(user => user.id === id)[0];
  }

  onDelete(id: number) {
    console.log(id);

    this.listService.deleteUser(id).subscribe((users: any[]) => {
      // this.listUsers = users;
      this.getList();
      alert('Deleted!!!!')
    });
  }

  getList() {
    this.listService.getList().subscribe((users: any[]) => {
      this.listUsers = users;
    });
  }
}
