import { Injectable } from "@angular/core"; 
import { Apollo, gql } from "apollo-angular";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class GraphQLService{
    constructor(private apollo: Apollo) {}

    //Query for fetching users
    getUsers(): Observable<any> {
        return this.apollo.query({
            query: gql`
            query {
                users {
                    id,
                    name,
                    email
                }
            }`,
        });
    }
    //Muttation for adding user
    addUser(name: string, email: string): Observable<any> {
        return this.apollo.mutate({
            mutation: gql`
            mutation addUser($name: String!, $email: String!) {
                addUser(name: $name, email: $email){
                    id,
                    name
                }
            }`,
            variables: {name, email}
        });
    }
 }