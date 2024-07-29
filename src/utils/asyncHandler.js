const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch(err => next(err))
    }
}


export {asyncHandler}

// this is a high order function
// this is a try catch function example


// const asyncHandler = () => {}
// const asyncHandler = (func) => {() => {} }
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}



// const asyncHandler = (func) => async (req, res, next) => {
//     try {
//         await func(req, res, next);
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: error.message,
//         })
//     }
// }