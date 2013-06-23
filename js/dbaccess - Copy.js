/*
 * To work with database access.
 * 2013-May-28
 * Nuwan Hett
 * 
 */

var dbaccess = {
	
    dbaccess.db="";
    dbaccess.isDBinit=false;//=false;

    dbopen: function(){
        db = window.openDatabase("testdb", "1.0", "demo", 200000);
    },
	
	dbinit: function() {
		db = window.openDatabase("testdb", "1.0", "demo", 200000);
		db.transaction(populateDB, errorCallBack, successCallBack);


        // Populate the database 
        //
        function populateDB(tx) {
        	/*
             tx.executeSql('DROP TABLE IF EXISTS DEMO');
             tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
             tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
             tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
             */
             tx.executeSql('DROP TABLE IF EXISTS GiftRegistry');
             tx.executeSql('CREATE TABLE IF NOT EXISTS GiftRegistry (id INTEGER PRIMARY KEY ASC, giftname TEXT, gto TEXT, gprice INTEGER, age INTEGER, added_on DATETIME)');
             //tx.executeSql('INSERT INTO GiftRegistry (id, giftname) VALUES(?,?,?,?,?)', [1, "Amma", "10","50",new Date()]);
             tx.executeSql('INSERT INTO GiftRegistry (giftname, gto, gprice, age, added_on) VALUES(?,?,?,?,?)', ["Mommy Gift","Amma",100,54, new Date()]);
             tx.executeSql('INSERT INTO GiftRegistry (giftname, gto, gprice, age, added_on) VALUES(?,?,?,?,?)', ["Daddy Gift","Daddy",100,58, new Date()]);
             tx.executeSql('INSERT INTO GiftRegistry (giftname, gto, gprice, age, added_on) VALUES(?,?,?,?,?)', ["Sajith Gift","Sajith",100,32, new Date()]);
             tx.executeSql('INSERT INTO GiftRegistry (giftname, gto, gprice, age, added_on) VALUES(?,?,?,?,?)', ["Nadee Gift","Nadee",100,30, new Date()]);
             tx.executeSql('INSERT INTO GiftRegistry (giftname, gto, gprice, age, added_on) VALUES(?,?,?,?,?)', ["Nuwan Gift","Nuwan",100,32, new Date()]);
             tx.executeSql('INSERT INTO GiftRegistry (giftname, gto, gprice, age, added_on) VALUES(?,?,?,?,?)', ["Dehiwala Mom Gift","Dehiwala Amma",100,54, new Date()]);
             tx.executeSql('INSERT INTO GiftRegistry (giftname, gto, gprice, age, added_on) VALUES(?,?,?,?,?)', ["Dehiwala Dad Gift","Dehiwala Dad",100,58, new Date()]);

             /*
             tx.executeSql('CREATE TABLE IF NOT EXISTS GiftRegistry (id unique, giftname TEXT, gprice INTEGER, age INTEGER, added_on DATETIME)');
             tx.executeSql('INSERT INTO GiftRegistry (id, giftname, gprice, age, added_on) VALUES (1, "Amma",10, 50, ' + new Date() + ')');
        	 tx.executeSql('INSERT INTO GiftRegistry (id, giftname, gprice, age, added_on) VALUES (2, "Thatha",10, 10, ' + new Date() + ')');
    		 tx.executeSql('INSERT INTO GiftRegistry (id, giftname, gprice, age, added_on) VALUES (3, "Ayya",10, 20, ' + new Date() + ')');    	 
        */
        }

        // Transaction error callback
        //
        function errorCallBack(tx, err) {
            alert("db Error processing SQL: " +  err);
        }

        // Transaction success callback
        //
        function successCallBack() {
            alert("db success!");
            isDBinit=true; // Set the init complete flag
        }
   }
/*
   dbgetData: function(tx){
        // results.insertID : last row inserted to DB
        // results.rowsAffected: num of row changed by the SQL statement.
        if (!isDBinit){
            
            alert("Db not init");

        }else{

            db.executeSql('SELECT * FROM GiftRegistry',renderFunc, errorCallBack, successCallBack);

        }


        function renderFunc(tx, results){
            // results.insertID : last row inserted to DB
            // results.rowsAffected: num of row changed by the SQL statement.
            db.transaction(populateDB, errorCallBack, successCallBack);

            var len = results.rows.length;
            for (var i=0; i<len; ++i){
                var row = results.rows.item(i);
                console.log(row.giftname, row.added_on.toJSON());
            }
        }
   }
*/
 }