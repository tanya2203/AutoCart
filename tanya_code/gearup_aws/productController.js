const Product = require("../models/productModel.js");

exports.addProduct = async (req, res, next) => {
    try{
        if(req.files == ""){
           return res.status(200).json({status:0, message:'Image Must not be Empty',data:[]})
        }
        let data = {...req.body,productImage:req.files};
        let pdata = await Product.create({ 
                                          productName			: data.productName,
                                          price					: data.price,
                                          Category			    : data.Category,
                                          productDescription	: data.productDescription,
                                          productQuantity       : data.productQuantity,
                                          productImage 			: data.productImage,
                                        //   categoryId            : req.body.categoryId,
                                        //   merchantId            : req.body.merchantId
                                          } );
        if(pdata != ""){
        	return res.status(200).json({status:1, message:'Product Submited Succesfully',data:pdata})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : [] })
        }
    	
    }catch(error){
        console.log(error)
    }
};

exports.getProduct = async (req, res, next) => {
    try{
            let data = await Product.find({is_deleted: 0})
            if(data != "") {
                return res.status(200).json({status: 1, message: 'Product Details fetched success!', data: data})
            }
            return res.status(200).json({status: 0, message: 'data Not Found!', data: []})
        }
        catch(error){
            console.log(error)
            return res.status(200).json({status: 0, message: 'try again later!'})
        }
};


exports.getProductById = async (req, res, next) => {
    try{
            let data = await Product.find({_id: req.body.productId, is_deleted: 0})
            if(data != "") {
                return res.status(200).json({status: 1, message: 'Product Details fetched success!', data: data})
            }
            return res.status(200).json({status: 0, message: 'data Not Found!', data: []})
        }
        catch(error){
            console.log(error)
            return res.status(200).json({status: 0, message: 'try again later!'})
        }
};

exports.getProductByCategory = async (req, res, next) => {
    try{
            let data = await Product.find({CategoryId: req.body.CategoryId, is_deleted: 0})
            if(data != "") {
                return res.status(200).json({status: 1, message: 'Product Details fetched success!', data: data})
            }
            return res.status(200).json({status: 0, message: 'data Not Found!', data: []})
        }
        catch(error){
            console.log(error)
            return res.status(200).json({status: 0, message: 'try again later!'})
        }
};

exports.getProductByMerchant = async (req, res, next) => {
    try{
            let data = await Product.find({merchantId: req.body.merchantId, is_deleted: 0})
            if(data != "") {
                return res.status(200).json({status: 1, message: 'Product Details fetched success!', data: data})
            }
            return res.status(200).json({status: 0, message: 'data Not Found!', data: []})
        }
        catch(error){
            console.log(error)
            return res.status(200).json({status: 0, message: 'try again later!'})
        }
};

exports.deleteProduct=async (req,res)=>{
     let  data = await Product.findOneAndUpdate({_id : req.body.productId,is_deleted:0 },{is_deleted:1});
     if(data){
            return res.status(200).json({status:1, message:"Product Deleted succesfully", data:{}}) 
     }else{
         return res.status(200).json({status:0, message:"Data Not Found", data:[]})
     }
}

exports.updateProduct = async (req, res, next) => {
    try{
        // let images = req.body.images;
        if( req.files != undefined){
            console.log(":Test,=")
            productImage = req.files;
        }
        if(productImage != ""){
        	let data = await Product.findOneAndUpdate({_id:req.body.productId},{ 
                                          productName			: req.body.productName,
                                          price					: req.body.price,
                                          Category   			: req.body.Category,
                                          productDescription	: req.body.productDescription,
                                          productQuntity    	: req.body.productQuntity,
                                          productImage 			: productImage,
                                          status                : req.body.status,
                                        //   categoryId            : req.body.categoryId,
                                        //   merchantId            : req.body.merchantId                         	                                         
                                          } );
        if(data != ""){
            return res.status(200).json({status:1, message:'Product Updated Succesfully',data:data})
        }
        return res.status(200).json({status:0, message:'Data Not Found',data:[]})
    }else{
    	let data = await Product.findOneAndUpdate({_id:req.body.productId},{ 
                                            productName			: req.body.productName,
                                            price				: req.body.price,
                                            Category   			: req.body.Category,
                                            productDescription	: req.body.productDescription,
                                            productQuntity    	: req.body.productQuntity,
                                            productImage 		: productImage,
                                            status              : req.body.status                                        	
                                          } );
        if(data != ""){
            return res.status(200).json({status:1, message:'Product Updated Succesfully',data:data})
        }
        return res.status(200).json({status:0, message:'Data Not Found',data:[]})
    }
        
    }catch(error){
        console.log(error)
    }
};
