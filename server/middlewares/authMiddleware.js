import { clerkClient } from "@clerk/express";

//Middleware (Protect Educator Routes)

const protectEducator = async (req, resizeBy, next) => {
    try{
        const userId = req.auth.userId; // Assuming userId is available in req.auth
        const response = await clerkClient.users.getUser(userId);

        if(response.publicMetadata.role !== 'educator'){
            return resizeBy.json({
                success: false,
                message: "Unauthorized Access"
            })
        }

        next();
    }
    catch(error){
        resizeBy.json({
            success: false,
            message: error.message
        })
    }
}

export {
    protectEducator
}