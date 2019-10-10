// Load NPM packages
const mysql = require("mysql");
const inquirer = require("inquirer");
// Clear console/screen
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
  start();
});

// Function to kick off CLI
function start() {
  clear();

  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      pageSize: 5,
      choices: [
        "View Products for Sale",
        "Buy Products",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Products for Sale":
          viewProducts();
          break;

        case "Buy Products":
          buyProducts();
          break;

        case "Exit":
          clear();
          connection.end();
          break;
      }
    });
}

// Function to view all products for sale
function viewProducts() {
  clear();

  // Query the database and display all of the products available for sale
  connection.query("SELECT * FROM products ORDER BY item_id", function (err, results) {
    if (err) throw err;
    console.log("  ID |             Name            | Price | Stock\n");
    for (let i = 0; i < results.length; i++) {
      console.log("   " + results[i].item_id + " | " + results[i].product_name + " | \$" + results[i].price + " | " + results[i].stock_quantity);
    }
    mainMenu();
  });
}

// Function to buy products
function buyProducts() {
  clear();

  // Query the database for all the products for sale
  connection.query("SELECT * FROM products ORDER BY item_id", function (err, results) {
    if (err) throw err;
    // Prompt the user for the product that they'd like to buy
    inquirer
      .prompt([
        {
          name: "name",
          type: "rawlist",
          message: "Which product would you like to buy?",
          pageSize: 12,
          choices: function () {
            let choiceArray = [];
            for (let i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          }
        },
        {
          name: "qty",
          type: "input",
          message: "How many do you want?\t",
          validate: function (value) {
            if (isNaN(value) === false) {
              if (parseInt(value) > 0) {
                return true;
              }
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
        if (parseInt(chosenProduct.stock_quantity) >= parseInt(answer.qty)) {
          // There is enough stock
          let stockQty = parseInt(chosenProduct.stock_quantity) - parseInt(answer.qty);
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              { stock_quantity: stockQty },
              { item_id: chosenProduct.item_id }
            ],
            function (error) {
              if (error) throw err;
              console.log("\nOrder placed successfully!");
              console.log("\nYour total cost is:\t\$" + (parseFloat(chosenProduct.price) * parseInt(answer.qty)));
              mainMenu();
            }
          );
        }
        else {
          // Out of stock or not enough
          console.log("\nInsufficient quantity in stock!");
          mainMenu();
        }
      });
  });
}

// Function to go back to the main menu or end the connection/exit
function mainMenu() {
  console.log("\n");
  inquirer
    .prompt([
      {
        name: "main_menu",
        type: "list",
        message: "Return to main menu?",
        choices: [
          "Yes",
          "No"
        ]
      }
    ])
    .then(function (answer) {
      if (answer.main_menu === "Yes") {
        start();
      }
      else {
        clear();
        console.log("Good-bye. Come back soon!");
        connection.end();
      }
    });
}
