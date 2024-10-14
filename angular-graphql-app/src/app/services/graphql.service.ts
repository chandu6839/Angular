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
                    _id,
                    name,
                    email
                }
            }`,
        });
    }
    //Query for fetching user
    getUser(_id: String): Observable<any> {
        return this.apollo.query({
            query: gql`
            query user($_id: String!){
                user(_id: $_id) {
                    _id
                    name,
                    email
                }
            }`,
            variables: {_id}
        });
    }

    //Muttation for adding user
    addUser(name: String, email: String): Observable<any> {
        return this.apollo.mutate({
            mutation: gql`
            mutation addUser($name: String!, $email: String!) {
                addUser(name: $name, email: $email){
                    _id,
                    name,
                    email
                }
            }`,
            variables: {name, email}
        });
    }
    deleteUser(_id: String): Observable<any> {
        return this.apollo.mutate({
            mutation: gql`
            mutation deleteUser($_id: String!) {
                deleteUser(_id: $_id) {
                    _id
                }
            }`,
            variables: {_id}
        });
    }
    updateUser(_id: String, name: String, email: String): Observable<any> {
        return this.apollo.mutate({
            mutation: gql`
                mutation updateUser($_id: String!, $name: String!, $email: String!) {
                    updateUser(_id: $_id, name: $name, email: $email) {
                        _id,
                        name,
                        email
                    }
                }
            `,
            variables: {_id, name, email}
        });
    }

 }