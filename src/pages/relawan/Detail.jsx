import { Button, Skeleton } from "antd"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sanityClient } from "../../lib/sanity/getClient";
const logo = '/user_photo_null.png';

function Profile() {
    const navigate = useNavigate();
    const params = useParams();
        const id = String(params.id)
    const [serverData, setServerData] = useState({
        data: [],
        error: null,
        loading: true,
    });
    
    useEffect(() => {
        async function fetchSanityData() {
        try {
            const sanityData = await sanityClient.fetch(`*[_type == 'user-iqbalcenter' && slug.current == "${id}"]{
                _id,
                name,
                email,
                role,
                password,
                "imageURL":mainImage.asset->url,
                posisi,
                alamat,
                telepon,
                pendidikan,
                riwayatKarir,
                karir,
                skill,
                minat
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
    console.log('cek relawan detail: ', serverData)
    return (
        <div className="my-0 mx-auto min-h-full max-w-screen-sm bg-white mb-20">
            <div className="relative rounded-b-3xl py-2 bg-[#112340] text-white">
                <h2 className="text-xl text-center px-4 py-4">Detail Relawan</h2>
                <div onClick={() => navigate("/relawan")} className="absolute left-5 top-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 12H4m0 0l6-6m-6 6l6 6"/></svg>
                </div>
            </div>

            <div className="py-6">
                {!serverData?.data[0]?.name ? (
                <div className="px-4 py-4">
                    <Skeleton active />
                </div>
                ) : (
                    <div className="relative px-4 flex items-center py-3 mb-4">
                        <div className="px-0">
                            <img className="rounded-full w-24 h-24 object-cover" src={serverData?.data[0]?.imageURL || logo}/>
                        </div>
                        <div className="flex flex-col px-4">
                            <h3 className="text-xl font-semibold">{serverData?.data[0]?.name}</h3>
                            <p className="text-sm font-light text-gray-400 -mt-1">{serverData?.data[0]?.posisi}</p>
                            <a href={`https://wa.me/${serverData?.data[0]?.telepon}`}><Button className="mt-1">Kontak</Button></a>
                        </div>
                    </div>
                )}

                <div>
                    <div className="py-4 bg-gray-200 text-gray-500 px-4">Bio</div>
                    <div className="px-4 py-3 border-b">
                        <div className="text-xs text-gray-400">Nama</div>
                        <div className="font-semibold">{serverData?.data[0]?.name}</div>
                    </div>
                    <div className="px-4 py-3 border-b">
                        <div className="text-xs text-gray-400">Alamat</div>
                        <div className="font-semibold">{serverData?.data[0]?.alamat}</div>
                    </div>
                    <div className="px-4 py-3 border-b">
                        <div className="text-xs text-gray-400">Posisi Dalam Tim</div>
                        <div className="font-semibold">{serverData?.data[0]?.posisi}</div>
                    </div>
                    <div className="px-4 py-3 border-b">
                        <div className="text-xs text-gray-400">Nomor Handphone</div>
                        <div className="font-semibold">{serverData?.data[0]?.telepon}</div>
                    </div>
                    <div className="px-4 py-3 border-b">
                        <div className="text-xs text-gray-400">Pendidikan (Strata, Jurusan)</div>
                        <div className="font-semibold">{serverData?.data[0]?.pendidikan}</div>
                    </div>
                    <div className="py-4 bg-gray-200 text-gray-500 px-4">Karir dan Minat</div>
                    <div className="px-4 py-3 border-b">
                        <div className="text-xs text-gray-400">Riwayat Pekerjaan</div>
                        <div className="font-semibold">{serverData?.data[0]?.riwayatKarir}</div>
                    </div>
                    <div className="px-4 py-3 border-b">
                        <div className="text-xs text-gray-400">Pekerjaan Saat Ini</div>
                        <div className="font-semibold">{serverData?.data[0]?.karir}</div>
                    </div>
                    <div className="px-4 py-3 border-b">
                        <div className="text-xs text-gray-400">Keahlian</div>
                        <div className="font-semibold">{serverData?.data[0]?.skill?.join(", ")}</div>
                    </div>
                    <div className="px-4 py-3 border-b">
                        <div className="text-xs text-gray-400">Minat/Hobi</div>
                        <div className="font-semibold">{serverData?.data[0]?.minat?.join(", ")}</div>
                    </div>
                    </div>
            </div>
        </div>
    )
}

export default Profile