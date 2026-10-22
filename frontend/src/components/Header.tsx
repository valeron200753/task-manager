
import { NavLink } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";
import "./Header.css";

function Header() {
    const navClass = ({
        isActive
    }: {
        isActive: boolean;
    }) =>
        `site-nav__link${isActive ? " is-active" : ""}`;

    return (
        <header className="site-header">
            <div className="site-header__inner">

                <NavLink
                    to="/tasks"
                    className="site-header__brand"
                    aria-label="Task Manager — Tasks"
                >
                    <span
                        className="site-header__brand-icon"
                        aria-hidden="true"
                    >
                        ✓
                    </span>

                    <span className="site-header__brand-name">
                        TASK<span>.MANAGER</span>
                    </span>
                </NavLink>

                <nav
                    className="site-nav"
                    aria-label="Main navigation"
                >
                    <NavLink
                        to="/tasks"
                        className={navClass}
                    >
                        Tasks
                    </NavLink>

                    <NavLink
                        to="/account"
                        className={navClass}
                    >
                        Account
                    </NavLink>
                </nav>

                <div className="site-header__actions">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}

export default Header;
