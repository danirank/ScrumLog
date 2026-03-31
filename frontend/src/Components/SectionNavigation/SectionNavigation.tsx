import { NavLink } from 'react-router-dom';
import styles from './SectionNavigation.module.css';

export interface SectionNavigationItem {
  to: string;
  label: string;
  end?: boolean;
}

interface SectionNavigationProps {
  items: SectionNavigationItem[];
}

export function SectionNavigation({ items }: SectionNavigationProps) {
  return (
    <nav className={styles.nav} aria-label="Page sections">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
