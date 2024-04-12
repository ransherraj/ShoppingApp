import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";

import UserInfoMenu from "../../components/nav/UserInfoMenu";
import UserMenu from "../../components/nav/UserMenu";

export default function UserDashboard() {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Your Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-6">
            <UserInfoMenu />
          </div>
        </div>
      </div>
    </>
  );
}
