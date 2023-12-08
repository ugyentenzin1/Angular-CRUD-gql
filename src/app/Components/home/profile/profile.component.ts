import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser, UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileId: string = '';
  userProfile!: IUser;

  constructor(private _route:ActivatedRoute, private _user:UserService) {}

  ngOnInit(): void {
      const idParam = this._route.snapshot.paramMap.get('id');
      idParam && (this.profileId = idParam);

      this._user.getUserById(this.profileId).subscribe(data => {
        this.userProfile = data;
        console.log(data)
      });
  }
}
