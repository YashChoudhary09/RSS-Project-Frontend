import img from './assets/rss-flag.png';

export default function Navbaar() {
    return (
        <div className="w-full h-20 bg-orange-500 flex items-center justify-between px-6 shadow-md border-b-4 border-orange-700">
            {/* Left Flag */}
            <div className="h-12 w-12 bg-white rounded-full p-1 shadow-md">
                <img src={img} alt="RSS-flag" className="h-full w-full object-contain" />
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide drop-shadow-md">
                Rastriya Swayamsevak Sangh
            </h3>

            {/* Right Flag */}
            <div className="h-12 w-12 bg-white rounded-full p-1 shadow-md">
                <img src={img} alt="RSS-flag" className="h-full w-full object-contain" />
            </div>
        </div>
    );
}
