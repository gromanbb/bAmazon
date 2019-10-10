#### bAmazon CLI
Homework 10: Node.js & MySQL Assignment
---
# bAmazon

### Overview

bAmazon is a text-based Command Line Interface (CLI) that allows users to execute commands for viewing the information of all products available for sale or buying products (as long as there are enough items in stock). 

### Before You Begin

1. The following Node.js Modules need to be installed before running bAmazon:

    - [Mysql](https://www.npmjs.com/package/mysql)
    - [Inquirer](https://www.npmjs.com/package/inquirer)
    - [Clear](https://www.npmjs.com/package/clear) 

2. You also need to run the `bAmazon_Seeds1.sql` script from Mysql to create the database and the products table.

![Demo](https://github.com/gromanbb/bAmazon/blob/master/images/bAmazonC_Seeds1.png)

### Instructions

1. Navigate to the root of your project and run `npm init -y`. This will initialize a `package.json` file for your project. The `package.json` file is required for installing third party npm packages and saving their version numbers. If you fail to initialize a `package.json` file, it will be troublesome, and at times almost impossible for anyone else to run your code after cloning your project.
2. Install the npm modules or packages mysql, inquirer and clear. Below is the line of code that you'll need to use:
    ```
    npm install mysql inquirer clear
    ```
3. Run the bAmazon CLI as follows:
	```
	node bAmazonCustomer.js
	```

​	![Demo](https://github.com/gromanbb/bAmazon/blob/master/images/bAmazonCustomer.png)

### What each command does

​		![Demo](https://github.com/gromanbb/bAmazon/blob/master/images/bAmazonC_Menu.png)

- bAmazon will display a list of products available for sale, including their IDs, names, prices and remaining quantities.

  ![Demo](https://github.com/gromanbb/bAmazon/blob/master/images/bAmazonC_View.png)

- It will allow the user to choose a product and specify how many units to buy.

  ![Demo](https://github.com/gromanbb/bAmazon/blob/master/images/bAmazonC_BuyProd.png)

  ![Demo](https://github.com/gromanbb/bAmazon/blob/master/images/bAmazonC_BuyQty.png)

- If the quantity ordered is less than what is currently in stock, bAmazon will let the user know that the order has been placed and will display the total cost. It will also update the stock to reflect the quantity remaining after the purchase.

  ![Demo](https://github.com/gromanbb/bAmazon/blob/master/images/bAmazonC_PO.png)

  ![Demo](https://github.com/gromanbb/bAmazon/blob/master/images/bAmazonC_productsTable.png)

- Otherwise, bAmazon will notify the user that the quantity ordered is insufficient.

  ![Demo](https://github.com/gromanbb/bAmazon/blob/master/images/bAmazonC_NoStock.png)