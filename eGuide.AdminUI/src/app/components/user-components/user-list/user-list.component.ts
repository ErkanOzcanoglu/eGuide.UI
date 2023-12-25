import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscribable } from 'rxjs';
import { fadeIn } from 'src/app/models/fade-in.animation';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { selectRefresh } from 'src/app/state/refresh-list/refresh-list.selector';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [fadeIn],
})
export class UserListComponent {
  editMode = false;
  showSearch = false;

  searchTerm!: string;
  lastInitial?: string;

  user: User = new User();
  users: User[] = [];
  selectedUser?: User | null;

  refresh$ = this.store.select(selectRefresh);

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private store: Store
  ) {
    this.refresh$.subscribe((refresh: boolean) => {
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
      },
      (error) => {
        console.error('Error getting vehicles:', error);
      }
    );
  }

  getInitial(name: string): string {
    return name.charAt(0);
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  viewProfileDetails(userId: any) {
    this.router.navigate(['/user-profile', userId]);
  }

  openProfileCard(user: any) {
    this.selectedUser = user;
    console.log(this.user.createdDate);
  }

  closeProfileCard() {
    this.selectedUser = null;
  }

  @HostListener('document:keyup.escape', ['$event']) onKeyUp(
    event: KeyboardEvent
  ): void {
    if (event.key === 'Escape') {
      this.closeProfileCard();
    }
  }

  closeProfileCardOnKey(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === 'Space') {
      this.closeProfileCard();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === 'Space') {
      this.viewProfileDetails(this.user.id);
    }
  }
}
