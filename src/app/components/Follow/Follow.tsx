"use client";
import React, { useEffect, useState } from "react";

const FollowButton = () => {

    const [isFollowing, setIsFollowing] = useState(false);
    
    const followingStyle = "bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300";
    const nonFollowingStyle = "bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-700";

    return(
        <button 
        className={isFollowing ? followingStyle : nonFollowingStyle}
        onClick={() => setIsFollowing(!isFollowing)}
        >
            {isFollowing ? "Following" : "Follow"}
        </button>
    )
}

export default FollowButton;
