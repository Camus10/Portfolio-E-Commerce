import React, { useState } from "react";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";


const Signin = () => {
  const [values, setValues] = useState({
    email: "grace@qq.com",
    password: "Lahir1997",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value  // [name] grab values name, email, password
    });
  }

  const clickSubmit = event => {
    event.preventDefault(); // prevent windows reload
    setValues({
      ...values,
      error: false,
      loading: true
    });
    signin({
      email,
      password
    })
    .then(data => {
      if(data.error){
        setValues({
          ...values,
          error: data.error,
          loading: false
        });
      }else{
        authenticate(data, () => {          
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  }
  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange("email")} type="email" className="form-control" value={email} />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange("password")} type="password" className="form-control" value={password} />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
    </form>
  );

  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
      {error}
    </div>
  );
  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if(redirectToReferrer){
      if(user && user.role === 1){
        return <Redirect to="/admin/dashboard"/>
      }else{
        return <Redirect to="/user/dashboard" />
      }
    }

    if(isAuthenticated()){
      return <Redirect to="/" />
    }
  }

  return (
    <Layout title="Sign In" description="Node React E-Commerce App" className="container col-md-8 offset-md-2">
    {showLoading()}
    {showError()}
    {signUpForm()}
    {redirectUser()}
    </Layout>
  );
}


export default Signin;