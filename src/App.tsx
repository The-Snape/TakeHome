import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider} from '@apollo/client';
import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';

const client= new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://touched-serval-58.hasura.app/v1/graphql',
    headers: {
      'x-hasura-admin-secret': `IwLaLm1BACwrg8vx1oN8Z6H6UJSVyUvwzVsyYLjk5EjdQSwI3KlztYLI3mJOOQKh`
    }
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navbar/>
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/create">
                <Create/>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  
);
}

export default App;
