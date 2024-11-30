import React from 'react';

const BannerFooter = () => {
    return (
        <>
             <div 
             className="site-section bg-secondary bg-image"
             style={{ backgroundImage: `url('/assets/images/bg_2.jpg')` }}
              >
      <div className="container">
        <div className="row align-items-stretch">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="banner-1 h-100 d-flex" 
            style={{ backgroundImage: `url('/assets/images/bg_1.jpg')` }}
            >
              <div className="banner-1-inner align-self-center">
                <h2>Pharma Products</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div
            className="banner-1 h-100 d-flex" 
            style={{ backgroundImage: `url('/assets/images/bg_2.jpg')` }}
            >
              <div className="banner-1-inner ml-auto  align-self-center">
                <h2>Rated by Experts</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>   
        </>
    );
};

export default BannerFooter;