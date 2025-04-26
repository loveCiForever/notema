const Footer = () => {
  return (
    <footer className="bg-gray-800  text-white py-8 px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
      <div>
        <h2 className="font-bold mb-2">About Us</h2>
        <p>Authenticated anime store since 2025..</p>
      </div>
      <div>
        <h2 className="font-bold mb-2">Contact</h2>
        <p>📍TDTU, Tan Phong, District 7, HCMC</p>
        <p>📞 0898672000</p>
        <p>✉ support@anime.vn</p>
      </div>
      <div>
        <h2 className="font-bold mb-2">Policy</h2>
        <p>Return Policy</p>
        <p>Privacy Policy</p>
      </div>
      <div>
        <h2 className="font-bold mb-2">Follow Us</h2>
        <p>🔗 <a href="">FaceBook</a> | <a href="">TikTok</a> | <a href="">YouTube</a></p>
      </div>
      
    </footer>
  );
};

export default Footer;
