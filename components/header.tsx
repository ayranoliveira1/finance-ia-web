import Image from 'next/image'
import NavHeader from './nav-header'
import MenuHeader from './menu-header'

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="Finance Ai" width={173} height={39} />

        <NavHeader />
      </div>

      <div className="hidden lg:flex">teste</div>

      <MenuHeader />
    </header>
  )
}

export default Header
