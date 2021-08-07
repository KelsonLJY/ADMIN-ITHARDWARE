const router=require('express').Router()
const Order=require('../model/Order')
const OrderItem=require('../model/OrderItem')
const isAuth = require('../middleware/auth').isAuth;

const mongoose=require('mongoose');

router.post('/api/change-status', isAuth, async (req,res)=>{
    const order = req.body;
    await Order.updateOne({_id : order._id}, {$set: { status: order.status }});
   
    let orders = await Order.find({status : 'Pending'}).sort({ ordered_date: 'desc' }).populate({
        path: 'userId',
        model: 'User'
    });
    res.send({
        orders : orders
    })
        
    
}).get('/api/get-orders', isAuth, async (req,res)=>{
    const order = req.query;
    
    let orders = await Order.find({status : order.status}).sort({ ordered_date: 'desc' }).populate({
        path: 'userId',
        model: 'User'
    });
    return res.status(200).send(orders)
})


module.exports=router;