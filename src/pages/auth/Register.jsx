import { Button, Input, Select, message } from "antd"
import { Link } from "react-router-dom"
import { useState } from "react";
const logo = '/iqbal-center-black-logo.png';

const createSanityUser = async (iqbalCenterData) => {
  // eslint-disable-next-line no-unused-vars
  const { Option } = Select;
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
            create: {
              _type: 'user-iqbalcenter', // Ganti dengan jenis dokumen pengguna di Sanity Anda
              name: iqbalCenterData.name,
              email: iqbalCenterData.email,
              password: iqbalCenterData.password,
              type: iqbalCenterData.type,
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
    console.error('Error creating user:', error);
  }
};

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: 'User',
    umur: ''
  });

  console.log(formData);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      // Send POST request to your Sanity backend to create a new user
      await createSanityUser(formData);

      message.success("Register berhasil.")

      // Reset the form after successful registration
      setFormData({
        name: '',
        email: '',
        password: '',
        type: '',
      });
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
  return (
    <>
      <section className="my-0 mx-auto min-h-full max-w-screen-sm bg-white">
        <div className="flex flex-col justify-between h-screen">
          <div className="flex justify-start p-8">
            <img src={logo} />
          </div>
          <div className="lg:py-10 py-14 flex items-center">
            <form className="w-full px-8 items-center" onSubmit={handleSubmit}>
              <label>Nama</label>
              <Input
                type="text"
                name="name"
                placeholder="Nama"
                size="large"
                className="mb-4 mt-2 border"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <label>Pekerjaan</label>
              <Input
                type="text"
                name="name"
                placeholder="Pekerjaan"
                size="large"
                className="mb-4 mt-2 border"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <label>Email</label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                size="large"
                className="mb-4 mt-2 border"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <label>Kata Sandi</label>
              <Input
                type="password"
                name="password"
                placeholder="Kata Sandi"
                size="large"
                className="mb-8 mt-2 border"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <Button
                className="text-white bg-[#001F3F] border-0 w-full"
                htmlType="submit"
                size="large"
                type="primary"
              >
                Daftar Akun
              </Button>
              <p className="flex justify-center text-sm font-light mt-8 text-gray-500">
                <Link to="/" className="text-gray-800"> Masuk</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register