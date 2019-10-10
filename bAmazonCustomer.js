// Load NPM packages
const mysql = require("mysql");
const inquirer = require("inquirer");
const clear = require("clear");
clear();

// Create the connection information for the SQL database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

// Connect to the MYSQL server and SQL database
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId + "\n");
  buyProducts();
});

function buyProducts() {
  // Query the database and display all of the products available for sale
  connection.query("SELECT * FROM products ORDER BY item_id", function (err, results) {
    if (err) throw err;
    console.log("  ID |                  Name                  | Price | Stock\n");
    for (let i = 0; i < results.length; i++) {
      console.log("   " + results[i].item_id + " | " + results[i].product_name + " | \$" + results[i].price + " | " + results[i].stock_quantity);
    }
    console.log("\n");
    // Prompt the user for the product that they'd like to buy
    inquirer
      .prompt([
        {
          name: "name",
          type: "rawlist",
          message: "Which product would you like to buy?",
          choices: function () {
            let choiceArray = [];
            for (let i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "How many do you want?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function (answer) {
        // Get the information of the chosen product
        let chosenProduct;
        for (let i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.name) {
            chosenProduct = results[i];
          }
        }
        // Determine if the quantity is available in stock
        if (parseInt(chosenProduct.stock_quantity) >= parseInt(answer.quantity)) {
          // There is enough stock
          let Qty = parseInt(chosenProduct.stock_quantity) - parseInt(answer.quantity);
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: Qty
              },
              {
                item_id: chosenProduct.item_id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Order placed successfully!");
              console.log("The total is: \$" + (parseFloat(chosenProduct.price) * parseInt(answer.quantity)));

              // ojo
              connection.end();

            }
          );
        }
        else {
          // Out of stock or not enough
          console.log("Insufficient quantity in stock!");

          // ojo
          connection.end();
        }
      });
  });
}
