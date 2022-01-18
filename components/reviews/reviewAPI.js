const reviewService = require('./reviewService');

exports.getReview = async (req, res, next) =>{
    try{
        const {review_id} = req.body;
        const review = await reviewService.getReview(review_id);
        if(review) {
            res.json({
                success: true,
                content: review.content,
                rating: review.rating
            });
        }           
        else {
            res.json({
                success: false,
            })
        }
    }
    catch (err) {
    next(err);
    }
}