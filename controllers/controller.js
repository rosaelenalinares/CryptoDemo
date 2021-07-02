const sqlite3 = require('sqlite3').verbose();

// BACKEND FILE FOR MY DATABASES QUERIES

// ADD FAVORITES TO DB
const addFavoritesToDB = (data) => {
    let db = new sqlite3.Database('db/db.myapp');
  
    db.run(`INSERT INTO favorites (rank, icon, name, symbol, price, MarketCap) VALUES (?,?,?,?,?,?)`, [[data.rank], [data.icon], [data.name], [data.symbol], [data.price], [data.marketCap]],
  
    function (err) {
  
        if (err) {
          return console.log(err);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
    console.log(data)
  
    db.close();
  };


  //GET FAVORITES FROM DB
const getFavoritesFromdb = (req, res) => {

    let sendData = {data: []};
  
    let db = new sqlite3.Database('db/db.myapp', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the favorites database.');
    });
     db.serialize(() => {
      db.each(`SELECT * FROM favorites`, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        console.log(row)
        sendData.data.push(row)
      });
    });
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log(sendData)
      res.send(sendData)
      console.log('Close the database connection.');
    });
  };


//DELETE FAVORITES
  const deleteFavorites = (data) => {
    let db = new sqlite3.Database('db/db.myapp', (err) => {
      if (err) {
        console.error(err.message);
      }
    });
  
    let id = data.favorites_id;
    // delete a row based on id
    db.run(`DELETE FROM favorites WHERE favorites_id=?`, id, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row(s) deleted ${this.changes}`);
    });
  
    // close the database connection
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
    });
  };
  
//ADD COMMENT TO DB
const addCommentToDB = (comments) =>{
      let db = new sqlite3.Database('db/db.myapp');
  
      db.run(`INSERT INTO comments (content) VALUES(?)`, [comments.input], function(err) {
        if (err) {
          return console.log(err.message);
        }
        
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
  
      // close the database connection
      db.close();
  };


  //GET COMMENTS FROM DB
  const getCommentsFromDB = (res) => {
    let sendData = {data: []};

  let db = new sqlite3.Database('db/db.myapp', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the comments database.');
  });
   db.serialize(() => {
    db.each(`SELECT * FROM comments`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row)
      sendData.data.push(row)
    });
  });
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log(sendData)
    res.send(sendData)
    console.log('Close the database connection.');
  });
};


//DELETE COMMENTS
const deleteComments = (data) => {
  let db = new sqlite3.Database('db/db.myapp', (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  let id = data.comments_id;
  // delete a row based on id
  db.run(`DELETE FROM comments WHERE comments_id = ?`, id, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) deleted ${this.changes}`);
  });

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
};


//ADD REPLY TO DB
// const addReplyToDB = (reply) =>{
//   let db = new sqlite3.Database('db/db.myapp');

//   db.run(`INSERT INTO replies (comments_id, content) VALUES(?, ?)`, [reply.input], function(err) {
//     if (err) {
//       return console.log(err.message);
//     }
    
//     console.log(`A row has been inserted with rowid ${this.lastID}`);
//   });

//   // close the database connection
//   db.close();
// };






  exports.addFavoritesToDB = addFavoritesToDB;
  exports.getFavoritesFromdb = getFavoritesFromdb;
  exports.deleteFavorites = deleteFavorites;
  exports.addCommentToDB = addCommentToDB;
  exports.getCommentsFromDB = getCommentsFromDB;
  exports.deleteComments = deleteComments;
  // exports.addReplyToDB = addReplyToDB;
