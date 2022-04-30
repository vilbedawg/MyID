__[Full Demo](https://oma-id.herokuapp.com/login)__

This project was built together with [@Saarenpaa](https://github.com/Saarenpaa), who worked on most of the frontend and UI/UX design, while I worked mainly on the server side stuff. You can view full demo of the app on [Heroku](https://oma-id.herokuapp.com/login).

If you wish to try the app, you can first sign up and submit an application. After that you can act as an administrator by logging in to one the following accounts:
* **trafi@admin.com**
* **kela@admin.com**
* **poliisi@admin.com**
* Password: **asd**

Please keep in mind that depending on the type of application you submitted, you will need to login to the appropriate administrator account. Each administrator can only handle the transactions that are assigned to them.


# MyID
MyID is a simulated Blockchain application for storing your Identification cards on the blockchain.


### Technologies used
**NodeJS - Express - MongoDB - React**


### Brief on how the app works
The app uses a REST API for requests and roles for role based access control. The roles include the default user role as well as specific admin roles for the Finnish Police, the Finnish Transport Safety Agency, and Kela. JWT-tokens are also used to enforce authentication and add an additional layer of security on top of the blockchain. The access tokens are stored as HTTP-only cookies that are validated on the server, and the refresh tokens are stored on the user's table in the database.

Users must first sign up for an account. After registering, they can apply for digital identification, which can be a passport, a driver's license, or a Kela card.
Following the submission of an application, the submitted data is treated as a **_transaction_**, which is signed with the user's private key, which they received upon account registration. The transaction is then stored on the transactions table, which acts as a pending applications type of array. 

![image](https://user-images.githubusercontent.com/82541244/166119603-6c1200b4-4477-457d-a188-c83c5ff2237a.png)

Admins can control the applications that users have sent through the app and further investigate the applicants' details based on the information they submit. Furthermore, admins can add required details, i.e. all the non-essential information that the user can find on their identification card. After inspecting the transaction, the administrator can decide whether it should be accepted or declined. The data on the user's device will be displayed differently depending on the decision.

After inspecting the fetched transactions, the administrator can **mine** the transactions into a new block, which will be added to the "blockchain", i.e. database's blockchain table. The mining process serves as proof of stake, with administrators acting as validators. The block hash is calculated during the mining process by using the data from each transaction, the current timestamp, and the server's difficulty setting. A single block can contain a maximum of 15 transactions.

![image](https://user-images.githubusercontent.com/82541244/166120527-7a5fe93b-7b71-48db-b18c-a9f234e27d44.png)

When the block has been mined, the user will then be able to display their new digital identification via their device. 

After each login request, the blockchain is validated. If the data has been altered in any way, the user will receive notification that the card is invalid and that they must submit a new application to demonstrate valid identification.

## Note
NodeJS is not the best language for implementing complex Blockchain implementations due to its Single Thread limitations. Because blockchain applications require many computational operations in addition to I/O, multi-threaded supported languages would perform better.

