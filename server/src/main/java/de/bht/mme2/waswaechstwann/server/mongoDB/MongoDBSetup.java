package de.bht.mme2.waswaechstwann.server.mongoDB;

import java.net.UnknownHostException;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;

@Deprecated
public class MongoDBSetup {

   public static void setupConnection() {

      try {

         final MongoClient mongo = new MongoClient("localhost", 27017);

         // creates a MongoDB if there is none
         final DB db = mongo.getDB("gemueseDB");

         // creates a table if there is none
         final DBCollection table = db.getCollection("vegetables");

         final BasicDBObject document = new BasicDBObject();
         document.put("name", "avocado");
         document.put("origin", "somewhere");
         table.insert(document);

      } catch (final UnknownHostException e) {
         e.printStackTrace();
      }
   }

}
