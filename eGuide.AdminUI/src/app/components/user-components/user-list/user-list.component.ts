import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscribable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserSharedService } from 'src/app/services/user-shared.service';
import { UserService } from 'src/app/services/user.service';
import { selectRefresh } from 'src/app/state/refresh-list/refresh-list.selector';
 
 
 
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
 
  editMode = false;
  searchTerm: any;
  showSearch: any;
  lastInitial = '';
  user: User = new User();
  users: User[] = [];
 
  // @Output() profileSelected = new EventEmitter<User>();
 
  constructor(
    private router: Router,
    private userService:UserService,
    private toastr: ToastrService,
    private store: Store,
    private userSharedService: UserSharedService
  ) {
    this.store.select(selectRefresh).subscribe((refresh: boolean) => {
      console.log(refresh);
      if (refresh === true) {
        console.log('refresh');
        this.getUserInfo();
      }
    });
   
  }
 
  ngOnInit(): void {
    this.getUserInfo();
  }
 
  getUserInfo() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        console.log("kullanıcılar",this.users);
      },
      (error) => {
        console.error('Error getting vehicles:', error);
      }
    );
  }
 
getInitial(name: string): string {
  return name.charAt(0);
}
 
  toggleSelection(item: User): void {
    // Diğer tüm araçların seçimini kaldır
    this.users.forEach((v) => (v.isSelected = false));
 
    // Şu anki aracın seçim durumunu tersine çevir
    item.isSelected = !item.isSelected;
  }
 
  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }
 
  viewProfile(userId: any) {
    console.log("VIEW KULLANICI", userId);
    this.router.navigate(['/user-profile', userId]);
  }
}
 
