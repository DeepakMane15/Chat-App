import './style.css';
import React, {useState} from 'react';
import axios from 'axios';

const Register = () => {
    
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();


  const signup = async (e) => {
    
const data = {
  firstName : firstname,
  lastName : lastname,
  email:email,
  password : pwd
}
console.log('data',data);
await axios.post('http://localhost:5000/signup', data)
.then(function (response) {
  console.log(response);
  alert(response.data)
})
.catch(function (error) {
  console.log(error);
});
}
  return (
    <div classNameName="App">
      <section className="background-radial-gradient ">

      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
    <div className="row gx-lg-5 align-items-center mb-5">
      <div className="col-lg-6 mb-5 mb-lg-0" style={{zIndex: "10"}}>
        <h1 className="my-5 display-5 fw-bold ls-tight" style={{color: "hsl(218, 81%, 95%)"}}>
          The best offer <br />
          <span style={{color: "hsl(218, 81%, 75%)"}}>for your business</span>
        </h1>
        <p className="mb-4 opacity-70" style={{color: "hsl(218, 81%, 85%)"}}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Temporibus, expedita iusto veniam atque, magni tempora mollitia
          dolorum consequatur nulla, neque debitis eos reprehenderit quasi
          ab ipsum nisi dolorem modi. Quos?
        </p>
      </div>
      <div className="col-lg-6 mb-5 mb-lg-0 ">
        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

        <div className="card bg-glass">
          <div className="card-body px-4 py-5 px-md-5">
              <h3> Sign up</h3>
            <form style={{marginTop:30}}>
             
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input 
                    type="text" 
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="form-control" />
                    <label className="form-label" for="form3Example1">First name</label>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input 
                    type="text" 
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="form-control" />
                    <label className="form-label" for="form3Example2">Last name</label>
                  </div>
                </div>
              </div>
              <div className="form-outline mb-4">
                <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control" />
                <label className="form-label" for="form3Example3">Email address</label>
              </div>

              
              <div className="form-outline mb-4">
                <input 
                type="password" 
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="form-control" />
                <label className="form-label" for="form3Example4">Password</label>
              </div>
              
              <button type="button" className="btn btn-primary btn-block mb-4" onClick={signup}>
                Sign up
              </button>
              <p>
                Already have an account? <a href="/login">login here!</a>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
      
      </section>
    
    </div>
  );

}
export default Register;