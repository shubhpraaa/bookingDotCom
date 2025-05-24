import React,{Fragment} from 'react'
import {PopoverButton,Popover, PopoverGroup, Transition, PopoverPanel} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/24/solid'
function PopupBox({products,callToAction}) {
  return (
    <>
        <PopoverGroup className="hidden lg:flex lg-gap-x-12 gap-7">
          <Popover className='relative'>
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
              Stays
              <ChevronDownIcon className='h-5 w-5 flex-none text-white'>

              </ChevronDownIcon>
            </PopoverButton>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <PopoverPanel className='absolute bg-white -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5'> 
                <div className='p-4 '>
                  {products.map((item)=>(
                    <div key={item.name} className='group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50'>
                      <div className='flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 hroup-hover:bg-gray-200'>
                        <item.icon className='h-6 w-6 text-[#013B94] group-hover:text-blue-600'/>
                      </div>
                      <div className='flex-auto'>
                        <a href={item.href} className='block font-semibold text-[#013B94]'>
                          {item.name}<span className='absolute inset-0'></span>
                        </a>
                        <p className='mt-1 text-[#013B94]'>
                          {item.Description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50'>
                  {
                    callToAction.map((item)=>(
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-[#1013B94] hover:bg-gray-100">
                          <item.icon
                          className='h-5 w-5 flex-none text-[#1013B94]'/>
                        {item.name}
                        </a>
                    ))
                  }
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>
        </PopoverGroup>
    </>
  )
}

export default PopupBox