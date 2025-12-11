import React from "react";
import { Upload, Calendar, DollarSign, Award, FileText, Type } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CreateContest = () => {
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const axiosSecure = useAxiosSecure();
    //create contest form submission handler
    const handleContestCreation = (data) => {
        // enter extra fields to the database
        data.entryPrice = Number(data.entryPrice);
        data.prizeAmount = Number(data.prizeAmount);
        data.creatorName = user?.displayName;
        data.creatorEmail = user?.email;
        data.createdAt = new Date();
        data.paymentStatus = "pending";
        data.participents = 0;
        data.approvalStatus = "pending";

        Swal.fire({
            title: "Are you sure to create this contest?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, create it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // save the contest info to the database
                axiosSecure
                    .post("/contests", data)
                    .then((res) => {
                        // console.log(res.data);
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Created!",
                                text: "Your contest has been created successfully.",
                                icon: "success",
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error creating contest:", error);
                    });
            }
        });
    };

    return (
        <div className="min-h-screen dark:bg-gray-600 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-primary mb-2">Create New Contest</h1>
                        <p className="text-gray-600">Fill in the details to launch your contest</p>
                    </div>

                    <form onSubmit={handleSubmit(handleContestCreation)} className="space-y-6">
                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Type className="w-4 h-4 mr-2" />
                                Contest Name
                            </label>
                            <input
                                type="text"
                                {...register("contestName", { required: true })}
                                placeholder="Enter contest name"
                                className="w-full px-4 py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                        {errors.contestName && <p className="text-red-500 text-sm mt-2">Please enter a contest name</p>}

                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Upload className="w-4 h-4 mr-2" />
                                Contest banner URL
                            </label>
                            <input
                                type="url"
                                {...register("contestBanner", { required: true })}
                                placeholder="Enter contest banner URL"
                                className="w-full px-4 py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                        {errors.contestBanner && <p className="text-red-500 text-sm mt-2">Please upload a contest banner</p>}

                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <FileText className="w-4 h-4 mr-2" />
                                Description
                            </label>
                            <textarea
                                {...register("description", { required: true })}
                                placeholder="Describe your contest"
                                rows="4"
                                className="w-full px-4 py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                            />
                        </div>
                        {errors.description && <p className="text-red-500 text-sm mt-2">Please enter a description</p>}

                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <DollarSign className="w-4 h-4 mr-2" />
                                Entry Price
                            </label>
                            <input
                                type="number"
                                {...register("entryPrice", { required: true })}
                                placeholder="00"
                                className="w-full px-4 py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                        {errors.entryPrice && <p className="text-red-500 text-sm mt-2">Please enter an entry price</p>}
                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Award className="w-4 h-4 mr-2" />
                                Prize Amount
                            </label>
                            <input
                                type="number"
                                {...register("prizeAmount", { required: true })}
                                placeholder="00"
                                className="w-full px-4 py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                        {errors.prizeAmount && <p className="text-red-500 text-sm mt-2">Please enter a prize amount</p>}

                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <FileText className="w-4 h-4 mr-2" />
                                Task Instruction
                            </label>
                            <textarea
                                {...register("taskInstruction", { required: true })}
                                placeholder="Provide detailed instructions for participants"
                                rows="4"
                                className="w-full px-4 py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                            />
                            {errors.taskInstruction && <p className="text-red-500 text-sm mt-2">Please enter a task instruction</p>}
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">Contest Type</label>
                            <select
                                {...register("contestCategory", { required: true })}
                                className="w-full px-4 py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                            >
                                <option value="">Select contest type</option>
                                <option value="Education">Education</option>
                                <option value="Photography">Photography</option>
                                <option value="Photography">Technology</option>
                                <option value="Design">Design</option>
                                <option value="Writing">Writing</option>
                                <option value="Video">Video</option>
                                <option value="Coding">Coding</option>
                                <option value="Gaming">Gaming</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.contestCategory && <p className="text-red-500 text-sm mt-2">Please select a contest type</p>}
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Calendar className="w-4 h-4 mr-2" />
                                Deadline
                            </label>
                            <Controller
                                control={control}
                                name="deadline"
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <DatePicker
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        minDate={new Date()}
                                        placeholderText="Select deadline date and time"
                                        className="w-full px-4 py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                                        wrapperClassName="w-full"
                                    />
                                )}
                            />
                            {errors.deadline && <p className="text-red-500 text-sm mt-2">Please select a deadline</p>}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-linear-to-r from-primary/70 to-accent text-white font-semibold py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-300 shadow-lg hover:shadow-xl"
                            >
                                Create Contest
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateContest;
