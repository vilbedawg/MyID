__[DEMO](https://oma-id.herokuapp.com/login)__

This project was built together with [@Saarenpaa](https://github.com/Saarenpaa), who worked on most of the frontend and UI/UX design, while I worked mainly on the server side stuff. You can view full demo of the app on heroku.

# MyID
MyID is a simulated Blockchain application for storing your Identification cards on the blockchain. Please keep in mind that NodeJS is not the best language for implementing complex Blockchain implementations due to its Single Thread limitations. Because blockchain applications require many computational operations in addition to I/O, multi-threaded supported languages would perform better.



### Technologies used
**NodeJS - Express - MongoDB - React**

### Brief on how the app works
The app is role based, having default user role and specific admin roles, which include Finnish Police, Liikenteen turvallisuusvirasto, and Kansaneläkelaitos.

Users must first sign up for an account. After registering, they can apply for digital identification, which can be a passport, a driver's license, or a Kela card.

After submitting an application, the submitted data is handled as a **_transaction_**, which is signed with the users private key that they received on account registeration. The transaction is then stored on the transactions table, which acts as a pending applications type of array. 

![image](https://user-images.githubusercontent.com/82541244/166119603-6c1200b4-4477-457d-a188-c83c5ff2237a.png)


Admins can control the applications that users have sent through the app, and inspect the applicants details further based on the info they submit. In addition, admins can add required details, ie. all the non important things that the user can find on their identification card. 

After inspection, the admin can decide whether the transaction is accepted or declined. Depending on the decision, the data will be displayed differently on the users device. 

After inspecting the fetched transactions, the administrator can **mine** the transactions into a new block, which will be added to the blockchain table in the database. The mining process serves as proof of stake, and the administrators are represented as validators. During the mining process, the blocks hash is calculated based on each transaction's data, the current timestamp, and the server's difficulty setting. A maximum of 15 transactions can be contained in a single block.

When the block has been mined, the user will then be able to display their new digital identification via their device.

The blockchain is validated after each login request. If the data has been altered in any way, the user will receive info that the card is invalid. 
