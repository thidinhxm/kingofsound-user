# KING OF SOUND
    
<p align="left">
<img src="https://img.shields.io/badge/version-1.0.0-blue">
<img src="https://img.shields.io/badge/platforms-Web-orange.svg">
</p>

KingOfSound is a website that sells all kinds of audio equipment and accessories. KingOfSound has all basic features and some advanced features of Ecommerce Webiste. There is also an admin website to manage things related to products, users, invoices, revenue,...

## 1. Contributors

|    ID    |      Fullname      |            Github                  |  Role           |
| -------- | ------------------ | ---------------------------------- | --------------- |
| 19120662 | Đinh Trần Xuân Thi | https://github.com/thidinhxm       | PM, Dev, Tester |
| 19120517 | Trương Văn Hoàng   | https://github.com/Hoangtruongvann | Dev, Tester     |
| 19120695 | Nguyễn Văn Trịnh   | https://github.com/nvtrinh2412     | Dev, Tester     |

## 2. Technical stack
- NodeJS, ExpressJS
- View engine: express-handlebars
- AJAX, Jquery, Bootstrap
- Database: MySQL
- Hosting: heroku.com


## 3. Admin Project
> ***https://github.com/thidinhxm/kingofsound-admin***

## 4. Features of website
#### 1. Features when not logged in
- 1.1. Contents of the homepage
- 1.2. View a list of prouducts by product type/manufacturer/category
- 1.3. Support to change display order, filter products
- 1.4. List of products pagination
- 1.5. View product details
- 1.6. Show related products
- 1.7. Show list of product comment
- 1.8. Add a comment
- 1.9. List of comments pagination
- 1.10. Search
- 1.11. Advanced search
- 1.12. Search pagination
- 1.13. Select product to cart
- 1.14. Manage cart

#### 2. Authentication and authorization
- 2.1. Use a specialized library in authentication
- 2.2. Register an account
- 2.3. Check constraints on username, password, confirm password,...
- 2.4. Activate an account by email
- 2.5. Login
- 2.6. Prohibit non-logged-in users from using features that require login by authority
- 2.7. Forgot password and Reset password

#### 3. Feature when logged in
- 3.1. Update personal information
- 3.2. Check constraints
- 3.3. Change password
- 3.4. Order and payment
- 3.5. Fill in shipping information
- 3.6. View process history information and purchase status

#### 4. Feature of administrator
- 4.1. Update personal information
- 4.2. View a list of user accounts
- 4.3. User list pagination
- 4.4. View user details
- 4.5. Lock/Unlock a user account
- 4.6. Manage store system
- 4.7. Manage products on the store
- 4.8. Pagination, filter products list
- 4.9. Check constraints on products
- 4.10. Upload product images
- 4.11. Manage orders
- 4.12. Statistics of sales by day, week, month, year
- 4.13. Statistics on the number of top 10 sales of products

#### 5. Some extra features outside the project
- 5.1. Hosting webiste
- 5.2. AJAX (pagination, mangage cart, check exists account, voucher, search, filter, add comment,...)
- 5.3. Vouchers (CRUD in admins, use in users)
- 5.4. Rating (Rate products after purchase, see reviews,...) 
- 5.5. Draw charts of revenue statistics

## 5. Usage
    
* Our website's workflow
    - Users do not need to login to add products to the cart, only need to login at checkout.
    - When a user logs in, the products in the old cart will be moved to the user's cart.
    - If the user doesn't have an account before, the user need to register and the system will send a mail to verify your account
    - User will select some products to add to cart and pay. If the user has a voucher, enter the voucher code and the bill will be discounted
    - Then, wait to receive the merchandise and evaluate.

* Setup environment variable
    - Clone `.env.` from `.env.example` and fill in the `<input>` placeholders.
    - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` are API keys, that can be obtained by registering at https://cloudinary.com/
    - `EMAIL_USER`, `EMAIL_PASS` is your email and password to send email to the user's email
* Database connection
    - This web application use MySQL. From this point forward, we assume that you already have MySQL installed on your machine and you filled MySQL authentication information in the `.env` file.
* Start
    - Run `npm start` or `yarn start`. After this, the web app is host on `localhost:3000`.

## 6. License

KingOfSound is available under the [MIT license](https://opensource.org/licenses/MIT).



