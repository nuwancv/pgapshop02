/*
 * To work with database access.
 * 2013-May-28
 * Nuwan Hett
 * 
 * http://127.0.0.1:8020/pgapshop02/index.html
 *
 * This uses WebSQL - currently this is depricated.
 * Usage style:
 *      Use after checking isDBinit, if true, you can work with db object.
 *      Use this.property name always, otherwise creates sysntax problems.
 *      
 *      functions in this api calls like db.transaction(tx_to_call_function, errorCallBack_if_thereIsError_funcion, successCallBack_function);
*       each of these functions are passwed with the (transaction object), success and fail objects.
 */

var dbAccess = {
    
    db : new Object(),
    isDBinit : false,
    
    dbOpen: function(){
        dbx = window.openDatabase("testdb", "1.0", "demo", 200000);
        return dbx;
    },
    
   dbPopulate: function(db){
        // Populate the database
        //
        db.transaction(populateInitialData, errorCallBack, successCallBack);

        function populateInitialData(tx,err){
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
        }

        // Transaction error callback
        //
        function errorCallBack(tx, err) {
            alert("db Error processing SQL: " +  err);
        }

        // Transaction success callback
        //
        function successCallBack(tx,err) {
            alert("db success!" , db.toSource());
            isDBinit=true; // Set the init complete flag
        }
   },
       
       
    dbInit: function(db,tx) {
        // Create the table and populate.
        this.db = this.dbOpen();
        this.dbPopulate(this.db);
        this.isDBinit = true;        

        this.dbGetData(this.db);

    },


   dbGetData: function(db){
        // results.insertID : last row inserted to DB
        // results.rowsAffected: num of row changed by the SQL statement.
        if (!this.isDBinit){
            
            alert("Db not init");

        }else{
            db.transaction(getData);
        }

        function getData(tx){
            //tx.executeSql('SELECT * FROM GiftRegistry',[],renderFunc, errorCallBack);
            tx.executeSql('SELECT sum(gprice) AS pp FROM GiftRegistry WHERE age<45',[],renderFunc2, errorCallBack);
        }

        function renderFunc2(tx,results){
            console.log(results.rows.item(0).pp);
            
            /* or use this
            var len = results.rows.length;
            for (var i=0; i<len; ++i){
                var row = results.rows.item(i);
                console.log(row.pp);
            }*/
        }

        function renderFunc(tx, results){
            // results.insertID : last row inserted to DB
            // results.rowsAffected: num of row changed by the SQL statement.
            //db.transaction(populateDB, errorCallBack, successCallBack);

            var len = results.rows.length;
            for (var i=0; i<len; ++i){
                var row = results.rows.item(i);
                console.log(row.giftname, row.added_on);
            }
        }

        function errorCallBack(){
            alert('Render Error');
        }        
   }
}

