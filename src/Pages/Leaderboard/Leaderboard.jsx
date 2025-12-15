import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PodiumCard from "../../Components/PodiumCard/PodiumCard";

const Leaderboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: leaderboard = [], isLoading } = useQuery({
        queryKey: ["leaderboard"],
        queryFn: async () => {
            const res = await axiosSecure.get("/leaderboard");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    const topThree = leaderboard.slice(0, 3);
    const restUsers = leaderboard.slice(3);

    const winRate = (wins, total) => {
        if (total === 0) return 0;
        return Math.round((wins / total) * 100);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Title */}
            <h1 className="text-4xl text-primary font-extrabold text-center mb-12">🏆 Leaderboard</h1>

            {/* ================= PODIUM ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-end">
                {/* 🥈 Second */}
                {topThree[1] && <PodiumCard user={topThree[1]} rank={2} scale="scale-95" bg="bg-gray-100" winRate={winRate} />}

                {/* 🥇 First */}
                {topThree[0] && <PodiumCard user={topThree[0]} rank={1} scale="scale-105" bg="bg-yellow-100" crown winRate={winRate} />}

                {/* 🥉 Third */}
                {topThree[2] && <PodiumCard user={topThree[2]} rank={3} scale="scale-90" bg="bg-orange-100" winRate={winRate} />}
            </div>

            {/* ================= TABLE ================= */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-4 px-4 text-left text-primary">Rank</th>
                            <th className="py-4 px-4 text-left text-primary">User</th>
                            <th className="py-4 px-4 text-center text-primary">Wins</th>
                            <th className="py-4 px-4 text-center text-primary">Participated</th>
                            <th className="py-4 px-4 text-center text-primary">Win Rate</th>
                        </tr>
                    </thead>

                    <tbody>
                        {restUsers.map((user, index) => (
                            <tr key={user._id} className="border-b last:border-none hover:bg-gray-50">
                                <td className="py-4 px-4 font-semibold text-secondary">{index + 4}</td>

                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <img src={user.photoURL} className="w-10 h-10 rounded-full" alt="" />
                                        <div>
                                            <p className="font-semibold text-primary">{user.displayName}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="py-4 px-4 text-center text-green-600 font-semibold">{user.winCount}</td>

                                <td className="py-4 px-4 text-center text-blue-600 font-semibold">{user.participatedCount}</td>

                                <td className="py-4 px-4 text-center font-bold text-accent">{winRate(user.winCount, user.participatedCount)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
