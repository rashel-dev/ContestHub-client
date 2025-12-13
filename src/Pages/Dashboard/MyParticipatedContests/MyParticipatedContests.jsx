import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyParticipatedContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading } = useQuery({
        queryKey: ["myParticipatedContests", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-participated-contests?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-primary">My Participated Contests : {data.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Payment Status</th>
                            <th>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.contestName}</td>
                                <td>{item.status}</td>
                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParticipatedContests;
