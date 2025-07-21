import {Webhook} from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import {Purchase} from "../models/Purchase.js";
import Course from "../models/Course.js";

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

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

export const stripeWebhooks = async(request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = Stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;
      
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId
      })

      const {purchaseId} = session.data[0].metadata;

      const purchaseData = await Purchase.findById(purchaseId)
      const userData = await User.findById(purchaseData.userId)
      const courseData = await Course.findById(purchaseData.courseId.toString())

      courseData.enrolledStudents.push(userData)
      await courseData.save()
      userData.enrolledCourses.push(courseData._id)
      await userData.save()

      purchaseData.status = 'completed'
      await purchaseData.save();
      break;
    }



    case 'payment_method.failed':{
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;
      
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId
      })

      const {purchaseId} = session.data[0].metadata;
      const purchaseData = await Purchase.findById(purchaseId)
      purchaseData.status = 'failed'
      await purchaseData.save();

      break;
    }
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
}