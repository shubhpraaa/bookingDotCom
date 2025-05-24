import React from 'react'
import {ChevronDownIcon,XMarkIcon} from '@heroicons/react/24/solid'
import {Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

function DialogComponent({MobileMenuOpen,setMobileMenuOpen,products,callToAction}) {
  return (
    <>
    <Dialog
        as="div"
        className="lg:hidden"
        open={MobileMenuOpen}
        onClose={()=>setMobileMenuOpen(false)}
      >
        <div className=' fixed inset-0 z-10'/>
        <DialogPanel className="fixed inset-y-0 w-full right-0 z-10  px-6 py-6 overflow-y-auto bg-[#013B94] sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className='flex items-center justify-between'>
            <Link to="/" className='-m-1.5 p-1.5'>
              <img src="/logo.svg" alt="Booking.com" className='w-40' />
            </Link>
            <button className='text-white' onClick={()=>setMobileMenuOpen(false)}>
              <span className='sr-only'>Close Menu</span>
              <XMarkIcon className='h-6 w-6'/>
            </button>
          </div>
          
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-700'>
              <div className='space-y-2 py-6'>


                <Disclosure as="div" className="-mx-3">
                  {({open})=>(
                    <>
                      <DisclosureButton
                      className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-blue-800">
                        Stays
                        <ChevronDownIcon
                        className={cn(
                          open? "rotate-180":"",
                          "h-5 w-5 flex-none"
                        )}/>
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {[...products,...callToAction].map((item)=>(
                          <DisclosureButton key={item.name} as="a" href={item.href} className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-blue-800">
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
                <a href='https://www.booking.com/flights/index.html' className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-blue-800'>Flights</a>
                <a href='https://www.booking.com/cars/index.html' className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-blue-800'>Car Rentals</a>
                <a href='https://www.booking.com/attractions/index.html' className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-blue-800'> Attractions</a>
                <a href='https://booking-in.lastminute.com/' className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-blue-800'>Flights+Hotel</a>

                <a href='#' className='-mx-3 block rounded-lg px-3 py-6 text-base font-semibold leading-7 text-white hover:bg-blue-800'>Login</a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  )
}

export default DialogComponent