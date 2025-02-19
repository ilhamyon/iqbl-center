import { Link, useLocation } from "react-router-dom";

function BottomMenu() {
  const location = useLocation();

  // Fungsi untuk menentukan kelas aktif berdasarkan rute
  const isActive = (pathname) => {
    return location.pathname === pathname ? 'active' : '';
  };
  console.log('cek path:', location.pathname);
  return (
    <>
        <nav className="fixed bottom-0 border-t border-x border-gray-250 w-full bg-gray-100 shadow-lg max-w-screen-sm z-50">
            <ul className="flex justify-around py-2">
                <li className={`nav-item ${isActive('/home')}`}>
                    <Link to="/home" className={`flex flex-col text-sm items-center text-gray-500 ${isActive('/home') && 'text-sky-900'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M13.228 2.688a2 2 0 0 0-2.456 0l-8.384 6.52C1.636 9.795 2.05 11 3.003 11H4v8a2 2 0 0 0 2 2h4v-6a2 2 0 1 1 4 0v6h4a2 2 0 0 0 2-2v-8h.997c.952 0 1.368-1.205.615-1.791z"/></g></svg>
                        Beranda
                    </Link>
                </li>
                <li className={`nav-item ${isActive('/artikel')}`}>
                    <Link to="/artikel" className={`flex flex-col text-sm items-center text-gray-500 ${isActive('/artikel') && 'text-sky-900'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="currentColor" d="M16.75 4a2.25 2.25 0 0 1 2.245 2.096L19 6.25V17.5a.5.5 0 0 0 .992.09L20 17.5V7.014a2.25 2.25 0 0 1 1.994 2.072L22 9.25v7.5a3.25 3.25 0 0 1-3.066 3.245L18.75 20H5.25a3.25 3.25 0 0 1-3.245-3.066L2 16.75V6.25a2.25 2.25 0 0 1 2.096-2.245L4.25 4zm-7.502 7h-3.5a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75m6.004 3.5h-2.498l-.102.007A.75.75 0 0 0 12.754 16h2.498l.102-.007a.75.75 0 0 0-.102-1.493m-6.754-2v2h-2v-2zM15.25 11l-2.498.005l-.102.006a.75.75 0 0 0 .104 1.494l2.499-.005l.101-.007A.75.75 0 0 0 15.251 11m.001-3.496H5.748l-.102.007a.75.75 0 0 0 .102 1.493h9.504l.102-.006a.75.75 0 0 0-.102-1.494"/></svg>
                        News
                    </Link>
                </li>
                <li className={`nav-item ${isActive('/relawan')}`}>
                    <Link to="/relawan" className={`flex flex-col text-sm items-center text-gray-500 ${isActive('/relawan') && 'text-sky-900'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 2h3.75a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-3v1.018A7 7 0 0 1 19 13h.75A2.25 2.25 0 0 1 22 15.25v6a.75.75 0 0 1-.75.75H14a.25.25 0 0 1-.25-.25v-3a.5.5 0 0 0-.5-.5h-2.5l-.034.001A5.51 5.51 0 0 0 9.5 12.725v-.975a.75.75 0 0 0-1.486-.143a5.5 5.5 0 0 0-2.725-.603A7.01 7.01 0 0 1 11 6.071V2.75a.75.75 0 0 1 .75-.75m3.75 11.75v-2a.75.75 0 0 0-1.5 0v2a.75.75 0 0 0 1.5 0m-3-2a.75.75 0 0 0-1.5 0v2a.75.75 0 0 0 1.5 0zm6.5 7v-2.5a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0M5.5 21a4.5 4.5 0 0 0 2.607-.832l2.613 2.612a.75.75 0 1 0 1.06-1.06l-2.612-2.613A4.5 4.5 0 1 0 5.5 21m0-1.5a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/></svg>
                        Relawan
                    </Link>
                </li>
                <li className={`nav-item ${isActive('/profile')}`}>
                    <Link to="/profile" className={`flex flex-col text-sm items-center text-gray-500 ${isActive('/profile') && 'text-sky-900'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 32 32"><path fill="none" d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0M20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5"/><path fill="currentColor" d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.899 13.899 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3c.28.304.568.596.87.87c.092.084.187.162.28.242c.32.276.649.538.99.782c.044.03.084.069.128.1v-.012a13.901 13.901 0 0 0 16 0v.012c.044-.031.083-.07.128-.1c.34-.245.67-.506.99-.782c.093-.08.188-.159.28-.242c.302-.275.59-.566.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0"/></svg>
                        Profil
                    </Link>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default BottomMenu