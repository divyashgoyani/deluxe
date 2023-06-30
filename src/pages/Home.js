import React, { Fragment } from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';

const Home = () => {
  return (
    <Fragment>
      <Hero>
        <Banner title="Luxurious rooms" subtitle="deluxe room starting at 299$">
          <Link to='/rooms' className="btn-primary">
            our room
          </Link>
        </Banner>
      </Hero>
      <Services />
      <FeaturedRooms />
    </Fragment>
  )
}

export default Home;