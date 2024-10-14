import { Component, OnInit } from '@angular/core';
import { GraphQLService } from './services/graphql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title: String = 'Angular-graphql-app';
  btnTitle: String = 'Add New';
  users: any[] = [];
  updatedUser = { _id: '', name: '', email: '' };
  // copyUpdatedUser = { _id: String, name: String, email: String };

  constructor(private graphQLService: GraphQLService) {}

  ngOnInit(): void {
    this.getUsers();
  }
  changeText(): void {
    this.btnTitle = "Add New";
    this.updatedUser = { _id:'', name: '', email: '' };
  }
  getUsers(): void {
      this.graphQLService.getUsers().subscribe((result: any) => {
        this.users = result.data.users;
    })
  }

  getUser(_id: String): void {
    this.graphQLService.getUser(_id).subscribe((result: any) => {
      this.updatedUser = { ...result.data.user };
      this.btnTitle = "Update"
    })
  }

  addUser(): void{
    this.graphQLService.addUser(this.updatedUser.name, this.updatedUser.email).subscribe((result) => {
      const updatedUsers = [...this.users, result.data.addUser]; // For arrays
      this.users = updatedUsers;
      this.updatedUser = { _id: '', name: '', email: '' };
    })
  }

  deleteUser(_id: String): void {
    this.graphQLService.deleteUser(_id).subscribe((result) => {
      const updatedUsers = [...this.users.filter((user) => user._id !== result.data.deleteUser._id)];
      this.users = updatedUsers;
    })
  }

  updateUser() {
    const copyUpdatedUser = { ...this.updatedUser }; // Create a shallow copy
    this.graphQLService.updateUser(copyUpdatedUser._id, copyUpdatedUser.name, copyUpdatedUser.email).subscribe((result: any) => {
      const updatedUsers = [...this.users.filter((user) => user._id !== result.data.updateUser._id), result.data.updateUser]; // For arrays
      this.users = updatedUsers;
      this.updatedUser = { _id:'', name: '', email: '' };
    })    
  }

}
