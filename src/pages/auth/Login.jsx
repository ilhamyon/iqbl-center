import { Button, Input, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { sanityClient } from "../../lib/sanity/getClient";
import { v4 as uuidv4 } from "uuid";
const logo = '/iqbal-center-black-logo.png';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already signed in
    const token = localStorage.getItem("iqbalCenterToken");
    if (token) {
      // If signed in, redirect to "/home"
      navigate("/home");
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
          email,
          type,
          password,
          umur,
          gender,
          alamat,
          faskes,
          tb,
          bb,
          keluhan,
          telepon,
          resiko
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
  console.log('cek data user: ', serverData)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
  
    // Cek apakah ada data yang cocok dengan hasil input login
    const user = serverData.data.find(
      (iqbalCenterData) => iqbalCenterData.email === username && iqbalCenterData.password === password
    );
  
    if (user) {
      // Filter data based on the user's _id
      const filteredData = serverData?.data.filter(item => item._id === user._id);
  
      // Login berhasil
      console.log("Login berhasil:", user.name);
      message.success('Login Berhasil');
      navigate("/home");
  
      // Generate token
      const token = uuidv4(); // Generate token using uuid library
  
      // Simpan token ke dalam local storage
      localStorage.setItem("iqbalCenterToken", token);
      localStorage.setItem("iqbalCenterUser", user.name);
      localStorage.setItem("iqbalCenterId", user._id);
      localStorage.setItem('iqbalCenterData', JSON.stringify(filteredData));
  
      // Tambahkan logika redirect atau set state untuk login di sini
    } else {
      // Tampilkan pesan error
      message.error("Username atau password salah");
    }
  };
    
  return (
    <>
      <section className="my-0 mx-auto min-h-full max-w-screen-sm bg-white">
        <div className="flex flex-col justify-between h-screen">
          <div className="flex justify-start p-8">
            <img src={logo} />
          </div>
          <div className="py-14 px-8 flex flex-col">
            <h2 className="text-[#001F3F] text-2xl font-semibold pb-16">Masuk dan mulai berbagi informasi</h2>
            <form className="w-full items-center" onSubmit={handleLogin} style={{ margin: '0 auto' }}>
              <label>Email</label>
              <Input
                type="text"
                placeholder="Email"
                size="large"
                className="mb-4 mt-2 border"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Kata Sandi</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kata Sandi"
                size="large"
                className="mb-2 mt-2 border"
              />
              {/* {error && <p className="text-red-500">{error}</p>} */}
              <div className="mb-8 text-xs">Lupa kata sandi</div>
              <Button
                className="text-white bg-[#001F3F] border-0 w-full"
                htmlType="submit"
                size="large"
                type="primary"
              >
                Masuk
              </Button>
              <p className="flex justify-center text-sm font-light mt-8 text-gray-500">
                <Link to="/register" className="text-gray-900"> Buat Akun</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login