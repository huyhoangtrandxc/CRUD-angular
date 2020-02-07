import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

// interface User {
//   id: number;
//   name: string;
//   country: string;
//   avatar: string;
// }

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: any;
  id: number;

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  userForm = new FormGroup({
    userName: new FormControl(''),
    userCountry: new FormControl(''),
    userAvatar: new FormControl('')
  });

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.listService.getUser(this.id).subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }

  onSubmit() {
    console.log(this.userForm, this.id);
    // this.listService.editUser(this.id, { ...form.value, id: this.id }).subscribe(dataRes => {
    //   console.log(dataRes);
    // });
    this.router.navigate(['']);
  }
}
