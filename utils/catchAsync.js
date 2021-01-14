const catchAsync = func => {
    return (req, res, next) => {
        func(req, res).catch(next)
    }
}
module.exports = catchAsync