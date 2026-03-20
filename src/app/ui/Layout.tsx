import { Link, Outlet } from "react-router-dom";
import "./App.css";

export default function Layout() {

  return <>
    <header>Header 
        <Link to='/'>Home</Link> 
        <Link to='/no-address'>Not Found</Link>
    </header>
    <main><Outlet /></main>
    <footer>Footer</footer>
  </>
};
