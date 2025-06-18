import React from 'react'
import NavBar from './NavBar'
import { auth } from '@/auth'

const NavBarContainer = async () => {
  const session = await auth()
  const user = session?.user;
  console.log("Session in NavBarContainer:", session)
  return (
    <NavBar loggedInUser={user} />
  )
}

export default NavBarContainer