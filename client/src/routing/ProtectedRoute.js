import { Route, Redirect } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Spinner } from "react-bootstrap";
import NavBarMenu from "../components/layout/NavBarMenu";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <>
              <NavBarMenu />
              <Component {...rest} {...props} />
            </>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
};

export default ProtectedRoute;
