import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { message, Skeleton } from "antd";
import { sanityClient } from "../lib/sanity/getClient";
import moment from "moment";
const logo = '/user_photo_null.png';
const ImgRelawan = '/relawan.png';
const ImgPilkada = '/pilkada.png';
const ImgOrganisasi = '/organisasi.png';

function Home() {
  const navigate = useNavigate();
  const iqbalCenterId = (localStorage.getItem('iqbalCenterId'));
  // const iqbalCenterUser = (localStorage.getItem('iqbalCenterUser'));
  console.log('cek id user: ', iqbalCenterId)

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    if (!isAuthenticated()) {
      // If not authenticated, redirect to the sign-in page
      message.error("Kamu belum login. Silahkan login terlebir dahulu!");
      navigate("/");
    }
  }, [navigate]);

  const [serverDataUser, setServerDataUser] = useState({
    data: [],
    error: null,
    loading: true,
  });

  useEffect(() => {
    async function fetchSanityData() {
      try {
        const sanityData = await sanityClient.fetch(`*[_type == 'user-iqbalcenter']{
          _id,
          name,
          role,
          "imageURL":mainImage.asset->url,
          posisi,
        }`);

        // Filter the data array based on iqbalCenterId
        const filteredData = sanityData.filter(item => item._id === iqbalCenterId);

        setServerDataUser({
          data: filteredData,
          error: null,
          loading: false,
        });
      } catch (error) {
        setServerDataUser({
          data: [],
          error: 'Error getting data. Please try again later.',
          loading: false,
        });
      }
    }

    fetchSanityData();
  }, []);
  console.log('cek user: ', serverDataUser)

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
    <>
      <section className="my-0 mx-auto min-h-full text-[#112340] max-w-screen-sm h-screen border-x border-gray-200">
        {!serverDataUser?.data[0]?.name ? (
          <div className="px-4 py-4">
            <Skeleton active />
          </div>
        ) : (
          <div className="py-6 px-4 flex items-center">
            <div className="px-0">
              <img className="h-16 w-16 rounded-full object-cover" src={ serverDataUser?.data[0]?.imageURL ||logo} width={50}/>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl px-4 font-semibold">{serverDataUser?.data[0]?.name}</h3>
              <p className="text-sm font-light text-gray-400 px-4">{serverDataUser?.data[0]?.posisi}</p>
            </div>
          </div>
        )}

        <div>
          <h2 className="px-4 py-4 text-xl font-semibold mb-2">Hi, teman-teman relawan<br/>
          apa kabar hari ini?</h2>
        </div>

        <div className="grid grid-cols-3 gap-2 px-4 py-6">
          <div className="flex flex-col gap-4 bg-[#EDFCFD] p-3 rounded-lg">
            <div className="flex justify-center items-center rounded-full bg-[#C5E2F0] w-16 h-16 p-2">
              <img src={ImgPilkada} className="h-10" />
            </div>
            <div>
              <p className="font-light text-sm">Hasil Pilkada</p>
              <p className="font-semibold text-sm">NTB 2024</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-[#EDFCFD] p-3 rounded-lg">
            <div className="flex justify-center items-center rounded-full bg-[#C5E2F0] w-16 h-16 p-2">
              <img src={ImgRelawan} className="h-7" />
            </div>
            <div>
              <p className="font-light text-sm">Organisasi</p>
              <p className="font-semibold text-sm">Relawan</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-[#EDFCFD] p-3 rounded-lg">
            <div className="flex justify-center items-center rounded-full bg-[#C5E2F0] w-16 h-16 p-2">
              <img src={ImgOrganisasi} className="h-10" />
            </div>
            <div>
              <p className="font-light text-sm">Pengurus</p>
              <p className="font-semibold text-sm">Organisasi</p>
            </div>
          </div>
        </div>

        <h2 className="px-4 text-xl font-bold py-2 mt-4">News</h2>
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
              {serverData.data.map((blog, index) => (
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
      </section>
    </>
  )
}

export default Home