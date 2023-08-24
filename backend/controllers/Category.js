const Category = require("../models/Category");
//create Category handler function
exports.createCategory = async (req,res)=>{
    try{
        const {name,description} = req.body;
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"ALL fields are not filled",
            })
        }
        //create entry in db
        const CategoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(CategoryDetails);
        //return response
        return res.status(200).json(
            {
                success:false,
                message:"Category created",
            }
        )

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"INTErnal Server Error",
        })
    }
}
//getAllCategorys function
exports.getAllCategorys=async(req,res)=>{
    try{
        const allCategorys = await Category.find({},{name:true, description:true});
        return res.status(200).json({
            success:true,
            message:"displayed all Categorys",
            data:allCategorys,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"INTErnal Server Error",
        });
    }
}
//getcategorydetails
exports.getcategorydetails = async(req,res)=>{
    try{
        //get catId
        const {catId}= req.body;
        //get all courses regarding that catId
        const selectcategory = await Category.findById(catId).populate("course").exec();
        //validation
        if(!selectcategory){
            return res.status(404).json({
                success:false,
                message:"Data not found",
            })
        }
        //get courses other than that catId
        const diffcategory = await Category.find({
            _id: {$ne : catId},
        }).populate("course").exec();

        //get top selling courses
        return res.status(200).json({
            success:true,
            data:{
                selectcategory,
                diffcategory,
            }
        })
        
    }catch{
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"INTErnal Server Error",
        });

    }
}