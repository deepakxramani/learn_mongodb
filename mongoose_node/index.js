const mongoose = require('mongoose');

// const uri =  process.env.MONGODB_LOCAL_URI  // for accessing localdata

// for accessing and querying cloud hosted data
const URI  = process.env.MONGODB_URI

mongoose.connect(URI);

// we need to create a schema
const productSchema = new mongoose.Schema({
    name: String,
    company: String,
    price: Number,
    colors: [String],
    image: String,
    category: String,
    isFeatured: Boolean,
});

// we need to now create an model
const Product = new mongoose.model("Product", productSchema)  // write 'Product' in singular form, mongodb will convert ii into Products later on.


//2. inserting documents     
const  data1 = {
    name: 'Designer Handbag2X',
    company: '64c23350e32f4a51b19b923a',
    price: 2466,
    colors: [ '#000000', '#cc6600', '#666330' ],
    image: 'images/product-handbag.png',
    category: '64c2342de32f4a51b19b9250',
    isFeatured: true
}

const main = async () => {
    try {
        
        //1. const data = await Product.find({price: {$eq: 59}})
        //   console.log(data);

        //2. inserting documents
        //await Product.insertMany(data1);
        //const data = await Product.find({price: {$eq: 2466}})
        //console.log(data);

        //3. updating documents  ->  we can use updateOne() and updateMany() methods directly or findOneAndUpdate().
        //     await Product.findOneAndUpdate(
        //     { name: "Designer Handbag2X", price: 2466 },         // find this document
        //     { $set: {price: 2499} }                             // update this field value to new value
            
        // );

        // const data = await Product.find({price: {$eq: 2499}})
        // console.log(data);


        //4. deleting documents ->  for delete we use findOneAndDelete()
        await Product.findOneAndDelete({ name: "Designer Handbag2X", price: 2499 });    // find this document and delete it.
                 
        const data = await Product.find({name: "Designer Handbag2X", price: 2499})
        console.log(data);


    } catch (error) {
        console.log(error)
    }finally{
        await mongoose.connection.close();
    }
}


main();