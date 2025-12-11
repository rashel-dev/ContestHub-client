import React from "react";
import { Calendar, DollarSign, Award, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const ContestCard = ({ contest }) => {
    const { _id, contestName, contestBanner, description, contestCategory, entryPrice, prizeAmount, deadline, participents } = contest;

    // Format deadline
    const formatDeadline = (date) => {
        const deadlineDate = new Date(date);
        return deadlineDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            {/* Contest Banner */}
            <div className="relative h-48 overflow-hidden">
                <img src={contestBanner} alt={contestName} className="w-full h-full object-cover" />
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">{contestCategory}</span>
                </div>
            </div>

            {/* Contest Details */}
            <div className="p-6">
                {/* Contest Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{contestName}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

                {/* Contest Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Entry Price */}
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <div>
                            <p className="text-xs text-gray-500">Entry Fee</p>
                            <p className="text-sm font-semibold text-gray-900">${entryPrice}</p>
                        </div>
                    </div>

                    {/* Prize Amount */}
                    <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-accent" />
                        <div>
                            <p className="text-xs text-gray-500">Prize</p>
                            <p className="text-sm font-semibold text-gray-900">${prizeAmount}</p>
                        </div>
                    </div>

                    {/* Participants */}
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <div>
                            <p className="text-xs text-gray-500">Participants</p>
                            <p className="text-sm font-semibold text-gray-900">{participents}</p>
                        </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-red-600" />
                        <div>
                            <p className="text-xs text-gray-500">Deadline</p>
                            <p className="text-sm font-semibold text-gray-900">{formatDeadline(deadline)}</p>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <Link to={`/contest/${_id}`}>
                    <button className="w-full bg-linear-to-r from-primary to-accent text-white font-semibold py-3 rounded-lg hover:from-primary/90 hover:to-accent/90 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ContestCard;
