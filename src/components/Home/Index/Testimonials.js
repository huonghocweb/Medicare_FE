import React from 'react';

const Testimonials = () => {
    return (
        <>
          <div className="site-section">
            <div className="container">
                <div className="row">
                <div className="title-section text-center col-12">
                    <h2 className="text-uppercase">Testimonials</h2>
                </div>
                </div>
                <div className="row">
                <div className="col-md-12 block-3 products-wrap">
                    <div className="nonloop-block-3 no-direction owl-carousel">
                
                    <div className="testimony">
                        <blockquote>
                        <img src="images/person_1.jpg" alt="Image" className="img-fluid w-25 mb-4 rounded-circle"/>
                        <p>&ldquo;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo omnis voluptatem consectetur quam tempore obcaecati maiores voluptate aspernatur iusto eveniet, placeat ab quod tenetur ducimus. Minus ratione sit quaerat unde.&rdquo;</p>
                        </blockquote>

                        <p>&mdash; Kelly Holmes</p>
                    </div>
                
                    <div className="testimony">
                        <blockquote>
                        <img src="images/person_2.jpg" alt="Image" className="img-fluid w-25 mb-4 rounded-circle"/>
                        <p>&ldquo;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo omnis voluptatem consectetur quam tempore
                            obcaecati maiores voluptate aspernatur iusto eveniet, placeat ab quod tenetur ducimus. Minus ratione sit quaerat
                            unde.&rdquo;</p>
                        </blockquote>
                    
                        <p>&mdash; Rebecca Morando</p>
                    </div>
                
                    <div className="testimony">
                        <blockquote>
                        <img src="images/person_3.jpg" alt="Image" className="img-fluid w-25 mb-4 rounded-circle"/>
                        <p>&ldquo;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo omnis voluptatem consectetur quam tempore
                            obcaecati maiores voluptate aspernatur iusto eveniet, placeat ab quod tenetur ducimus. Minus ratione sit quaerat
                            unde.&rdquo;</p>
                        </blockquote>
                    
                        <p>&mdash; Lucas Gallone</p>
                    </div>
                
                    <div className="testimony">
                        <blockquote>
                        <img src="images/person_4.jpg" alt="Image" className="img-fluid w-25 mb-4 rounded-circle" />
                        <p>&ldquo;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo omnis voluptatem consectetur quam tempore
                            obcaecati maiores voluptate aspernatur iusto eveniet, placeat ab quod tenetur ducimus. Minus ratione sit quaerat
                            unde.&rdquo;</p>
                        </blockquote>
                    
                        <p>&mdash; Andrew Neel</p>
                    </div>
                
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className="site-section bg-secondary bg-image ">
            <div className="container">
                <div className="row align-items-stretch">
                <div className="col-lg-6 mb-5 mb-lg-0">
                    <a href="#" className="banner-1 h-100 d-flex" >
                    <div className="banner-1-inner align-self-center">
                        <h2>Pharma Products</h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                        </p>
                    </div>
                    </a>
                </div>
                <div className="col-lg-6 mb-5 mb-lg-0">
                    <a href="#" className="banner-1 h-100 d-flex">
                    <div className="banner-1-inner ml-auto  align-self-center">
                        <h2>Rated by Experts</h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                        </p>
                    </div>
                    </a>
                </div>
                </div>
            </div>
        </div>  
        </>
    );
};

export default Testimonials;