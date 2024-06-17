import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Footer className='border border-t-3 border-gray-500 py-3'>
      <div className=''>
        <div className=''>
          <div className="">
            <Link
              to='/'
              className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Stitch</span> Perfect
            </Link>
          </div>
        </div>
      </div>
    </Footer>
  )
};

export default Footer;
