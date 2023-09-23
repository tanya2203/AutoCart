const Dashboard = require("../models/dashboardModel");
const Product = require("../models/productModel.js");
const fs = require("fs")
const {URL} = require('../config/config')
const path = require("path")
exports.getAllDashboardData = async(req,res) => {
    try{
        let getData = await Dashboard.find()
        if(getData != ""){
        	return res.status(200).json({status:1, message:'Users data',data:getData})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    	
    }catch(error){
        console.log(error)
    }
}

exports.getAllDashboardDataForUser = async(req,res) => {
    try{
        // let resArray = {}
        let getData = await Dashboard.find().populate('todayDeal').populate('weekDeal').populate('monthDeal').populate('bestCategory')
        // resArray.bannerImage = getData[0].bannerImage
        // if(req.body.todayDeal == 1){
        //     resArray.todayDeal = getData[0].todayDeal
        // }
        // if(req.body.weekDeal == 2){
        //     resArray.weekDeal = getData[0].weekDeal
        // }
        // if(req.body.monthDeal == 3){
        //     resArray.monthDeal = getData[0].monthDeal
        // }
        // if(req.body.bestCategory == 4){
        //     resArray.bestCategory = getData[0].bestCategory
        // }
        if(getData != ""){
        	return res.status(200).json({status:1, message:'Users data',data:getData})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    	
    }catch(error){
        console.log(error)
    }
}
exports.addBanner = async (req, res) => {
    try {
        let bannerImages = req.body.bannerImage;
        let data = await Dashboard.findOne({});

        // Check if data is null or undefined
        if (!data) {
            // Handle the case where data is null or undefined, e.g., by creating a new Dashboard document
            data = new Dashboard();
        }

        for (let i = 0; i < bannerImages.length; i++) {
            const base64Data = bannerImages[i].path.replace(/^data:image\/png;base64,/, '');
            const fileName = Date.now() + i + '.png';
            const filePath = path.join(__dirname, '../public/banner_images', fileName);

            // Create the directory if it doesn't exist
            const directory = path.dirname(filePath);
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
            }

            fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
            const dbFilePath = URL + '/banner_images/' + fileName;

            // Make sure data.bannerImage is initialized as an array
            if (!Array.isArray(data.bannerImage)) {
                data.bannerImage = [];
            }

            data.bannerImage.push({ path: dbFilePath });
        }

        const saveImg = await data.save();

        if (saveImg) {
            return res.status(200).json({ status: 1, message: 'Banner Images Uploaded Successfully', data: data });
        } else {
            return res.status(401).json({ code: 200, status: 0, message: 'Try Again', data: {} });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
};


exports.deleteBanner = async (req, res) => {
    try {
        let bannerPath = req.body.bannerPath;
        const data = await Dashboard.findOne({});

        if (data.bannerImage.length > 0) {
            for (let i = 0; i < data.bannerImage.length; i++) {
                if (data.bannerImage[i].path === bannerPath) {
                    // Check if the filename property exists
                    if (data.bannerImage[i].filename) {
                        // Delete the file using an absolute path
                        const filePathToDelete = path.join(__dirname, '../public/banner_images', data.bannerImage[i].filename);
                        fs.unlinkSync(filePathToDelete);

                        // Remove the item from the array
                        data.bannerImage.splice(i, 1);
                        break;
                    } else {
                        return res.status(500).json({ code: 200, status: 0, message: 'Filename not found for banner image', data: {} });
                    }
                }
            }

            let deleteImg = await data.save();

            if (deleteImg) {
                return res.status(200).json({ status: 1, message: 'Banner Image deleted successfully' });
            } else {
                return res.status(401).json({ code: 200, status: 0, message: 'Try Again', data: {} });
            }
        } else {
            return res.status(401).json({ code: 200, status: 0, message: 'Banner Image not found', data: {} });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
};



exports.addTodayDeal = async(req,res) => {
    try{
        let productId = req.body.productId;
        const data = await Dashboard.findOne({})
        data.todayDeal.push(productId)
        let dataSave = await data.save()
        if(dataSave != ""){
        	return res.status(200).json({status:1, message:'done',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
};

exports.deleteTodayDeal = async(req,res) => {
    try{
        let productId = req.body.productId;
        let data = await Dashboard.findOne({})
        for(var i in data.todayDeal){
            if(data.todayDeal[i]== productId.toString()){
                data.todayDeal.splice(i,1);
                break;
            }
        }
        let saveData = await data.save()
        if(saveData != ""){
        	return res.status(200).json({status:1, message:'done',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
}

exports.addWeekDeal = async(req,res) => {
    try{
        let productId = req.body.productId;
        const data = await Dashboard.findOne({})
        data.weekDeal.push(productId)
        let dataSave = await data.save()
        if(dataSave != ""){
        	return res.status(200).json({status:1, message:'Week deal added Succesfully',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
};

exports.deleteWeekDeal = async(req,res) => {
    try{
        let productId = req.body.productId;
        let data = await Dashboard.findOne({})
        for(var i in data.weekDeal){
            if(data.weekDeal[i]== productId.toString()){
                data.weekDeal.splice(i,1);
                break;
            }
        }
        let saveData = await data.save()
        if(saveData != ""){
        	return res.status(200).json({status:1, message:'Week deal deleted Succesfully',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
}

exports.addMonthDeal = async(req,res) => {
    try{
        let productId = req.body.productId;
        const data = await Dashboard.findOne({})
        data.monthDeal.push(productId)
        let dataSave = await data.save()
        if(dataSave != ""){
        	return res.status(200).json({status:1, message:'month deal added Succesfully',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
};

exports.deleteMonthDeal = async(req,res) => {
    try{
        let productId = req.body.productId;
        let data = await Dashboard.findOne({})
        for(var i in data.monthDeal){
            if(data.monthDeal[i]== productId.toString()){
                data.monthDeal.splice(i,1);
                break;
            }
        }
        let saveData = await data.save()
        if(saveData != ""){
        	return res.status(200).json({status:1, message:'Week deal deleted Succesfully',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
}

exports.addBestCategory = async(req,res) => {
    try{
        let categoryId = req.body.categoryId;
        const data = await Dashboard.findOne({})
        data.bestCategory.push(categoryId)
        let dataSave = await data.save()
        if(dataSave != ""){
        	return res.status(200).json({status:1, message:'month deal added Succesfully',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
};

exports.deleteBestCategory = async(req,res) => {
    try{
        let categoryId = req.body.categoryId;
        let data = await Dashboard.findOne({})
        for(var i in data.bestCategory){
            if(data.bestCategory[i]== categoryId.toString()){
                data.bestCategory.splice(i,1);
                break;
            }
        }
        let saveData = await data.save()
        if(saveData != ""){
        	return res.status(200).json({status:1, message:'Week deal deleted Succesfully',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
}

exports.getPackages = async(req, res) => {
    try{
        let getPackages = await Product.find({categoryId: "642e88afd1c59e38142eeb69"}).populate('merchantId',['merchantName', 'city', 'state', 'address'])
        if(getPackages){
            return res.status(200).json({status:0, message:"Packages Found Successfully", data:getPackages})
        }else{
            return res.status(200).json({status:0, message:"No Packages Found!"})
        }
    }catch(error){
        console.log(error)
    }
}
