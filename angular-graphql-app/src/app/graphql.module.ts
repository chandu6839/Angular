import { NgModule } from "@angular/core";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from "@apollo/client/core";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    exports: [ApolloModule, HttpClientModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) => ({
                    cache: new InMemoryCache(),
                    link: httpLink.create({uri: 'http://localhost:4000/graphQl'})
            }),
            deps: [HttpLink],
        }
    ],
})
export class GraphQLModule {};