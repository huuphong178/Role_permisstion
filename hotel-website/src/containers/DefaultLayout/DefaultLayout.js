import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
} from '@coreui/react';
import Sidebar from '../Sidebar/Sidebar'
// routes config
import routes from '../../routes';
//import Cryptr from 'cryptr';
import {getAllNavRole} from '../../api/nav_role'
import {getOneRole} from '../../api/role'
import fakeAuth from '../../api/fakeAuth'
//const cryptr = new Cryptr('myTotalySecretKey'); 

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));


class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      nav_roles:[]
    }
  }
  componentWillMount(){
    var result=[];
    getAllNavRole().then((res) => { 
      result = res.data;
      result.map(re=>{
        let array = re.roles.split(",");
        return re.roles=array
      })
      getOneRole(fakeAuth.getUsername()).then(res=>{
        let roleUSer = res.data.role.split(",");
        this.setState({
          nav_roles:result,
          roles:roleUSer
          })
        })
      })
      
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }
  appendRoleToRouter=(items, items_roles) =>{
    var result=[...items];
    return result.map((item, index)=>{
      items_roles.map((itemR, index2)=>{
          if(item.name===itemR.name){
            item.roles=itemR.roles;
          }
          return itemR;
        })
        return item;
    })
  }
  isValidRole = (userRole, rolesValid) => {
    if(!rolesValid) {
      return true;
    }
    if(!userRole) {
      return false;
    }
    for (let i=0; i< rolesValid.length; i++) {
      if (userRole.indexOf(rolesValid[i]) > -1) {
        return true;
      }
    }
    return false;
  }

  render() {
    var {roles}=this.state;
    let routesAppendRole=this.appendRoleToRouter(routes,this.state.nav_roles);
    let retRouter= routesAppendRole.filter(route => (this.isValidRole(roles, route.roles)))

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense fallback={this.loading()}>
            <Sidebar roles={roles} {...this.props}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={retRouter}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {retRouter
                  // .  (route=> (this.isValidRole(roles, route.roles)))
                  .map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
