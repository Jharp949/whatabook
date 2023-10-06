/*
	Title: books.js
    Author: Kyle Hochdoerfer, James Harper, Laurel Condon
    Date: 27 September 2023
    Description: MongoDB Shell Scripts for the books and customers collections
 */

// Delete the houses and students collections.
db.books.drop()
db.customers.drop()

// Create the customers collection with wishlist items as an embedded document
db.createCollection("customers", {
	validator: { $jsonSchema: {
		bsonType: "object",
		properties: {
			firstName: {
				bsonType: "string"
			},
			lastName: {
				bsonType: "string"
			},
            customerId: {
                bsonType: "string"
            },
			wishlistItems: {
				bsonType: "array"
			}
		}
	}}
})

//Create the books collection
db.createCollection("books", {
	validator: { $jsonSchema: {
		bsonType: "object",
		properties: {
			title: {
				bsonType: "string"
			},
			genre: {
				bsonType: "string"
			},
			author: {
				bsonType: "string"
			},
			bookId: {
				bsonType: "string"
			}
		}
	}}
})

//Creating book objects.
book1 = {
	"title": "The Hobbit",
	"genre": "Fantasy",
	"author": "JRR Tolkien",
    "bookId": "1001"
}

book2 = {
	"title": "Fellowship of the Ring",
	"genre": "Fantasy",
	"author": "JRR Tolkien",
    "bookId": "1002"
}

book3 = {
	"title": "Dune",
	"genre": "Science Fiction",
	"author": "Frank Herbert",
    "bookId": "1003"
}

book4 = {
	"title": "Moby-Dick",
	"genre": "Adventure",
	"author": "Herman Melville",
    "bookId": "1004"
}

book5 = {
    "title": "Jurassic Park",
    "genre": "Science Fiction",
    "author": "Michael Crichton",
    "bookId": "1005"
}

book6 = {
    "title": "The Call of the Wild",
    "genre": "Adventure",
    "author": "Jack London",
    "bookId": "1006"
}


// Insert the book documents.
db.books.insertOne(book1)
db.books.insertOne(book2)
db.books.insertOne(book3)
db.books.insertOne(book4)
db.books.insertOne(book5)
db.books.insertOne(book6)


//Create customer objects
john = {
    "firstName": "John",
    "lastName": "Smith",
    "customerId": "c001",
    "wishlistItems":  [book1, book2, book6]
}

mary = {
    "firstName": "Mary",
    "lastName": "Miller",
    "customerId": "c002",
    "wishlistItems": [book3, book4, book5]
}

//Insert the customer documents
db.customers.insertOne(john)
db.customers.insertOne(mary)

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
console.log(db.books.find({ "bookId" : "1003" })); //Lists books bookId
console.log('')

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