import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages, } from '../redux/messageSlice';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (selectedUser?._id) {
            // Dispatch the async action instead of fetching here directly
            dispatch(fetchMessages(selectedUser._id));
        }
    }, [selectedUser?._id, dispatch]);
}

export default useGetMessages