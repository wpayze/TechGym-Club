import "./Auth.scss";

const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
    }

    console.log(data);
}

const Register = () => {
  return (
    <div className="has-background-light registerWrapper">
      <section className="container registerForm">
        <div className="columns is-multiline">
          <div className="column is-8 is-offset-2 register">
            <div className="columns">
              <div className="column left">
                <h1 className="title is-1">Tech GYM Club</h1>
                <h2 className="subtitle colored is-4">
                  Take a look inside my GYM Management system.
                </h2>
                <p>Manage Members, Memberships, Products and more...</p>
              </div>
              <div className="column right has-text-centered">
                <h1 className="title is-4">Sign up today</h1>
                <p className="description">It's completely free!</p>
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Name"
                        name="name"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="email"
                        placeholder="Email"
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="password"
                        placeholder="Password"
                        name="password"
                      />
                    </div>
                  </div>
                  <button type="submit" className="button is-block is-primary is-fullwidth is-medium">
                    Submit
                  </button>
                  <br />
                  {/* <small>
                  <em>Lorem ipsum dolor sit amet consectetur.</em>
                </small> */}
                </form>
              </div>
            </div>
          </div>
          <div className="column is-8 is-offset-2">
            <br />
            {/* <nav className="level">
              <div className="level-left">
                <div className="level-item">
                  <span className="icon">
                    <i className="fab fa-twitter" />
                  </span>{" "}
                   
                  <span className="icon">
                    <i className="fab fa-facebook" />
                  </span>{" "}
                   
                  <span className="icon">
                    <i className="fab fa-instagram" />
                  </span>{" "}
                   
                  <span className="icon">
                    <i className="fab fa-github" />
                  </span>{" "}
                   
                  <span className="icon">
                    <i className="fas fa-envelope" />
                  </span>
                </div>
              </div>
              <div className="level-right">
                <small
                  className="level-item"
                  style={{ color: "var(--textLight)" }}
                >
                  © TechGYM Club
                </small>
              </div>
            </nav> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
