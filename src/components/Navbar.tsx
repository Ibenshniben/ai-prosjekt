export default function Navbar() {
  return (
    <nav className="w-full px-6 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-black dark:bg-white" />
          <span className="font-semibold">Next.js</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Showcase</a>
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Docs</a>
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Blog</a>
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Templates</a>
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Enterprise</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg">
          <span className="text-sm text-gray-500 dark:text-gray-400">⌘K</span>
          <input type="text" placeholder="Search documentation..." className="bg-transparent border-none outline-none text-sm w-64" />
        </div>
        <button className="px-3 py-1 text-sm bg-black text-white dark:bg-white dark:text-black rounded-lg">Deploy</button>
        <button className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-800 rounded-lg">Learn</button>
      </div>
    </nav>
  );
}