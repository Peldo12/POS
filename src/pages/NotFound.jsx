import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh flex flex-col justify-center items-center bg-gray-50 select-none">
      <h1 className="text-9xl font-extrabold text-gray-300 tracking-widest">404</h1>
      <div className="bg-blue-600 px-2 text-sm rounded rotate-12 absolute text-white shadow-lg">
        Page Not Found
      </div>
      
      <p className="mt-8 text-gray-600 text-center px-4">
        Waduh, halaman yang lu cari kayaknya nggak ada di sistem kita nih bang.
      </p>
      
      <button 
        onClick={() => navigate("/products")} // Arahin balik ke dashboard/products
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors active:scale-95"
      >
        Balik ke Dashboard
      </button>
    </div>
  );
};

export default NotFound;
