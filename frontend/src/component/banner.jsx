// import React from 'react'

// export default function Banner() {
//   return (
//     <div className="sec-banner bg0 p-t-80 p-b-50">
//   <div className="container">
//     <div className="row">
//       <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
//         {/* Block1 */}
//         <div className="block1 wrap-pic-w">
//           <img src="images/banner-01.jpg" alt="IMG-BANNER" />
//           <a href="product.html" className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
//             <div className="block1-txt-child1 flex-col-l">
//               <span className="block1-name ltext-102 trans-04 p-b-8">
//                 Women
//               </span>
//               <span className="block1-info stext-102 trans-04">
//                 Spring 2018
//               </span>
//             </div>
//             <div className="block1-txt-child2 p-b-4 trans-05">
//               <div className="block1-link stext-101 cl0 trans-09">
//                 Shop Now
//               </div>
//             </div>
//           </a>
//         </div>
//       </div>
//       <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
//         {/* Block1 */}
//         <div className="block1 wrap-pic-w">
//           <img src="images/banner-02.jpg" alt="IMG-BANNER" />
//           <a href="product.html" className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
//             <div className="block1-txt-child1 flex-col-l">
//               <span className="block1-name ltext-102 trans-04 p-b-8">
//                 Men
//               </span>
//               <span className="block1-info stext-102 trans-04">
//                 Spring 2018
//               </span>
//             </div>
//             <div className="block1-txt-child2 p-b-4 trans-05">
//               <div className="block1-link stext-101 cl0 trans-09">
//                 Shop Now
//               </div>
//             </div>
//           </a>
//         </div>
//       </div>
//       <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
//         {/* Block1 */}
//         <div className="block1 wrap-pic-w">
//           <img src="images/banner-03.jpg" alt="IMG-BANNER" />
//           <a href="product.html" className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
//             <div className="block1-txt-child1 flex-col-l">
//               <span className="block1-name ltext-102 trans-04 p-b-8">
//                 Accessories
//               </span>
//               <span className="block1-info stext-102 trans-04">
//                 New Trend
//               </span>
//             </div>
//             <div className="block1-txt-child2 p-b-4 trans-05">
//               <div className="block1-link stext-101 cl0 trans-09">
//                 Shop Now
//               </div>
//             </div>
//           </a>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>


//   )
// }




import React, { useState, useEffect } from 'react';

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/banners', {
          headers: {
            Authorization: 'Bearer 2|B2NGCsT1Q4wZHaJJTUsmQTqckvwlPNtN4SJIuHMI38e136d1',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch banners');
        }

        const data = await response.json();
        setBanners(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="sec-banner bg0 p-t-80 p-b-50">
      <div className="container">
        <div className="row">
          {banners.map((banner) => (
            <div key={banner.id} className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src={banner.images} alt="IMG-BANNER" />
                <a href="product.html" className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      {banner.title}
                    </span>
                    <span className="block1-info stext-102 trans-04">
                      {banner.description}
                    </span>
                  </div>
                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}