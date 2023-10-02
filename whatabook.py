#-----------------------------------------------------------------------
# Title: whatabook.py
# Author: Kyle Hochdoerfer
# Date: 09/29/23
# Description: Whatabook console application for WEB 335
#-----------------------------------------------------------------------

#Import MongoClient
from pymongo import MongoClient

#Import pprint module
from pprint import pprint

#Import a connection string to connect to
client = MongoClient("mongodb+srv://web335_user:s3cret@cluster0.tydee4p.mongodb.net/?retryWrites=true&w=majority")

#Configure a variable to access WEB335DB
db = client["web335DB"]

#Write queries to store a list of customers and books as variables
customers = (db.customers.find({}))
books = (db.books.find({}))

#Print a label for the following output
print("All books:")

#Print all books to the console
for doc in books:
    pprint(doc)
    print('')

#Prompt the user to enter a genre
genre = input("Choose a genre from the following choices: Science Fiction, Fantasy, or Adventure: ").title()

#If the genre input matches one of the valid options:
if genre == "Science Fiction" or genre == "Fantasy" or genre == "Adventure":
    #Store a list of books in the selected genre in a variable
    genre_list = (db.books.find({"genre": genre}))

    #Print a heading to label the genre output
    print(genre + " Books:")

    #For every book in the list with the inputted genre:
    for book in genre_list:
        #Print the book and a blank line to the console
        pprint(book)
        print('')
else:
    #Otherwise, print an error message stating that the input was invalid
    print("Error: Invalid genre")
    print('')

#Declare an empty list to hold customer IDs
id_list = []

#For every customer document
for doc in customers:
    #Append a customer ID to the id list
    id_list.append(doc["customerId"])

#Prompt the user to enter a customer ID
id = input("Enter a customer ID (Ex: c001, c002): ")

#If the id input matches one of the valid options:
if id in id_list:
    #Run a query to find the chosen user document and store it as a variable
    list_user = (db.customers.find_one({"customerId": id}))

    #Output the name of the user whose wishlist is being outputted
    print(list_user["firstName"] + " " + list_user["lastName"] + "'s wishlist:")
    
    #For every item in the chosen user's wishlist
    for item in list_user["wishlistItems"]:
        #Print the wishlist item followed by a blank line
        pprint(item)
        print("")
else:
    #Otherwise, print an error message stating that the input was invalid
    print("Error: Invalid ID")
