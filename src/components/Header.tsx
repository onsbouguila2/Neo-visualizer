const Header = () => {
  return (
    <header className="bg-[#030432] text-center  flex justify-between items-center">
            <img src="../public/Header-right-img.png" alt="Cover" className="w-35 h-auto " />
      <div className="flex items-center gap-4 p-4">
        <h2 className="text-4xl font-bold text-white ms-5">Neo Visualizer APP</h2>
      </div>
      <img src="../public/Header-left-img.png" alt="Cover" className="w-70 h-auto " />
    </header>
  );
};

export default Header;
