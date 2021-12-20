const cartService = require('./cartService');

exports.cart =  async(req, res) => {
    const user = req.user;
    const id = user.user_id;
    let total = 0; 
    const detailCart =  await cartService.getCart(id);
    for(const detail in detailCart)
    {
     total = total + detail.quantity * detail['product.price'];
    }
    res.render('../components/cart/cartViews/cart',{detailCart,total})
    

}
exports.checkout = async (req, res) => {
const user = req.user;
const id = user.user_id; 
let total = 0;
const detailCart =  await cartService.getCart(id);
for(const detail in detailCart)
   {
    total = total + detail.quantity * detail['product.price'];
   }
res.render('../components/cart/cartViews/checkout', {detailCart, total})
}