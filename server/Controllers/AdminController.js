import bcrypt from "bcrypt";
import Stripe from "stripe";
import AdminModel from "../Models/AdminModel.js";
import workSpaceModel from "../Models/WrokSpace.js";


const stripe = new Stripe(process.env.STRIPE_PUBLISHABLE_KEY, {
    apiVersion: "2022-11-15",
  });
export const signUp = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
       
        const user = await AdminModel.create({

            email,
            password,
          

        });
        res.status(202).json({
            status: 202,
            data: {
                _id: user._id,
                email: user.email,
                
            },
            message:"successfull"


        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

export const addCompanyDetails = async (req, res) => {
    const {
        _id,
        firstName,
        lastName,
        workSpaceName,
        userName,
        email
    } = req.body;
    
    try {
        const customer = await stripe.customers.create(
            {
                email,
                description: `${firstName} ${lastName}`,
            },
            {
                apiKey: process.env.STRIPE_SECRET_KEY,
            }
        );
    
        const addCompanyDetails = await AdminModel.updateOne({
            _id
        }, {
            $set: {
                firstName,
                lastName,
                workSpaceName,
                userName,
                email,
                stripeCutomerId: customer.id
            },
        });
        const workSpace = await workSpaceModel.create({
          workSpaceName,
      
        

      });
        if (addCompanyDetails.acknowledged) {
            res.status(202).json({
                status: 202,
                message: "workspace details are added successfully",
                data: { stripeCutomerId: customer.id ,workSpace:workSpace._id}
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }

}

export const addBillingAddress = async (req, res) => {
    const {
        _id,
        billingAddress,
        country,
        state,
        postalcode,
        discountCode,
        referralCode,
        city
    } = req.body;
    try {
    const addCompanyDetails = await workSpaceModel.updateOne({
        _id
    }, {
        $set: {
            billingAddress,
            country,
            state,
            city,
            postalcode,
            discountCode,
            referralCode
        },
    });
   
    if (addCompanyDetails.acknowledged) {
        res.status(202).json({message:"Billing Address are added successfully"})
    }
} catch (error) {
    res.status(404).json({
        message: error.message
    });
}
}

export const addSubscription = async (req, res) => {
  const user = await AdminModel.findOne({ email: req.body.email })


    const session = await stripe.checkout.sessions.create(
      {
        mode: "subscription",
        payment_method_types: ["card","link"],
        line_items: [
          {
            price: process.env.PRICE_ID,
            quantity: 1,
          },
        ],
        subscription_data: {
          trial_period_days: 14,
        },
        success_url: `http://localhost:5000/adminupload?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:5000/login?session_id={CHECKOUT_SESSION_ID}`,
        customer: user.stripeCutomerId,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );
  
    return res.json(session);
 
  };
  

  export const stripeTokenCheck = async (req, res) => {
    const stripeSecretKeyInstance = Stripe(process.env.STRIPE_SECRET_KEY);
  
    const token_id = req.body.token_id;
  
  
    try {
      const token = await stripeSecretKeyInstance.checkout.sessions.retrieve(token_id);
      if (token.used) {
        // Token has already been used
        res.status(202).json({ message: "invalidToken" });
        // req.session.adminSubscribed=false
      } else {
        try {
          const user = await AdminModel.findByIdAndUpdate(
            req.body.adminID,
            { subscribed: true },
         
          );
        //   req.session.adminSubscribed = true
        //   req.session.adminID = user._id.toString();
      
          if (!user) {
            res.status(202).send(user);
          } else {
            res.status(202).json({ message: "validToken" });
          }
        } catch (error) {
          res.status(404).json({ error: error.message });
        }
    
        // req.session.adminSubscribed=true
      }
    } catch (e) {
      // Invalid token ID
      console.log("Error: " + e.message);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
  

    try {
      const user = await AdminModel.findOne({ email });
      
      if (!user) {
        res.status(202).send({ message: "email" });
        
      } else {
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
  

         
            res.status(202).send(user);
       
        } else {
          res.status(202).send({ message: "incorrect password password" });
        }
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };