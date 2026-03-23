import { Link, Outlet } from "react-router-dom";
import "./App.css";

export default function Layout() {

  return <>
    <header>
        Frontend 
        <Link to='/'>Home</Link> 
        <Link to='/deploy'>Deploy</Link>
        <Link to='/auth'>Auth</Link>
        <Link to='/no-address'>Not Found</Link>
    </header>
    <main><Outlet /></main>
    <footer>Footer</footer>
  </>
};
