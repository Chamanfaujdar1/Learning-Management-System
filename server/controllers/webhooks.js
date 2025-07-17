import {Webhook} from "svix";
import User from "../models/User.js";

// API Controller Function to manage Clerk User with databse

export const clerkWebhooks = async (req, res) => {
    try{
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const {data, type} = req.body;

        console.log(data)

        if(type==='user.created'){
            const userData = {
                _id:data.id,
                name:data.first_name + " " + data.last_name,
                email:data.email_addresses[0].email_address,
                imageUrl:data.image_url,
            }
            console.log("User Created:", userData);

            await User.create(userData);
            return res.json({
                success: true,
                message: "User created successfully",
                data: userData
            })
        }else if(type==='user.updated'){
            const userData = {
                _id:data.id,
                name:data.first_name + " " + data.last_name,
                email:data.email_addresses[0].email_address,
                imageUrl:data.image_url,
            }
            console.log("User Updated:", userData);
            await User.updateOne({ _id: data.id }, { $set: userData });
            return res.json({
                success: true,
                message: "User updated successfully",
                data: userData
                })
        } else if(type==='user.deleted'){
            console.log("User Deleted:", data.id);
            await User.deleteOne({ _id: data.id });
            return res.json({
                success: true,
                message: "User deleted successfully",
            })
        }
        return res.status(400).json({
            success: false,
            message: "Invalid event type"
        });
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}