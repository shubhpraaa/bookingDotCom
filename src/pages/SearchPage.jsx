import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { results } from '@/data/hotelData';
import { Link } from 'react-router-dom';
import Loader from '@/components/Loader';

function SearchPage(props) {
  
  const location = useLocation();
  const [urlData,setUrlData] = useState(null)
  const [loader,setLoader] = useState(true)
  useEffect(()=>{
    const query = new URLSearchParams(location.search);
    const encodedUrl = query.get('url')
    if(encodedUrl){
      const decodedUrl = decodeURIComponent(encodedUrl)
      const bParms = new URL(decodedUrl).searchParams;
      setUrlData(bParms)
      setLoader(false) 
    }
  },[])
  return loader?<Loader />:(
    <section>
      <div className='mx-auto max-w-7xl p-6 lg:px-8'>
        <h1 className='text-4xl font-bold pb-3'>Your Trip Results</h1>

        {urlData && (
          <h2 className='pb-3'>
            Dates of trip:
            <span className='italic ml-2'>
              {urlData.get("checkin")} to {urlData.get("checkout")}
            </span>
          </h2>
        )}
        

        <hr className='mb-5'/>

        <h3 className='font-semibold text-xl'>
          {urlData && urlData.get("ss")}: {results.content.total_listings} properties found
        </h3>
        <div className='space-y-2 mt-5'>
          {results.content.listings.map((item,i)=>(
            
            <div 
              key={i}
              className='flex space-y-2 justify-between space-x-4 p-5 border rounded-lg hover:bg-blue-50 transition duration-400 hover:scale-102'
            >
              <img src={item.url} alt="image of property" className='h-44 2-44 rounded-lg'/>
              <div className='flex flex-1 space-x-5 justify-between'>
                
                <div>
                  <Link to={item.link} className='font-bold text-blue-500 hover:text-blue-600 hover:underline'>
                    {item.title}
                  </Link>
                  <p className='text-xs'>{item.description}</p>
                </div>

                <div className='flex flex-col justify-between'>
                  <div className='flex items-start justify-end space-x-2 text-right'>
                    <div>
                      <p className='font-bold'>{item.rating_word}</p>
                      <p className='text-xs'>{item.rating_count}</p>
                    </div>
                    
                    <p className='flex items-center justify-center font-bold text-sm w-10 h-10 text-white bg-blue-900 rounded-lg flex-shrink-0'>
                      {item.rating||"N/A"}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='md:text-xs'>{item.booking_metadata}</p>
                    <p className='md:text-2xl font-bold'>{item.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default SearchPage