// const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;
const STRIPE_PUBLISHABLE_KEY = "pk_test_51OstCOSH5L7QSLzEMqB7HaHjZzTKPjpDsjcx0krYLpxpQZEqbieLG39jdi2BYstBq1u2aIQw94F18p8PZcFmwJzk00qJtjLU12";
const STRIPE_SECRET_KEY = "sk_test_51OstCOSH5L7QSLzEwfJY1Z1uySdaJ0kDpMvFkuuRUxf4Lm3irDCtvhlx50bDF7yJUSoEVyhJvjyS6EUOiinwt7sT0021yHqhe1";
const stripe = require('stripe')(STRIPE_SECRET_KEY)

const renderBuyPage = async(req,res)=>{

    try {
        
        res.render('buy', {
            key: STRIPE_PUBLISHABLE_KEY,
            amount:250
         })

    } catch (error) {
        console.log(error.message);
    }

}

const payment = async(req,res)=>{

    try {

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Harshal malaviya',
        address: {
            line1: 'bajarang nagar jasdan',
            postal_code: '360050',
            city: 'Rajkot',
            state: 'Gujrat',
            country: 'India',
        }
    })
    .then((customer) => {
 
        return stripe.charges.create({
            amount: req.body.amount,     // amount will be amount*100
            description: req.body.productName,
            currency: 'INR',
            customer: customer.id
        });
        
    })
    .then((charge) => {
        res.redirect("/success")
        // res.redirect("/")
    })
    .catch((err) => {
        res.redirect("/failure")
    });


    } catch (error) {
        console.log(error.message);
    }

}

const success = async(req,res)=>{

    try {
        
        res.render('success');

    } catch (error) {
        console.log(error.message);
    }

}

const failure = async(req,res)=>{

    try {
        
        res.render('failure');

    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    renderBuyPage,
    payment,
    success,
    failure
}