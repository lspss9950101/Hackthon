import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { HashRouter, NavLink, Redirect, Route } from 'react-router-dom';
import IndividualDataPage from './Components/IndividualDataPage';
import PublicDataPage from './Components/PublicDataPage';


class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <HashRouter>
                    <Navbar sticky="top" bg="dark" variant="dark" >
                        <Nav className="mr-auto">
                            <Nav.Link href="#publics">Public Data</Nav.Link>
                            <Nav.Link href="#individuals">Individual Data</Nav.Link>
                        </Nav>
                    </Navbar>
                    <Redirect from="/" to="publics"/>
                    <Route path="/publics" component={PublicDataPage} />
                    <Route path="/individuals" component={IndividualDataPage}/>
                </HashRouter>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));