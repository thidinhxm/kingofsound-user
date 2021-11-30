exports.createRating = (rating = 5) => {
    return  '<i class="fa fa-star"></i>'.repeat(rating) + '<i class="fa fa-star-o"></i>'.repeat(5 - rating);
           
}

exports.createRatingList = (reviews) => {
    const stars = [5, 4, 3, 2, 1];
    const totalReviews = reviews.reduce((total, review) => total + review, 0);
    const averageRating = totalReviews / reviews.length;
    // '<div class="rating-stars">' + '</div>';
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