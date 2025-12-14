import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ContestParticipants = () => {
    const { contestId } = useParams();
    const axiosSecure = useAxiosSecure();

    const {data: contestParticipants = []} = useQuery({
        queryKey: ['contestPaticipants', contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest-registrations/${contestId}`)
            return res.data;
        }
    })


    return (
        <div className='p-4'>
            <h2>Contest Submissions page : {contestParticipants.length}</h2>
        </div>
    );
};

export default ContestParticipants;