const router = require("express").Router();
const Order = require("../models/Order");

const{
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAdmin
} = require("./verifyToken");

    router.post("/",verifyToken,async(req,res)=>{
    const newOrder = new Order(req.body)
    try{
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
    });

    //update
     router.put("/:id",verifyTokenAdmin,async(req,res)=>{
        try{
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,{
                    $set:req.body,
                },{ new :true }
            ); 
            res.status(200).json(updatedOrder);
        }catch(err){
            res.status.json(500)(err);
        }
        });

        // delete 
        router.delete("/:id",verifyTokenAdmin,async(req,res)=>{
            try{
                await Order.findByIdAndDelete(req.params.id);
                res.status(200).json("order product deleted");
            }catch(err){
                res.status(500).json(err);
            }
        });    

        // get user orders

        router.get("/find/:userId",verifyTokenAndAuthorization,async(req,res)=>{
            try{
                const orders = await Order.find({userId: req.params.userId});
                res.status(200).json(orders);
            }catch(err){
                res.status(500).json(err);

            }
        });

        //get all 

        router.get("/",verifyTokenAdmin,async(req,res)=>{
            try{
           const orders = await Order.find();
           res.status(200).json(orders);

            }catch(err){
                res.status(500).json(err);

            }
        }); 

        //GET MONTHLY INCOME
        router.get("/income", verifyTokenAdmin, async (req, res) => {
            const date = new Date();
            const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
            const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
        
            try {
                const income = await Order.aggregate([
                    {
                        $match: { createdAt: { $gte: previousMonth.toISOString() } }
                    },
                    {
                        $project: {
                            month: { $month: "$createdAt" },
                            sales: "$amount",
                        },
                    },
                    {
                        $group: {
                            _id: "$month",
                            total: { $sum: "$sales" },
                        },
                    },
                ]);
        
                res.status(200).json(income);
            } catch (err) {
                console.error("Error fetching income:", err);
                res.status(500).json({ error: "Failed to fetch income data" });
            }
        });
         
            

module.exports = router; 