// module.exports = AsyncTryCatch => (req,res,next) =>{
//     Promise.resolve(AsyncTryCatch(req,res,next)).catch(next)
// }

function middlewareFunc(AsyncTryCatchFun){
    return function(req,res,next){
     Promise.resolve(AsyncTryCatchFun(req,res,next)).catch(next)   
    }
}

module.exports = middlewareFunc;