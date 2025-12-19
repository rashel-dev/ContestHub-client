import { Trophy, Target, Crown } from "lucide-react";

const PodiumCard = ({ user, rank, bg, scale, crown, winRate, className }) => {
    return (
        <div className={`${bg} ${scale} ${className || ""} transform transition-all duration-300 hover:scale-105 md:hover:scale-110 rounded-2xl shadow-xl p-4 md:p-6 text-center relative w-full`}>
            {crown && <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500" size={40} />}

            <img src={user.photoURL} className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto ring-4 ring-white mb-4 object-cover" alt="" />

            <h3 className="text-lg md:text-xl font-bold text-primary truncate">{user.displayName}</h3>
            <p className="text-xs md:text-sm text-gray-500 mb-4 truncate">{user.email}</p>

            <div className="flex justify-center gap-3 md:gap-6 mb-4">
                <div className="flex items-center gap-1 text-green-600 font-semibold text-sm md:text-base">
                    <Trophy size={18} /> {user.winCount}
                </div>
                <div className="flex items-center gap-1 text-blue-600 font-semibold text-sm md:text-base">
                    <Target size={18} /> {user.participatedCount}
                </div>
            </div>

            <p className="font-bold text-base md:text-lg text-primary">Win Rate: {winRate(user.winCount, user.participatedCount)}%</p>

            <div className="mt-3 text-xl md:text-2xl font-extrabold">
                {rank === 1 && "🥇"}
                {rank === 2 && "🥈"}
                {rank === 3 && "🥉"}
            </div>
        </div>
    );
};

export default PodiumCard;
