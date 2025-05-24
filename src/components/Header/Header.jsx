import React, { Fragment, useState } from 'react'
import { Button } from '../ui/button'
import { Link} from 'react-router-dom'
import {ArrowRightIcon, Bars3Icon, ChatBubbleLeftIcon, HomeIcon, PaperAirplaneIcon, PhoneIcon, PlayCircleIcon} from '@heroicons/react/24/solid'
import PopupBox from './PopupBox.jsx'
import DialogComponent from './DialogComponent.jsx'

function Header() {
  const [MobileMenuOpen,setMobileMenuOpen] = useState(false);
  const products = [
    {
      name:"Book a Stay",
      Description:"Get a better understanding of your traffic",
      href:"#",
      icon: HomeIcon,
    },
    {
      name:"Book a Flight",
      Description:"Speak directly to you customer",
      href:"#",
      icon:PaperAirplaneIcon,
    },
    {
      name:"Contact out Support Team",
      Description:"Your customers data will be safe and secure",
      href:"#",
      icon:ChatBubbleLeftIcon,
    }
  ]
  const callToAction = [
    {name: "See Demo Booking", href:"#", icon: PlayCircleIcon},
    {name: "Contact Support",href:"#",icon:PhoneIcon},
  ]
  return (
    <header className='bg-[#013B94]'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:p-8'>
        <div className='flex'>
          <Link to="/" className='-m-1.5 p-1.5'>
            <img src="/logo.svg" alt="Booking.com" className='w-40' />
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button type='button' onClick={()=>setMobileMenuOpen(true)} className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white'>
            <Bars3Icon className='w-6 h-6'></Bars3Icon>
          </button>
        </div>
        <div className="hidden lg:flex lg-gap-x-12 gap-7">
          <PopupBox products={products} callToAction={callToAction}/>
          <a href='https://www.booking.com/flights/index.html' className='text-sm font-semibold leading-6 text-white'>Flights</a>
          <a href='https://www.booking.com/cars/index.html' className='text-sm font-semibold leading-6 text-white'>Car Rentals</a>
          <a href='https://www.booking.com/attractions/index.html' className='text-sm font-semibold leading-6 text-white'> Attractions</a>
          <a href='https://booking-in.lastminute.com/' className='text-sm font-semibold leading-6 text-white'>Flights+Hotel</a>
        </div>


        <div className='hidden lg:flex'>
        <Link to='https://github.com/shubhpraaa'>
          <Button className=' font-semibold text-white hover:bg-[#0250C5] hover:text-white ' variant='ghost'>Github <ArrowRightIcon/></Button>
        </Link>
        </div>
      </nav>
      <DialogComponent MobileMenuOpen={MobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} products={products} callToAction={callToAction}/>
    </header>
  )
}

export default Header