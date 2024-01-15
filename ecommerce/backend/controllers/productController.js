const Product = require('../models/products');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');


// for a single or multi create new products --> /api/v1/admin/product/new
exports.newProduct = catchAsyncError (async (req, res, next) => {
   
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});
//  for   get all products in database --> /api/v1/products?keyword=apple 
exports.getProducts = catchAsyncError (async (req , res ,next) =>{
    const resPerPage = 4;
    const productCount = await Product.countDocuments(); 
    const apiFeatures = new APIFeatures(Product.find(), req.query)
                       .search()
                       .filter()
                       .pagination(resPerPage) 
    const products = await apiFeatures.query;
   

    res.status(200).json({
        success:true,
        // message:'This route will show all products in database'
        count: products.length,
        productCount,
        products
    })
})

//for get single product details in database --> /api/v1/product/:[id]
exports.getSingleProduct = catchAsyncError (async (req , res , next) => {
    const product = await Product.findById(req.params.id);
   if(!product){
    return next(new ErrorHandler('Product not found' , 404));
    
    
    // res.status(404).json({
    //     success: false,
    //     message: 'Product are not found'
    // we will resolve this code})
   }
   res.status(200).json({
    success : true,
    product
   })
})

//for update the product in database --> /api/v1/admin/product/:{id}

exports.updateProduct = catchAsyncError (async (req , res , next) =>{
    const id = req.params.id;
    let product = await Product.findById(id)
    if(!product){
        return res.status(404).json({
            success: false,
            message: 'Sorry Product are not Found'
        })
       }
     product = await Product.findByIdAndUpdate(id ,req.body ,{
        new: true,
        runValidator: true,
        useFindAndModity: false
     });
     res.status(200).json(
        {
            success: true,
            product
        }
     )
})

//for Delete the product in the database by id  --> /api/v1/admin/product/:[id]


exports.deleteProduct = catchAsyncError (async (req, res, next) => {
    const id = req.params.id;

    // try {
        const result = await Product.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Product were not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product was Successfully Removed',
        });

});

