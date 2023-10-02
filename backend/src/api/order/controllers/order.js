'use strict';
require('dotenv').config();
// @ts-ignore
const stripe = require('stripe')(process.env.STRIPE_KEY, {
  apiVersion: '2022-11-15', 
});

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({strapi}) => ({
  async create(ctx){
    const { products } = ctx.request.body;

    const lineItems = products.map((product) => {
      return {
        price_data: {
          currency: 'sek',
          product_data: {   
            name: product.title,
            description: product.desc,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity, 
      };
    });

    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}?success=true`,
        cancel_url: `${process.env.CLIENT_URL}?success=false`,
        line_items: lineItems,
        shipping_address_collection: {
          allowed_countries: []
        },
        payment_method_types: ["card"],
      });

      await strapi.service('api::order.order').create({
        data: {
          products,
          stripeId: session.id, 
        },
      });

      return { stripeSession: session };
    } catch(err) {
      console.error('Stripe Error:', err);
      ctx.response.status = 500;
      return err;
    }
  },
}));
