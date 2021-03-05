const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid/v4');
const productsTable = process.env.WKS-TABLE;
const Product = require('../models/product');

exports.module = async function getAll() {
    const products =  db.scan({TableName: productsTable});
    return products;
}

exports.module = async function create(product) {
    try {
        const newProduct =   db.put({TableName: productsTable,Item: product});
        return newProduct;
    } catch (error) {
        return error;
    }
};

exports.module = async function update(id, values) {
        const p =   Product;
        p.scan(values).addFilterCondition({id:id});
        console.log()
        const instance = new Product.update({id:id,values}); //modelClass({ id, ...values });
        
        return this.save(instance);
}


// exports.module = class ProductService {

//     // async create(data){
//     //     try {
//     //         const product = Product;
//     //         const newProdct = await product.create(data);
//     //         return newProdct;
//     //     } catch (error) {
//     //         return error;
//     //     }
//     // }

//     // async update(id, values) {
//     //     const p =   Product;
//     //     p.scan(values).addFilterCondition({id:id});
//     //     console.log()
//     //     const instance = new Product.update({id:id,values}); //modelClass({ id, ...values });
        
//     //     return this.save(instance);
//     //   }
    
//     //   async patch(id, values) {
//     //     const instance = await this.findById(id);
//     //     const newValues = { id, ...values };
//     //     Object.keys(newValues).forEach((key) => {
//     //       instance[key] = newValues[key];
//     //     });
//     //     return this.save(instance);
//     //   }
    
      
    
//     //   async findById(id) {
//     //     try {
//     //       const instance = await this._mapper.get(new this._modelClass({ id }));
//     //       if (!instance.deletedAt) {
//     //         return instance;
//     //       }
//     //     } catch (e) {
//     //       if (e.name === "ItemNotFoundException") throw new NotFoundError("product not found");
//     //       throw e;
//     //     }
//     //   }
    
//     //   async delete(id) {
//     //     const instance = await this.findById(id);
    
//     //     if (instance) {
//     //       return this._mapper.delete(instance, { onMissing: "skip" });
//     //     }
    
//     //     throw new NotFoundError("product not found");
//     //   }


// }


