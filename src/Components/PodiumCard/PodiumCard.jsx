import { Trophy, Target, Crown } from "lucide-react";

const PodiumCard = ({ user, rank, bg, scale, crown, winRate }) => {
    return (
        <div className={`${bg} ${scale} transform transition-all duration-300 hover:scale-110 rounded-2xl shadow-xl p-6 text-center relative`}>
            {crown && <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500" size={40} />}

            <img src={user.photoURL} className="w-24 h-24 rounded-full mx-auto ring-4 ring-white mb-4 object-cover" alt="" />

            <h3 className="text-xl font-bold text-primary">{user.displayName}</h3>
            <p className="text-sm text-gray-500 mb-4">{user.email}</p>

            <div className="flex justify-center gap-6 mb-4">
                <div className="flex items-center gap-1 text-green-600 font-semibold">
                    <Trophy size={18} /> {user.winCount}
                </div>
                <div className="flex items-center gap-1 text-blue-600 font-semibold">
                    <Target size={18} /> {user.participatedCount}
                </div>
            </div>

            <p className="font-bold text-lg text-primary">Win Rate: {winRate(user.winCount, user.participatedCount)}%</p>

            <div className="mt-3 text-2xl font-extrabold">
                {rank === 1 && "🥇"}
                {rank === 2 && "🥈"}
                {rank === 3 && "🥉"}
            </div>
        </div>
    );
};

export default PodiumCard;
