import { Button, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sanityClient } from "../lib/sanity/getClient";
import { deauthUser, isAuthenticated } from "../utils/auth";
const logo = '/user_photo_null.png';

const { Option } = Select;

function Profile() {
    const navigate = useNavigate();
    const iqbalCenterData = JSON.parse(localStorage.getItem('iqbalCenterData'));
    const iqbalCenterId = (localStorage.getItem('iqbalCenterId'));
    console.log('cek id user: ', iqbalCenterId)
    const [editVisible, setEditVisible] = useState(false);

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

    const fetchSanityData = async () => {
      try {
        const sanityData = await sanityClient.fetch(`*[_type == 'user-iqbalcenter']{
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

        // Filter the data array based on iqbalCenterId
        const filteredData = sanityData.filter(item => item._id === iqbalCenterId);

        setServerData({
          data: filteredData,
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

    useEffect(() => {
      fetchSanityData();
    }, []);
    console.log('cek biodata: ', serverData)

    const updateSanityUser = async (iqbalCenterData) => {
      try {
        const response = await fetch(`https://ln9ujpru.api.sanity.io/v2021-03-25/data/mutate/production`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer skAdQo8vEzaH81Ah4n2X8QDNsgIfdWkJlLmbo3CbT6Nt3nW7iTLx2roYCOm9Rlp1mQV2nEEGCqf4aGSMaJx67iK5PZPe7CgmI9Lx9diRdq0ssoRzl1LhiUFXHQmKu0utxgBa1ttoKwat3KIFt2B5vskrT82ekR5B8sbSzE51VjZHy3T7Q62P`,
          },
          body: JSON.stringify({
            mutations: [
              {
                patch: {
                  id: iqbalCenterId, // The _id of the document to update
                  set: {
                    name: iqbalCenterData.name,
                    posisi: iqbalCenterData.posisi,
                    imageURL: iqbalCenterData.imageURL,
                    alamat: iqbalCenterData.alamat,
                    telepon: iqbalCenterData.telepon,
                    pendidikan: iqbalCenterData.pendidikan,
                    riwayatKarir: iqbalCenterData.riwayatKarir,
                    karir: iqbalCenterData.karir,
                    skill: iqbalCenterData.skill,
                    minat: iqbalCenterData.minat,
                  },
                },
              },
            ],
          }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to create user in Sanity');
        }
    
        const data = await response.json();
        console.log('User created:', data);
      } catch (error) {
        console.error('Error update user:', error);
      }
    };

    const [formUpdate, setFormUpdate] = useState({
      name: "",
      imageURL: "",
      posisi: "",
      alamat: "",
      telepon: "",
      pendidikan: "",
      riwayatKarir: "",
      karir: "",
      skill: [],
      minat: [],
    });

    useEffect(() => {
      setFormUpdate({
        name: serverData?.data[0]?.name || "",
        imageURL: serverData?.data[0]?.imageURL || "",
        posisi: serverData?.data[0]?.posisi || "",
        alamat: serverData?.data[0]?.alamat || "",
        telepon: serverData?.data[0]?.telepon || "",
        pendidikan: serverData?.data[0]?.pendidikan || "",
        riwayatKarir: serverData?.data[0]?.riwayatKarir || "",
        karir: serverData?.data[0]?.karir || "",
        skill: serverData?.data[0]?.skill || [],
        minat: serverData?.data[0]?.minat || [],
      });
    }, [serverData]);

    const handleUpdateChange = (e) => {
      const { name, value } = e.target;
      setFormUpdate({ ...formUpdate, [name]: value });
    };

    const handleSkillChange = (value) => {
      setFormUpdate({ ...formUpdate, skill: value });
    };

    const handleMinatChange = (value) => {
      setFormUpdate({ ...formUpdate, minat: value });
    };

    async function handleSubmit(event) {
      event.preventDefault();
      try {
        // Send POST request to your Sanity backend to create a new user
        await updateSanityUser(formUpdate);

        message.success("Update biodata berhasil.")
        fetchSanityData();

      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
    return (
      <div className="my-0 mx-auto min-h-full max-w-screen-sm bg-white mb-16">
        <div className="relative rounded-b-3xl py-2 bg-[#112340] text-white">
          <h2 className="text-xl text-center px-4 py-4">Profil</h2>
          <div onClick={() => navigate("/home")} className="absolute left-5 top-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 12H4m0 0l6-6m-6 6l6 6"/></svg>
          </div>
        </div>

        {!editVisible && (
          <div className="py-6">
            <div className="relative px-4 flex items-center py-3 mb-4">
              <div className="px-0">
                <img className="rounded-full w-24 h-24 object-cover" src={serverData?.data[0]?.imageURL || logo}/>
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl px-4 font-semibold">{iqbalCenterData[0]?.name}</h3>
                <p className="text-sm font-light text-gray-400 px-4">{serverData?.data[0]?.posisi}</p>
              </div>
              <div onClick={() => setEditVisible(true)} className="absolute right-5 top-10 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"/></svg>
              </div>
            </div>

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
            <div onClick={deauthUser} className="text-[#112340] text-center pt-6">Keluar</div>
          </div>
        )}

        {editVisible && (
          <div className="py-10 pb-32">
            <form className="px-4 items-center" onSubmit={handleSubmit}>
              <h2 className="font-bold text-[18px] lg:text-4xl mb-10 text-gray-900 uppercase">Biodata <br/><span className="text-xl">({iqbalCenterData[0]?.name})</span></h2>
              <Input
                type="text"
                name="name"
                placeholder="Nama"
                size="large"
                className="mb-4 border"
                value={formUpdate.name}
                onChange={handleUpdateChange}
                required
              />
              <Input
                type="text"
                name="alamat"
                placeholder="Alamat"
                size="large"
                className="mb-4 border"
                value={formUpdate.alamat}
                onChange={handleUpdateChange}
                required
              />
              <Select
                // defaultValue="Laki-laki"
                name="posisi"
                size="large"
                className="mb-4 w-full"
                placeholder="Posisi Dalam Tim"
                required
                value={formUpdate.posisi || undefined}
                onChange={(value) => setFormUpdate({ ...formUpdate, posisi: value })}
              >
                <Option value="Korkab">Korkab</Option>
                <Option value="Korcam">Korcam</Option>
                <Option value="Relawan">Relawan</Option>
              </Select>
              <Input
                type="text"
                name="telepon"
                placeholder="Nomor Telepon"
                size="large"
                className="mb-4 border"
                value={formUpdate.telepon}
                onChange={handleUpdateChange}
              />
              <Input
                type="text"
                name="pendidikan"
                placeholder="Pendidikan (Strata, Jurusan)"
                size="large"
                className="mb-4 border"
                value={formUpdate.pendidikan}
                onChange={handleUpdateChange}
              />
              <Input
                type="text"
                name="riwayatKarir"
                placeholder="Riwayat Pekerjaan"
                size="large"
                className="mb-4 border"
                value={formUpdate.riwayatKarir}
                onChange={handleUpdateChange}
              />
              <Input
                type="text"
                name="karir"
                placeholder="Pekerjaan Saat Ini"
                size="large"
                className="mb-4 border"
                value={formUpdate.karir}
                onChange={handleUpdateChange}
              />
              {/* <Input
                type="text"
                name="skill"
                placeholder="Keahlian"
                size="large"
                className="mb-4 border"
                value={formUpdate.skill}
                onChange={handleUpdateChange}
              /> */}
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                className="mb-4"
                size="large"
                placeholder="Pilih Keahlian"
                name="skill"
                value={formUpdate.skill || []} // Pastikan ada default array agar tidak error
                onChange={handleSkillChange} // Menggunakan handler khusus
                options={[
                  { value: "Public Speaking", label: "Public Speaking" },
                  { value: "IT", label: "IT" },
                  { value: "Fotografi", label: "Fotografi" },
                  { value: "Analisis Data", label: "Analisis Data" },
                  { value: "Bahasa Inggris", label: "Bahasa Inggris" },
                  { value: "Sablon", label: "Sablon" },
                ]}
              />
              {/* <Input
                type="text"
                name="minat"
                placeholder="Minat/Hobi"
                size="large"
                className="mb-8 border"
                value={formUpdate.minat}
                onChange={handleUpdateChange}
              /> */}
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: '100%',
                }}
                className="mb-4"
                size="large"
                placeholder="Pilih Keahlian"
                // defaultValue={['a10', 'c12']}
                name="minat"
                value={formUpdate.minat}
                onChange={handleMinatChange}
                options={[
                  {
                    value: 'Musik',
                    label: 'Musik',
                  },
                  {
                    value: 'Renang',
                    label: 'Renang',
                  },
                  {
                    value: 'Fotografi',
                    label: 'Fotografi',
                  },
                  {
                    value: 'Sepak Bola',
                    label: 'Sepak Bola',
                  },
                  {
                    value: 'Badminton',
                    label: 'Badminton',
                  },
                  {
                    value: 'Golf',
                    label: 'Golf',
                  },
                ]}
              />
              <Button
                className="text-white bg-[#112340] w-full"
                htmlType="submit"
                size="large"
              >
                Simpan
              </Button>
            </form>
            <div className="px-4 py-4">
              <div onClick={() => setEditVisible(false)} className="text-[#112340] text-center">Kembali</div>
            </div>
          </div>
        )}
      </div>
    )
  }
  
  export default Profile