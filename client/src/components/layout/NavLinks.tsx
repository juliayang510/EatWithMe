import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { navItems } from './navItems'

interface NavLinksProps {
  orientation: 'horizontal' | 'vertical'
}

export function NavLinks({ orientation }: NavLinksProps) {
  return (
    <>
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            clsx(
              'flex min-h-11 items-center gap-3 rounded-lg font-medium transition-colors',
              orientation === 'horizontal'
                ? 'flex-1 flex-col justify-center gap-1 py-2 text-xs'
                : 'px-3 py-2.5 text-sm',
              isActive
                ? 'text-cardinal'
                : 'text-gray-70 hover:text-rich-black',
            )
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                size={22}
                strokeWidth={2}
                className={isActive ? 'text-cardinal' : 'text-gray-70'}
                aria-hidden="true"
              />
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </>
  )
}
