const Review  = require('../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const handlerFactory = require('./handlerFactory');

exports.setTourUserIds = (req,res,next) => {
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;
    next();
}


/* catchAsync(async (req,res,next) => {
    let newReview = req.body;
    let id = req.user.id;
    let tid = req.params.tourId;
    newReview = {...newReview, 'user': id,'tour':tid }
    console.log(newReview);
    const review = await Review.create(newReview);

    res.status(200).json({
        'message':'success',
        'data':{
            review
        }
    })
}) */

exports.createReview = handlerFactory.createOne(Review); 
exports.getAllReviews = handlerFactory.findAll(Review);
exports.getReview = handlerFactory.findOne(Review);
exports.deleteReview = handlerFactory.deleteOne(Review);
exports.updateReview = handlerFactory.updateOne(Review);
