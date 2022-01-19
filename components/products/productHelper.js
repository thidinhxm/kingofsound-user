exports.paginateCommentList = function (pagination, product_id) {
    let limit = 10, n;
    let page = parseInt(pagination.page);
    let leftText = '<i class="fa fa-chevron-left"></i>';
    let rightText = '<i class="fa fa-chevron-right"></i>';
    let paginationClass = 'store-pagination';

    let pageCount = pagination.pages || Math.ceil(pagination.totalRows / pagination.limit);
    let template = '<ul class="' + paginationClass + '">';

    // ========= Previous Button ===============
    if (page === 1) {
        n = 1;					

        template = template + `<li class="disabled"><a onclick="changePage(${n}, ${product_id})">${leftText}</a></li>`;
    }
    else {
        n = page - 1;
        template = template + `<li><a onclick="changePage(${n}, ${product_id})">${leftText}</a></li>`;
    }

    // ========= Page Numbers Middle ======

    
    let leftCount = Math.ceil(limit / 2) - 1;// 10 / 2 - 1 = 4
    let rightCount = limit - leftCount - 1;//5
    if (page + rightCount > pageCount) {//1 + 5 > 6
        leftCount = limit - (pageCount - page) - 1;//10 - (6 - 2) - 1 = 5
    }
    if (page - leftCount < 1) {//1 - 4 < 1
        leftCount = page - 1; //0
    }
    let start = page - leftCount;//1
    let i = 0;
    while (i < limit && i < pageCount) {
        n = start;
        if (start === page) {
            template = template + `<li class="active"><a onclick="changePage(${n}, ${product_id})">${n}</a></li>`;

        } else {
            template = template + `<li><a onclick="changePage(${n}, ${product_id})">${n}</a></li>`;
        }

        start++;
        i++;
    }

// ========== Next Buton ===========
    if (page === pageCount) {
        n = pageCount;         
        template = template + `<li class="disabled"><a onclick="changePage(${n}, ${product_id})">${rightText}</a></li>`;
    }
    else {
        n = page + 1;
        template = template + `<li><a onclick="changePage(${n}, ${product_id})">${rightText}</a></li>`;
    }
    template = template + '</ul>';
    return template;
};