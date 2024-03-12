import { Link } from "react-router-dom";
import "./sidenav.css";
const SideNav = () => {
  return (
    <div className="fixed bg-emerald-500 shadow-lg shadow-emerald-500/50 background border-2 border-emerald-500 rounded-lg p-8 m-8 w-40">
      <ul>
        <li>
          <Link className="hover:text-emerald-400" to="#">
            Overview
          </Link>
        </li>
        <li>
          <Link className="hover:text-emerald-400" to="#">
            Colleges
          </Link>
        </li>
        <li>
          <Link className="hover:text-emerald-400" to="#">
            Scolarships
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
