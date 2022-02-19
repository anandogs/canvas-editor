import Link from 'next/link'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'


function Header() {
  return (
    <header className='flex justify-between p-5'>
        <div>
            <Link href='/'>Blog</Link>
        </div>
        <ul className='flex w-64 justify-around'>
            <li className='cursor-pointer'>
                <Link href='/login'>
                    <div className='flex items-center w-20 justify-around'>
                    <FaSignInAlt /> Login
                    </div>
                </Link>
            </li>
            <li className='cursor-pointer'>
                <Link href='/register'>
                    <div className='flex items-center w-24 justify-around '>
                    <FaUser /> Register
                    </div>
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default Header