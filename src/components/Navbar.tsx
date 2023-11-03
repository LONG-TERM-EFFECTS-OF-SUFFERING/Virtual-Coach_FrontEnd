const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2 bg-sky-700 shadow-md">
      <a href="/" className="text-xl font-bold flex items-center text-white">
        Virtual-Coach
      </a>
      <ul className="flex items-center justify-end gap-4 text-slate-400">
        <li>
          <a href="/home" className="hover:text-white">
            Home
          </a>
        </li>
        <li>
          <a href="/about" className="hover:text-white">
            About
          </a>
        </li>
        <li>
          <a href="/contact" className="hover:text-white">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
