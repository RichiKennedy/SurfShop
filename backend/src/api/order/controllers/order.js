'use strict';

const { createCoreController } = require('@strapi/strapi/lib/factories');

require('dotenv').config();

// @ts-ignore
const stripe = require('stripe')(process.env.STRIPE_KEY, {
  apiVersion: '2022-11-15',
});

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const { products, userID, guest, userName, userEmail } = ctx.request.body;

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
      let user = null;
      if (!guest) {
        user = await strapi.query('plugin::users-permissions.user').findOne({
          where: { id: userID },
        });
        if (!user) {
          return ctx.badRequest('User not found');
        }
      }

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}?success=true`,
        cancel_url: `${process.env.CLIENT_URL}?success=false`,
        line_items: lineItems,
        shipping_address_collection: {
          allowed_countries: [],
        },
        payment_method_types: ["card"],
      });

      const newOrderData = {
        products,
        stripeId: session.id,
        guest,
      };

      if (user) {
        newOrderData.user = userID;
        newOrderData.users_permissions_user = userID;
        newOrderData.userName = user.username;
        newOrderData.userEmail = user.email;
      } else if (guest) {
        newOrderData.userName = userName;
        newOrderData.userEmail = userEmail;
      }

      const newOrder = await strapi.service('api::order.order').create({
        data: newOrderData,
      });

      return { stripeSession: session, order: newOrder };
    } catch (err) {
      console.error('Stripe Error:', err);
      ctx.response.status = 500;
      return err;
    }
  },

  async findUserOrders(ctx) {
    const { userID } = ctx.params;

    try {
      const userOrders = await strapi.service('api::order.order').find({
        filters: { user: userID },
      });

      return userOrders;
    } catch (err) {
      console.error('Error fetching user orders:', err);
      ctx.response.status = 500;
      return err;
    }
  },
}));
