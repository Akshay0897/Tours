const mongoose = require('mongoose');
const Tour = require('../models/tourModel');

const reviewSchema = new mongoose.Schema(
    {
      review: {
        type: String,
        required: [true, 'A tour must have atleast 10 character long desc.'],
        maxlength: [400, 'A tour name must have review less than 400 character'],
        minlength: [10, 'A tour name must have review more than 10 character']
        // validate: [validator.isAlpha, 'Tour name must only contain characters']
      },
      rating:{
          type:Number,
          required:true,
          min:1,
          max:5
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        select: false
      },
      user:{
          type:mongoose.Schema.ObjectId,
          ref:'User',
          required:[true,'User must belong to Author']
      },
      tour:{
        type:mongoose.Schema.ObjectId,
        ref:'Tour',
        required:[true,'Review must belong to a Tour']
    }
   },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

    reviewSchema.statics.calcAverageRatings = async function(tourId) {
      const stats = await this.aggregate([
        {
          $match: { tour: tourId }
        },
        {
          $group: {
            _id: '$tour',
            nRating: { $sum: 1 },
            avgRating: { $avg: '$rating' }
          }
        }
      ]);
      // console.log(stats);
    
      if (stats.length > 0) {
        await Tour.findByIdAndUpdate(tourId, {
          ratingsQuantity: stats[0].nRating,
          ratingsAverage: stats[0].avgRating
        });
      } else {
        await Tour.findByIdAndUpdate(tourId, {
          ratingsQuantity: 0,
          ratingsAverage: 4.5
        });
      }
    };
    
   reviewSchema.post('save', function(doc) {
      // this points to current review
      //console.log('cal avgs',doc);
      doc.constructor.calcAverageRatings(doc.tour);
    });

  /*   reviewSchema.pre(/^findOneAnd/, async function(next){
      this.r = await this.findOne();
      console.log(this.r);
      next();
    }); */

    reviewSchema.post(/^findOneAnd/,function(doc){
      //this.findOne() does not work here cause it's post middleware
      console.log('after changing review',doc);
      doc.constructor.calcAverageRatings(doc.tour);
    })

reviewSchema.pre(/^find/, function(next) {
  /* this.populate({
    path:'tour',
    select:'name'
  }). */
/*   this.populate({
    path:'user',
    select:'name photo'
  }); */
  next();
});


const Review  = mongoose.model('Review',reviewSchema);

module.exports = Review;