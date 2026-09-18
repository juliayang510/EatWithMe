import { Outlet } from 'react-router-dom'
import { NavLinks } from './NavLinks'

export function AppShell() {
  return (
    // The sidebar is fixed to the real viewport edge, so it must live outside
    // any mx-auto/max-w wrapper — centering that pair as a unit (rather than
    // just the content) leaves a stray gap between them on wide viewports.
    <div className="flex min-h-svh md:pl-56">
      <aside
        className="fixed inset-y-0 left-0 hidden w-56 flex-col gap-1 border-r border-gray-30 bg-white px-3 py-6 md:flex"
        aria-label="Primary"
      >
        <div className="mb-4 px-3 text-xl font-bold text-cardinal">Eat With Me</div>
        <nav className="flex flex-col gap-1" aria-label="Primary navigation">
          <NavLinks orientation="vertical" />
        </nav>
      </aside>

      <div className="flex w-full flex-col">
        <header className="flex items-center border-b border-gray-30 px-4 py-3 md:hidden">
          <span className="text-lg font-bold text-cardinal">Eat With Me</span>
        </header>

        <main className="flex-1 px-4 pb-24 pt-4 md:pb-8">
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>

        <nav
          className="fixed inset-x-0 bottom-0 z-10 flex border-t border-gray-30 bg-white px-2 pb-[env(safe-area-inset-bottom)] md:hidden"
          aria-label="Primary navigation"
        >
          <NavLinks orientation="horizontal" />
        </nav>
      </div>
    </div>
  )
}
