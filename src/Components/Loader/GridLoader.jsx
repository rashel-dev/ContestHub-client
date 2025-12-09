import React from "react";
import { GridLoader as Spinner } from "react-spinners";

const GridLoader = () => {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
            <Spinner color="#fe881b" />
        </div>
    );
};

export default GridLoader;
