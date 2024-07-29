import { duration } from "moment";

export default[
    {
        link: '#', // No link needed for free plan
        price: 0.00,
        priceId: 'free_plan',
        duration: 'Free Trial',
        offering: [
            {
                value: "Create 10 Mock Interview"
            },
            {
                value: "Only access to your own questions"
            },
        ]
    },
    {
        link: 'https://buy.stripe.com/test_fZecMS5phf4D25OeUW',
        price:3.55,
        priceId:'price_1PhyN1RvF9kmNHODoAqsAwy9',
        duration: 'Monthly',
        offering:[
            {
                value:" Create Unlimited Mock Interview"
            },
            {
                value:"Unlimited Retake Interview"
            },
            {
                value:" Access to Practise Questions Section"
            },
            {
                value:"Email Support"   
            }
        ]
    },
]