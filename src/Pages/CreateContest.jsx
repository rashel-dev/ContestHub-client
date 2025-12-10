import React, { useState } from "react";
import { Upload, Calendar, DollarSign, Award, FileText, Type, X } from "lucide-react";
import { useForm } from "react-hook-form";

const CreateContest = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //image upload handler
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert("File size should be less than 2MB");
                return;
            }

            // Validate file type
            if (!file.type.startsWith("image/")) {
                alert("Please select an image file");
                return;
            }

            setSelectedImage(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        // Reset the file input
        const fileInput = document.getElementById("image-upload");
        if (fileInput) {
            fileInput.value = "";
        }
    };

    const handleContestCreation = (data) => {
        console.log(data);
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
                                className="w-full px-4 py-3 border text-secondary border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                        {errors.contestName && <p className="text-red-500 text-sm mt-2">Please enter a contest name</p>}

                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Upload className="w-4 h-4 mr-2" />
                                Contest banner
                            </label>
                            {!imagePreview ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition cursor-pointer">
                                    <input type="file" {...register("contestBanner", { required: true })} className="hidden" id="image-upload" accept="image/*" onChange={handleImageChange} />
                                    <label htmlFor="image-upload" className="cursor-pointer block">
                                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                                        <p className="text-gray-600 mb-1">Click to upload image</p>
                                        <p className="text-sm text-gray-400">PNG, JPG up to 2MB</p>
                                    </label>
                                </div>
                            ) : (
                                <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
                                    <img src={imagePreview} alt="Contest preview" className="w-full h-64 object-cover" />
                                    <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg">
                                        <X className="w-5 h-5" />
                                    </button>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">{selectedImage?.name}</div>
                                </div>
                            )}
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
                                className="w-full px-4 py-3 border text-secondary border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
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
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                className="w-full px-4 py-3 border text-secondary border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
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
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                className="w-full px-4 py-3 border text-secondary border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
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
                                className="w-full px-4 py-3 border text-secondary border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                            />
                            {errors.taskInstruction && <p className="text-red-500 text-sm mt-2">Please enter a task instruction</p>}
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">Contest Type</label>
                            <select
                                {...register("contestType", { required: true })}
                                className="w-full px-4 py-3 border text-secondary border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                            >
                                <option value="">Select contest type</option>
                                <option value="art">Education</option>
                                <option value="photography">Photography</option>
                                <option value="design">Design</option>
                                <option value="writing">Writing</option>
                                <option value="video">Video</option>
                                <option value="coding">Coding</option>
                                <option value="art">Gaming</option>
                                <option value="art">Entertainment</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.contestType && <p className="text-red-500 text-sm mt-2">Please select a contest type</p>}
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Calendar className="w-4 h-4 mr-2" />
                                Deadline
                            </label>
                            <input
                                {...register("deadline", { required: true })}
                                type="datetime-local"
                                className="w-full px-4 py-3 border text-secondary border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
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
