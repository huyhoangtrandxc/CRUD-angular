
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


import { ListService } from '../list.service';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { User } from './user-edit/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  listUsers: any[] = [];
  selectedUser: User;

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
    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.autoFocus = true;
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

  onSelectedUser(id: number) {
    this.selectedUser = this.listUsers.filter(user => user.id === id)[0];
  }

  onDelete(id: number) {
    this.listService.deleteUser(id).subscribe((users: any[]) => {
      this.listUsers = users;
    });
    this.getList();
  }

  getList() {
    this.listService.getList().subscribe((users: any[]) => {
      this.listUsers = users;
    });
  }
}
