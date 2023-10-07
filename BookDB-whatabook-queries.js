/*
	Title: BookDB-whatabook-queries.js
    Author: Kyle Hochdoerfer, James Harper, Laurel Condon
    Date: 10/7/23
    Description: MongoDB Shell queries for WEB 335 Whatabook project
 */

//Week 8 Queries
console.log("Find list of all books:")
console.log(db.books.find()); //Displays a list of books
console.log("\n")

console.log("Find by genre:\n")
console.log(db.books.find({ "genre" : "Fantasy" })); //Lists books by genre
console.log("\n")

console.log("Find by author:")
console.log(db.books.find({ "author": "Michael Crichton" })); //Lists books by author
console.log("\n")

console.log("Find by bookId:")
console.log(db.books.find({ "bookId" : "1003" })); //Lists books 
console.log("\n")

//Week 9
const exampleId = "c001"; // Replace with desired customer

//Query to display wishlist for the desired customer
console.log(`Wishlist for Customer ID ${exampleId}`);
console.log((db.customers.findOne({ "customerId": exampleId })).wishlistItems)

//Query to add book5 to a customer wishlist
const result = db.customers.updateOne(
	{ customerId: exampleId },
	{ $push: { wishlistItems: book5 } }
);

//Output the customer with the updated wishlist to demonstrate that it was updated
console.log('')
console.log(`Book 5 has been added to the customer with an ID of ${exampleId}`)
console.log((db.customers.findOne({ "customerId": exampleId })).wishlistItems)

const bookIdToRemove = "1005"; // Replace with desired bookId

///Query to remove a book for a customer wishlist
const removeResult = db.customers.updateOne(
	{ customerId: exampleId },
	{ $pull: { wishlistItems: { bookId: bookIdToRemove } } }
);

//Output the customer who had a book removed from their wishlist to demonstrate that it was deleted
console.log('')
console.log(`Book with an ID of ${bookIdToRemove} has been deleted`)
console.log((db.customers.findOne({ "customerId": exampleId })).wishlistItems)