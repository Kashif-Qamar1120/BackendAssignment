class APIFeatures {
    constructor(query , queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    // here will be search function
    search(){
        const keyword = this.queryStr.keyword ? {
         name: {
            $regex: this.queryStr.keyword,
            $options:'i'
         }
        }: {}
        
        this.query = this.query.find({...keyword});
        return this;
    }
    // here will be filter function
    filter() {
        const queryCopy = {...this.queryStr}
         

        const removeFields = ['keyword' , 'limit' , 'page']
        removeFields.forEach(el => delete queryCopy[el]);
        
        console.log(queryCopy);

         let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match =>`$${match}`) 

        console.log(queryStr);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resPerPage) {
       const currentPage = Number(this.query.page) || 1;
       const skip = resPerPage * (currentPage - 1);

       this.query = this.query.limit(resPerPage).skip(skip); 
       return this;
    }
}

module.exports = APIFeatures