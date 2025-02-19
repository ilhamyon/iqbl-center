import { Button, Input, message, Select, Skeleton } from "antd"
import { useEffect, useState } from "react";
import { sanityClient } from "../../lib/sanity/getClient";
import { isAuthenticated } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
const logo = '/user_photo_null.png';

function Relawan() {
    const navigate = useNavigate();
    // const iqbalCenterData = JSON.parse(localStorage.getItem('iqbalCenterData'));
    const iqbalCenterId = (localStorage.getItem('iqbalCenterId'));
    console.log('cek id user: ', iqbalCenterId)

    useEffect(() => {
      // Check if the user is authenticated when the component mounts
      if (!isAuthenticated()) {
        // If not authenticated, redirect to the sign-in page
        message.error("Kamu belum login. Silahkan login terlebir dahulu!");
        navigate("/");
      }
    }, [navigate]);
    
    const [serverData, setServerData] = useState({
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
            karir,
            minat,
            posisi,
            slug,
            "imageURL":mainImage.asset->url,
          }`);
  
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
    console.log('cek relawan: ', serverData)
    return (
      <div className="my-0 mx-auto min-h-full max-w-screen-sm bg-white">
        <div className="relative rounded-b-3xl py-2 bg-[#112340] text-white">
            <h2 className="text-xl text-center px-4 py-4">Daftar Relawan</h2>
            <div onClick={() => navigate("/home")} className="absolute left-5 top-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 12H4m0 0l6-6m-6 6l6 6"/></svg>
            </div>
        </div>
        <div className="py-4 px-4">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2">
              <Input placeholder="Nama relawan" size="large" />
              <Select
                showSearch
                placeholder="Pekerjaan"
                optionFilterProp="label"
                size="large"
                className="w-full"
                options={[
                  {
                    value: 'pengajar',
                    label: 'Pengajar',
                  },
                  {
                    value: 'pengusaha',
                    label: 'Pengusaha',
                  },
                  {
                    value: 'fotografer',
                    label: 'Fotografer',
                  },
                ]}
              />
            </div>
            <Button type="primary" size="large" className="bg-[#112340]">Cari</Button>
          </div>
        </div>
        <div className="mt-4">
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
              {serverData.data.map((relawan, index) => (
                <Link key={index} to={`/detail-relawan/${relawan?.slug?.current}`}>
                  <div className="relative px-4 flex items-center border-b border-gray-200 py-3">
                    <div className="px-0">
                      <img className="rounded-full w-14 h-14 object-cover" src={relawan?.imageURL || logo}/>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-xl px-4 font-semibold">{relawan?.name}</h3>
                      <p className="text-sm font-light text-gray-400 px-4">{relawan?.posisi}</p>
                    </div>
                    <div className="absolute right-5 top-6 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15"><path fill="none" stroke="currentColor" strokeLinecap="square" d="m5 14l7-6.5L5 1" strokeWidth="1"/></svg>
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
  
  export default Relawan