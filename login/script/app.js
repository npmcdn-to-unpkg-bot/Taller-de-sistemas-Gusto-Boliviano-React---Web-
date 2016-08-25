
var ReactRouter = window.ReactRouter
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Link = ReactRouter.Link
var IndexRoute = ReactRouter.IndexRoute
var IndexLink = ReactRouter.IntexLink
var Redirect = ReactRouter.Redirect

var BrowserHistory = ReactRouter.BrowserHistory;

var asd = "ASDASDAS";
var Home = React.createClass({
  logout: function() {
    sessionStorage.clear();
    //console.log(sessionStorage.length)
  },
  render: function() {
      return (
        <div>
          <h2>STUFF</h2>
          <p>Mauris sem velit, vehicula eget sodales vitae,
          rhoncus eget sapien:</p>
          <ol>
            <li>Nulla pulvinar diam</li>
            <li>Facilisis bibendum</li>
            <li>Vestibulum vulputate</li>
            <li>Eget erat</li>
            <li>{sessionStorage.length}</li>
          </ol>
          <div className="form-control btn btn-default btn-primary marginTop" type="button"
          onClick={this.logout}> Salir </div>
        </div>
      );
    }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <div className="well well-sm"><center><h1>Gusto Boliviano</h1></center></div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
})
var LogIn = React.createClass({
  getInitialState: function(){
    return{
      email: sessionStorage.length > 0 ? sessionStorage.getItem("Email"): "",
      userType: sessionStorage.length > 0 ? sessionStorage.getItem("Email"): "",
    }
  },
  componentWillMount: function() {
      this.firebaseRef = new Firebase("https://exampleabm.firebaseio.com");
  },
  create: function() {
    //console.log(this.refs.user.value+" "+this.refs.pass.value);
    var ref = new Firebase("https://exampleabm.firebaseio.com");
    ref.createUser({
      email    : this.refs.user.value,
      password : this.refs.pass.value
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
    this.firebaseRef.push({producto: "gg"});
  },
  login: function() {
    var ref = new Firebase("https://exampleabm.firebaseio.com");
    ref.authWithPassword({
      email    : this.refs.user.value,
      password : this.refs.pass.value
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        sessionStorage.setItem("Email", authData['auth']['token']['email']);
      }
    });
  },
  logout: function() {
    sessionStorage.clear();
  },
  render: function() {
    return (  
      <div className="form-group">
        <h2><center> Control de Acceso </center></h2>
          <input type="email" className="form-control marginTop" 
            ref="user" 
            placeholder="Usuario"/>
          <input type="password" className="form-control marginTop" 
            ref="pass" 
            placeholder="Contraseña"/>
          <label>{this.state.email}</label>
        
        <div className="form-control btn btn-default btn-primary marginTop" type="button"
          onClick={this.login}> Entrar </div>
        <div className="form-control btn btn-default btn-primary marginTop" type="button"
          onClick={this.logout}> Salir </div>
      </div>
    );
  }
})
function onSystem(nextState, replace) {
  if (sessionStorage.length > 0) {
    replace({
      pathname: '/home',
      state: { nextPathname: nextState.location.pathname }
    })
    window.location = nextState.location.pathname;
  }
}
function requiereAuth(nextState, replace) {
  if (sessionStorage.length < 0) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render(
  <Router history={BrowserHistory}  >
    <Route path="/" component={App}>
      <IndexRoute component={LogIn}/>
      <Route path="home" component={Home}/>
    </Route>
  </Router>,
  document.querySelector("#app")
);