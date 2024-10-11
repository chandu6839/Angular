import { Component, OnInit } from '@angular/core';
import { GraphQLService } from './services/graphql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title: String = 'angular-graphql-app';
  users: any[] = [];
  newUser = { name: '', email: ''}

  constructor(private graphQLService: GraphQLService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
      this.graphQLService.getUsers().subscribe((result: any) => {
        this.users = result.data.users;
    })
  }
  addUser(): void{
    this.graphQLService.addUser(this.newUser.name, this.newUser.email).subscribe((result: any) => {
      this.users.push(result.data.addUser);
      this.newUser = { name: '', email: '' };
    })
  }

}
