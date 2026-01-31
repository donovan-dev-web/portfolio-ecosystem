import style from './navbar.module.scss'

import { NavLink } from 'react-router-dom'

export function NavBar() {
  return (
    <>
      <nav className={style.navbar}>
        <ul>
          <li>
            <NavLink to="/"> Accueil </NavLink>
          </li>
          <li>
            <NavLink to="/projects"> Mes Projets </NavLink>
          </li>
          <li>
            <NavLink to="/messages"> Mes Messages </NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}
