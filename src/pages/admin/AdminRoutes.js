import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login";

const AdminRoutes = () => {
  const { path } = useRouteMatch(); // path = "/admin"

  return (
    <AdminLayout>
      <Switch>
        <Route path={`${path}/login`} component={Login} />
        <Route path={`${path}/dashboard`} component={Dashboard} />
        <Route path={path} exact render={() => <div>Welcome to Admin</div>} />
      </Switch>
    </AdminLayout>
  );
};

export default AdminRoutes;
