import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { AppComponent } from './app.component';
import { GraphQLService } from './services/graphql.service';
import { gql } from "apollo-angular";

describe('AppComponent', () => {
  let service: GraphQLService;
  let controller: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ApolloTestingModule
      ],
      providers: [GraphQLService],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
    service = TestBed.inject(GraphQLService);
    controller = TestBed.inject(ApolloTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-graphql-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-graphql-app');
  });

  it('should render h2 text as', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    // const compiled = fixture.nativeElement as HTMLElement;
    // expect(compiled.querySelector('h2')?.textContent).toContain('angular-graphql-app Users');
  });
  
  it('should fetch users', () => {
    const mockResponse = {data: {users: [{ id: '1', name: 'John', email: 'email'}]}}
    service.getUsers().subscribe((res) => {
        expect(res.data.users.length).toBe(1);
        expect(res.data.users[0].name).toBe('John');
    })
    const op = controller.expectOne(gql`
        query {
            users {
                id
                name
                email
            }
        }
    `)
    op.flush(mockResponse);
    controller.verify()
})

  it('should add a user', () => {
      const mockResponse = {data: { addUser : { id: '1', name: 'John', email: 'email'}}}
      service.addUser('name','email').subscribe((res) => {
          expect(res.data.addUser.name).toBe('John');
      })
      const op = controller.expectOne(gql`
          mutation addUser($name: String!, $email: String!) {
              addUser(name: $name, email: $email) {
                  id
                  name
              }
          }
      `)
      op.flush(mockResponse);
      controller.verify()
  })

});
