import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";
import { sanityClient } from "../../lib/sanity/getClient";
import { Skeleton } from "antd";
import moment from "moment";

function Artikel() {
  const navigate = useNavigate();
  const [serverData, setServerData] = useState({
    data: [],
    error: null,
    loading: true,
  });

  useEffect(() => {
    async function fetchSanityData() {
      try {
        const sanityData = await sanityClient.fetch(`*[_type == 'post']{
          _id,
          title,
          slug,
          excerpt,
          author->{name},
          "imageURL":mainImage.asset->url,
          categories,
          publishedAt,
        }| order(publishedAt desc)`);

        setServerData({
          data: sanityData,
          error: null,
          loading: false,
        });
      } catch (error) {
        setServerData({
          data: [],
          error: 'Error getting data. Please try again later.',
          loading: false,
        });
      }
    }

    fetchSanityData();
  }, []);
  console.log('cek news: ', serverData)
  return (
    <div className="my-0 mx-auto min-h-full max-w-screen-sm bg-white">
      <div className="relative rounded-b-3xl py-2 bg-[#112340] text-white">
          <h2 className="text-xl text-center px-4 py-4">News</h2>
          <div onClick={() => navigate("/home")} className="absolute left-5 top-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 12H4m0 0l6-6m-6 6l6 6"/></svg>
          </div>
      </div>
      <div className="text-[#112340]">
        <div className="pb-6">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true, el: '.swiper-pagination', dynamicBullets: false }}
            modules={[Pagination]}
            className="py-6 px-4 relative"
          >
            {serverData.loading ? (
              <div className="px-4">
                <Skeleton active />
              </div>
              ) : serverData.error ? (
                <p>{serverData.error}</p>
              ) : serverData.data.length === 0 ? (
                <p className="p-10">No data yet</p>
              ) : (
              <>
                {serverData.data.slice(0, 2).map((blog, index) => (
                  <SwiperSlide key={index}>
                    <Link to={`/news-detail/${blog?.slug?.current}`}>
                      <div>
                        <img
                          className="rounded-2xl w-full h-48 object-cover"
                          src={blog?.imageURL}
                          alt="News"
                        />
                      </div>
                      <div className="mt-2">
                        <h2 className="text-xl font-semibold line-clamp-2">
                          {blog?.title}
                        </h2>
                        <p className="text-sm text-gray-400">{moment(blog?.publishedAt).format('LL')}</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </>
            )}
            <div className="swiper-pagination absolute left-0 right-0"></div>
          </Swiper>
        </div>
        <div className="flex flex-col gap-3 pb-20">
          {serverData.loading ? (
            <div className="px-4">
              <Skeleton active />
            </div>
            ) : serverData.error ? (
              <p>{serverData.error}</p>
            ) : serverData.data.length === 0 ? (
              <p className="p-10">No data yet</p>
            ) : (
            <>
              {serverData.data.slice(2).map((blog, index) => (
                <Link key={index} to={`/news-detail/${blog?.slug?.current}`}>
                <div className="grid grid-cols-3 border-b py-2">
                  <div className="col-span-2 flex flex-col gap-2 px-4">
                    <h2 className="text-lg font-semibold line-clamp-2">{blog?.title}</h2>
                    <p className="text-sm text-gray-400">{moment(blog?.publishedAt).format('LL')}</p>
                  </div>
                  <div className="px-4">
                    <img className="rounded-2xl w-40 h-20 object-cover" src={blog?.imageURL} />
                  </div>
                </div>
              </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Artikel