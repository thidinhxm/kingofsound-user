exports.createRating = (rating) => {
    return '<div class="rating-stars">' + 
                '<i class="fa fa-star"></i>'.repeat(rating) + 
                '<i class="fa fa-star-o"></i>'.repeat(5 - rating) +
            '</div>';
}
exports.createAverageRating = (reviews) => {
    return reviews.reduce((total, review) => total + review, 0) / reviews.length;
}
exports.createRatingList = (reviews) => {
    const stars = [5, 4, 3, 2, 1];
    const totalReviews = reviews.reduce((total, review) => total + review, 0);
    const averageRating = totalReviews / reviews.length;
    
    return `<div id="rating">
        <div class="rating-avg">
            <span>${averageRating}</span>
            ${this.createRating(parseInt(averageRating))}
        </div>
        <ul class="rating">
            ${stars.map(star => {
                return `<li>
                    ${this.createRating(star)}
                    <div class="rating-progress">
                        <div style="width: ${totalReviews / reviews[star - 1] * 100}%;"></div>
                    </div>
                </li>`
            })}
        </ul>
    </div>`;
}