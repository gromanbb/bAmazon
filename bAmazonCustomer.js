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
  start();
});

function start() {
  clear();

  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "Buy Products",
        "Exit"
      ]
    })
    .then(function (answer1) {
      switch (answer1.action) {
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

function viewProducts() {
  clear();

  // Query the database and display all of the products available for sale
  connection.query("SELECT * FROM products ORDER BY item_id", function (err, results) {
    if (err) throw err;
    console.log("  ID |             Name            | Price | Stock\n");
    for (let i = 0; i < results.length; i++) {
      console.log("   " + results[i].item_id + " | " + results[i].product_name + " | \$" + results[i].price + " | " + results[i].stock_quantity);
    }
  });
  console.log("\n");
  inquirer
    .prompt([
      {
        name: "mainMenu",
        type: "confirm",
        message: "Return to main menu?",
        default: true
      }
    ])
    .then(function (ans1) {
      if (ans1.mainMenu) {
        start();
      }
      else {
        clear();
        connection.end();
      }
    });
}

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
          pageSize: 15,
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
          message: "How many do you want?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function (answer2) {
        // Get the information of the chosen product
        let chosenProduct;
        for (let i = 0; i < results.length; i++) {
          if (results[i].product_name === answer2.name) {
            chosenProduct = results[i];
          }
        }
        // Determine if the quantity is available in stock
        if (parseInt(chosenProduct.stock_quantity) >= parseInt(answer2.qty)) {
          // There is enough stock
          let stockQty = parseInt(chosenProduct.stock_quantity) - parseInt(answer2.qty);
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [{ stock_quantity: stockQty }, { item_id: chosenProduct.item_id }],
            function (error) {
              if (error) throw err;
              console.log("\nOrder placed successfully!");
              console.log("\nYour total cost is: \$" + (parseFloat(chosenProduct.price) * parseInt(answer2.qty)));
            }
          );
        }
        else {
          // Out of stock or not enough
          console.log("\nInsufficient quantity in stock!");
        }
      });
  });
  console.log("\n");
  inquirer
    .prompt([
      {
        name: "mainMenu",
        type: "confirm",
        message: "Return to main menu?",
        default: true
      }
    ])
    .then(function (ans2) {
      if (ans2.mainMenu) {
        start();
      }
      else {
        clear();
        connection.end();
      }
    });
}
