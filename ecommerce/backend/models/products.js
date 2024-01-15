const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({
    name:{
        type: String,
        required: [true, 'PLEASE Enter the Product Name'],
        trim: true,
        maxLength:[100, 'Product name cannot be exceed 100 characters']
    },
    price:{
        type: Number,
        required: [true, 'PLEASE Enter the Product Price'],
        maxLength:[5, 'Product name cannot be exceed 5 characters'],
        default: 0.0
    },
    description:{
        type: String,
        required: [true, 'PLEASE Enter Description about Product '],
        },
    rating:{
        type: Number,
        default: 0
        },
    images:[
        {
            product_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    category:{
        type: String,
        required: [true, 'PLEASE Enter Category for Product'],
        enum:{
            values:[
                'Electronics',
                'Cameras',
                'Laptop',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'PLEASE select the Correct Category for the Product'
        }
    },
    sellar:{
        type: String,
        required: [true, 'PLEASE Enter the Product Sellar Name']
    },
    stock:{
        type: Number,
        required: [true, 'PLEASE Enter the Product Stock'],
        maxLength:[5, 'Product name cannot be exceed 5 characters'],
        default: 0
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            name:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comment:{
                type: String,
                required: true
            }
        }
    ],
    createdAt:{
        type:Date,
        default: Date.now
    }

})
// module.exports = ['Product' , productSchema];
const Product = mongoose.model('Product', productSchema);
module.exports = Product;