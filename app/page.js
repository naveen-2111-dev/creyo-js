'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/NavBar'
import "../app/globals.css"
// import "tailwindcss/tailwind.css"
import "@/app/globals.css"

const Welcome = () => {
  const [query, setQuery] = useState('')
  const [keywords, setKeywords] = useState([])
  const router = useRouter()
  const [showSuggestions, setShowSuggestions] = useState(false);
  const trendingKeywords = ['Remote Jobs', 'Web Development', 'Graphic Design', 'Freelance Writing', 'Digital Marketing'];


  useEffect(() => {
    const fetchKeywords = async () => {
      const trendingKeywords = [
        'Web Development',
        'UI/UX Design',
        'Blockchain',
        'Digital Marketing',
        'Data Science',
        'Cybersecurity',
        'Cloud Computing',
        'Internet of Things',
      ]
      setKeywords(trendingKeywords)
    }
    fetchKeywords()
  }, [])

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };
  const formatQuery = (query) => query.trim().replace(/\s+/g, '-').toLowerCase()

  const handleSearch = () => {
    if (query) {
      const formattedQuery = formatQuery(query)
      router.push(`/search/${formattedQuery}`)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && query) {
      const formattedQuery = formatQuery(query)
      router.push(`/search/${formattedQuery}`)
    }
  }

  const handleKeywordClick = (keyword) => {
    const formattedKeyword = formatQuery(keyword)
    router.push(`/search/${formattedKeyword}`)
  }

  return (
    <div className='flex flex-col min-h-screen  poppinsFont bg-white'>
      {/* Navbar */}
      <div className='w-full shadow-md bg-white'>
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className='flex items-center justify-center min-h-[500px] bg-white px-4'>
        <div className='flex flex-col items-center mt-10 w-full max-w-[100rem] h-auto md:h-[40rem] rounded-2xl justify-center animate-gradient-shift text-white m-4 md:m-10 p-8 md:p-10 text-center bg-[length:400%_400%] animate-gradient'>
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold mb-4'>We bring people together to</h1>
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold mb-6'>turn ideas into reality.</h1>
          <p className='text-base md:text-lg w-full max-w-[450px] mb-8'>
            Connect with top talent or explore job opportunities using tools that empower your decisions.
          </p>

          {/* Search Bar */}
          <div className='w-full max-w-[90%] md:max-w-2xl flex items-center bg-white text-black rounded-md p-2 relative'>
            <input
              type='text'
              className='px-4 py-2 w-full bg-white text-black focus:outline-none rounded placeholder-gray-500'
              placeholder='Search for opportunities...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress} // Trigger search on Enter
            />
            <button
              onClick={handleSearch}
              className='w-12 h-12 bg-black text-white flex items-center justify-center rounded-md hover:bg-orange-700 ml-2'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M9,2c-3.85415,0 -7,3.14585 -7,7c0,3.85415 3.14585,7 7,7c1.748,0 3.34501,-0.65198 4.57422,-1.71875l0.42578,0.42578v1.29297l6,6l2,-2l-6,-6h-1.29297l-0.42578,-0.42578c1.06677,-1.22921 1.71875,-2.82622 1.71875,-4.57422c0,-3.85415 -3.14585,-7 -7,-7zM9,4c2.77327,0 5,2.22673 5,5c0,2.77327 -2.22673,5 -5,5c-2.77327,0 -5,-2.22673 -5,-5c0,-2.77327 2.22673,-5 5,-5z"></path>
                  </g>
                </g>
              </svg>
            </button>

            {/* Suggestions */}
            {showSuggestions && (
              <div className='absolute top-full left-0 w-full bg-white text-black shadow-md rounded-md mt-2 z-10'>
                {trendingKeywords.map((keyword, index) => (
                  <div
                    key={index}
                    className='px-4 py-2 hover:bg-gray-200 cursor-pointer text-left'
                    onClick={() => {
                      setQuery(keyword); // Set the query from suggestions
                      handleSearch(); // Trigger search
                    }}>
                    {keyword}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>



      {/* Main Content */}
      <div className='flex flex-col p-10 items-center flex-grow text-center'>
        {/* Popular Keywords */}
        <div className='mt-0 text-center'>
          <h2 className='text-4xl font-semibold text-black mb-4 flex items-center justify-center gap-2'>
            <img
              src='/images/fire.gif'
              alt='Trending GIF'
              className='w-8 h-8 animate-pulse'
            />
            Trending Keywords
          </h2>
          <div className='flex flex-wrap justify-center gap-4'>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword)}
                className='px-4 py-2 border border-black text-black rounded-full hover:bg-orange-500 hover:border-none transition-colors shadow-sm'>
                {keyword}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Services */}
        <div className='mt-20 text-left'>
          <h2 className='text-4xl font-semibold text-black mb-4'>Popular Services</h2>

          <div className='relative overflow-hidden'>
            <div className='flex space-x-6 animate-marquee'>
              {[
                {
                  name: 'E-commerce Building',
                  imageUrl: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  description: 'Build and manage your online store.'
                },
                {
                  name: 'Consulting',
                  imageUrl: 'https://plus.unsplash.com/premium_photo-1661573365093-5b930d863ffb?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  description: 'Expert advice to boost your business.'
                },
                {
                  name: 'SEO Optimization',
                  imageUrl: 'https://plus.unsplash.com/premium_photo-1731406052661-088c49b281b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  description: 'Improve your website ranking and visibility.'
                },
                {
                  name: 'Mobile App Development',
                  imageUrl: 'https://plus.unsplash.com/premium_photo-1681487865280-c2b836dd83e8?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  description: 'Create high-performance mobile applications.'
                },
                {
                  name: 'UI/UX Design',
                  imageUrl: 'https://plus.unsplash.com/premium_photo-1661326248013-3107a4b2bd91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  description: 'Crafting user-friendly and beautiful designs.'
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className='bg-white shadow-md rounded-lg p-4 w-56 h-72 flex flex-col justify-between cursor-pointer border-2 border-transparent hover:border-orange-600 transition-all duration-300'>
                  <div className='flex flex-col justify-between flex-grow'>
                    {/* Service Image */}
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className='w-full h-32 object-cover rounded-lg mb-4'
                    />

                    <h3 className='text-lg font-bold text-black'>{service.name}</h3>
                    <p className='text-sm text-gray-600 mt-2'>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>



        {/* Freekancer section*/}
        <div className='flex items-center justify-center min-h-[500px] bg-white mt-20'>
          <div
            className='relative flex flex-col items-center mt-10 w-[80rem] h-[40rem] rounded-2xl border-2 border-black justify-center bg-cover bg-center bg-no-repeat m-10 p-10 text-center'
            style={{
              backgroundImage: `url('https://img.freepik.com/free-photo/medium-shot-smiley-man-working-desk_23-2149930992.jpg?t=st=1733252345~exp=1733255945~hmac=bf6f4f9b637fe47ca20a36c26c83c5f002e8a4f045d6f65eb01b50e5a140139e&w=1380')`,
            }}
          >
            <div className='absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-black to-transparent rounded-l-2xl'></div>

            {/* Top-left text */}
            <div className='absolute top-4 left-4 bg-opacity-50 text-white text-xl font-bold py-2 px-4 rounded-md '>
              For Freelancers
            </div>

            {/* Additional text */}
            <div className='absolute top-24 left-4 text-white text-8xl font-semibold py-1 px-3 rounded-md text-left'>
              Find Your <span className='block '>Work!</span>
              <p className='text-xl font-normal w-30 mt-4'>
                Discover exciting opportunities and connect with <span className='block '> top clients to kickstart your freelance journey.</span>
              </p>
              <button
                className='mt-6 bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold py-2 px-6 rounded shadow-lg transition-all duration-300'
                onClick={() => router.push('/signup')}
              >
                Explore
              </button>
            </div>

          </div>
        </div>
        <div className='flex items-center justify-center min-h-[500px] bg-white mt-20'>
          <div
            className='relative flex mt-10 w-[80rem] h-[40rem] rounded-2xl border-2 border-black justify-end bg-cover bg-center bg-no-repeat m-10 p-10'
            style={{
              backgroundImage: `url('https://img.freepik.com/free-photo/two-indian-business-man-suits-sitting-office-cafe-looking-laptop-drinking-coffee_627829-1501.jpg?t=st=1733254203~exp=1733257803~hmac=e19e321796df6bec93752d1096b8e8b0b51c7bc9bd03f2d6fdb345b587e47ec1&w=1380')`,
            }}
          >
            {/* Overlay for the right side */}
            <div className='absolute top-0 bottom-0 right-0 w-full bg-gradient-to-r from-transparent to-black rounded-l-2xl'></div>


            {/* Top-left text */}
            <div className='absolute top-4 right-4 bg-opacity-50 text-white text-xl font-bold py-2 px-4 rounded-md'>
              For Client
            </div>

            {/* Right-side content */}
            <div className='relative z-10 flex flex-col justify-center items-start text-left text-white w-1/2 pr-8'>
              <h1 className='text-6xl font-bold'>Find Your Gigs</h1>
              <p className='text-xl font-normal mt-4'>
                Tap into a vast network of skilled independent professionals
                <span className='block'>
                  to bring your ideas to life—whether it's a fast-paced project or a major transformation.
                </span>
              </p>
              <button
                className='mt-6 bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold py-2 px-6 rounded shadow-lg transition-all duration-300'
                onClick={() => router.push('/signup')}
              >
                Explore
              </button>
            </div>
          </div>
        </div>





      </div>
    </div>
  )
}

export default Welcome
