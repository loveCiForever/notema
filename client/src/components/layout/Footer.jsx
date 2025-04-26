import logo from "../../assets/logo/logo.png";
const Footer = () => {
  return (
    <footer className="bg-gray-800  text-white py-8 px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
     <div className="w-[200px] cursor-pointer">
        <img src={logo} alt="" />
      </div>
      <div>
        <h2 className="font-bold mb-2">About Us</h2>
        <p>Web programming project</p>
      </div>
      <div>
        <h2 className="font-bold mb-2">Contact</h2>
        <p>📍TDTU, Tan Phong, District 7, HCMC</p>
        <p>📞 0898672000</p>
        <p>✉ support@notema.vn</p>
      </div>
      <div>
        <h2 className="font-bold mb-2">Follow Us</h2>
        <p>
          🔗 <a href="">FaceBook</a> | <a href="">TikTok</a> |{" "}
          <a href="">YouTube</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
