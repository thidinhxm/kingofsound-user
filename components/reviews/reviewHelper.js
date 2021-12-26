exports.createRating = (rating = 5) => {
    return  '<i class="fa fa-star"></i>'.repeat(parseInt(rating)) + '<i class="fa fa-star disabled-star"></i>'.repeat(5 - parseInt(rating));
           
}

exports.getNumberRating = (reviews, rating) => {
    return reviews.reduce((total, review) => total + (review.rating === rating ? 1 : 0), 0);
}

exports.getPercentRating = (reviews, rating) => {
    const starCount = this.getNumberRating(reviews, rating);
    const starPercentage = starCount / reviews.length;
    return starPercentage * 100;
}

exports.formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        day : 'numeric',
        month : 'short',
        year : 'numeric',
        hour : 'numeric',
        minute : 'numeric',
        hour12 : false
    });
}