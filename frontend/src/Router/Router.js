import {useRoutes} from "react-router-dom"

import "./Router.css";
import Login from "../pages/Login";
import LogRegPage from "../pages/LogRegPage";
import MainPage from "../pages/MainPage";
import CreateProposal from "../pages/CreateProposal";
import Voting from "../pages/Voting";
import Results from "../pages/Results";
import Involvement from "../pages/Involvement";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Register from "../pages/Register";
import AdminPage from "../pages/AdminPage";


const Router = () => {
    const routes = useRoutes(
        [
          {
            path: '/',
            element: <LogRegPage/>,
            children: [
                {
                  path: "login",
                  element: <Login/>,
                },
                {
                  path: "register",
                  element: <Register/>,
                },
              ],
        },{
          path: '/admin',
          element: <AdminPage/>,
          children: [
            {
              path: "create",
              element: <CreateProposal/>
            }
          ]
        },
        {
          path: '/bloksecim',
          element: <MainPage/>,
          children:[
            {
              path: "create",
              element: <CreateProposal/>
            },
            {
              path: "voting",
              element: <Voting/>
            },
            {
              path: "results",
              element: <Results/>
            },
            {
              path: "involvement",
              element: <Involvement/>
            },
            {
              path: "proposals",
              element: <Voting/>
            },
            {
              path: "profile",
              element: <Profile/>
            },
            {
              path: "about",
              element: <About/>
            },
          ]
        }
        ]
    )
    return routes
}
export default Router