import { User } from './user.model';
import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User;
  id: number;
  userForm: FormGroup;

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.listService.getUser(this.id).subscribe((user: User) => {
      this.user = user;
      this.userForm.setValue({
        name: user.name,
        country: user.country,
        avatar: user.avatar
      });
    });

    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z ]*')
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z ]*')
      ]),
      avatar: new FormControl('', [
        Validators.required,
      ])
    });
  }

  onSubmit() {
    console.log({ ...this.userForm.value, id: this.id });

    this.listService.editUser(this.id, { ...this.userForm.value }).subscribe(userr => {
      alert('Changed');
      this.router.navigate(['']);
      console.log(userr);
    });

  }
}
