const {models} = require('../../models');
const {getOne} = require('../products/productService');

exports.createCart = async (user_id) => {
    const cart = await models.carts.create({
        user_id: user_id,
    })
    return cart.get({plain: true});
};

exports.createUnauthUser = async (unauth_id, cart_id ) => {
    const unauthUser = await models.unauthusers.create({
        unauth_id,
        cart_id,
    })
    return unauthUser.get({plain: true});
};

exports.updateCartUnauthUser = (unauth_id, cart_id) => {
    return models.unauthusers.update({
        cart_id: cart_id,
    }, {
        where: {
            unauth_id,
        }
    });
};

exports.getDetailsInCart = async (cart_id) => {
    try {
        const detailCart = await models.detailcarts.findAll({
            attributes: ['product_id', 'quantity'],
            where: {
                cart_id: cart_id
            },
            raw: true
        });
        if (!detailCart) {
            return null;
        }

        const products = await Promise.all(detailCart.map(async (detail) => {
            const product = await getOne(detail.product_id);
            const image = await models.images.findOne({
                where: {
                    product_id: detail.product_id,
                    image_stt: 1
                },
                raw: true
            });
            product.image = image.image_link;
            const priceString = product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            const subtotal = detail.quantity * product.price;
            const subtotalString = subtotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            return {...product, quantity: detail.quantity, subtotal, subtotalString, priceString};
        }));
        let total = 0;
        products.forEach(product => {
            total += product.quantity * product.price;
        });
        const totalString = total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        return {products, total, totalString};
    }
    catch (err) {
        throw err;
    }
}

exports.getUserCart = async (user_id) => {
    try {
        const cart = await models.carts.findOne({
            where: {
                user_id: user_id
            },
            raw: true
        });
    
        const details = await this.getDetailsInCart(cart.cart_id);
        cart.products = details.products;
        cart.total = details.total;
        cart.totalString = details.totalString;
        return cart;
    }
    catch(err) {
        throw err;
    }
};

exports.getUnauthCart = async (unauth_cart_id) => {
    try {
        const cart = await models.carts.findOne({ 
            where: {
                cart_id: unauth_cart_id
            },
            raw: true
        });
        
        const details = await this.getDetailsInCart(cart.cart_id);
        cart.products = details.products;
        cart.total = details.total;
        cart.totalString = details.totalString;
        return cart;
    }
    catch(err) {
        throw err;
    }
};

exports.changeQuantity = async (cart_id, product_id, quantity) => {
    try {
        await models.detailcarts.update({
            quantity: quantity,
        }, {
            where: {
                cart_id: cart_id,
                product_id: product_id
            }
        });
    }
    catch(err) {
        throw err;
    }
}

exports.addToCart = async (cart_id, product_id, quantity = 1) => {
    try {
        const detailCart = await models.detailcarts.findOne({
            where: {
                cart_id: cart_id,
                product_id: product_id
            },
            raw: true
        });
    
        if (detailCart) {
            await this.changeQuantity(cart_id, product_id, detailCart.quantity + quantity);
        }
        else {
            await models.detailcarts.create({
                cart_id: cart_id,
                product_id: product_id,
                quantity: quantity,
            });
        }
    }
    catch(err) {
        throw err;
    }  
}

exports.removeFromCart = (cart_id, product_id) => {
    return models.detailcarts.destroy({
        where: {
            cart_id: cart_id,
            product_id: product_id
        }
    });
}

exports.moveToCartUser = async (user_cart_id, unauth_cart_id) => {
    try {
        const details = await models.detailcarts.findAll({
            where: {
                cart_id: unauth_cart_id
            },
            raw: true
        });

        details.forEach(async (detail) => {
            await this.addToCart(user_cart_id, detail.product_id, detail.quantity);
        });

        await models.detailcarts.destroy({
            where: {
                cart_id: unauth_cart_id
            }
        });

    }
    catch(err) {
        throw err;
    }
}

