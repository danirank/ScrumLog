import { NavLink } from 'react-router-dom';
import styles from './NavigationMenu.module.css';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/persons', label: 'Persons' },
  { to: '/sprints', label: 'Sprints' },
  { to: '/meetings', label: 'Meetings' },
];

export function NavigationMenu() {
  return (
    <nav className={styles.menu} aria-label="Main navigation">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
          end={link.to === '/'}
        >
          <span className={styles.label}>{link.label}</span>
          <span className={styles.icon} aria-hidden="true">-&gt;</span>
        </NavLink>
      ))}
    </nav>
  );
}
