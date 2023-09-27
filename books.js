/**
	Title: books.js
    Author: Kyle Hochdoerfer
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
			wishlist: {
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
    "wishlist":  [book1, book2, book6]
}

mary = {
    "firstName": "Mary",
    "lastName": "Miller",
    "customerId": "c002",
    "wishlist": [book3, book4, book5]
}

//Insert the customer documents
db.customers.insertOne(john)
db.customers.insertOne(mary)