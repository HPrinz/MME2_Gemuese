/*******************************************************************************
 * Sportplaces.org
 * by 42com
 *******************************************************************************/
package de.bht.mme2.waswaechstwann.server.dao;

import java.net.UnknownHostException;

import org.codehaus.jettison.json.JSONArray;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.util.JSON;

import de.bht.mme2.waswaechstwann.server.pojos.Fruit;

/**
 * @author Hanna 04.04.2013
 */
public class VegetableDAO {

   private DBCollection table;

   public VegetableDAO() {
      try {
         final MongoClient mongo = new MongoClient("localhost", 27017);
         // creates a MongoDB if there is none
         final DB db = mongo.getDB("gemueseDB");

         table = db.getCollection("vegetables");

      } catch (final UnknownHostException e) {
         e.printStackTrace();
      }
   }

   /**
    * @param fruit
    *           adds the fruit to the MongoDB
    */
   public void addVegetable(final Fruit fruit) {
      final String fruitJSON = new Gson().toJson(fruit);
      final DBObject dbObject = (DBObject) JSON.parse(fruitJSON);
      table.insert(dbObject);
   }

   /**
    * Finds all fruits containing the String
    * 
    * @param fruit
    *           the String that the fruit should contain
    * @return a JSONArray containing all fruits found
    */
   public JSONArray findFruit(final String fruit) {
      final BasicDBObject whereQuery = new BasicDBObject();
      whereQuery.put("name", fruit);
      final DBCursor cursor = table.find(whereQuery);

      final JSONArray array = new JSONArray();
      while (cursor.hasNext()) {
         array.put(cursor.next());
      }

      return array;

   }

   /**
    * @return all fruits in the table
    */
   public JSONArray getAllFruits() {
      final DBCursor cursor = table.find();

      final JSONArray array = new JSONArray();
      while (cursor.hasNext()) {
         array.put(cursor.next());
      }

      return array;
   }

   /**
    * cleans the fruit-table
    */
   public void clean() {
      table.drop();
   }
}
