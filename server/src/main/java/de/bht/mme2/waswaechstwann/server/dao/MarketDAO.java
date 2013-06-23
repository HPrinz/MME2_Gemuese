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

import de.bht.mme2.waswaechstwann.server.pojos.Market;

/**
 * @author togomade 14.04.2013
 */
public class MarketDAO {

   private static final String MARKET_COLLECTION = "markets"; //$NON-NLS-1$
   private static final String MARKET_DB = "gemueseDB"; //$NON-NLS-1$

   private DBCollection table;

   public MarketDAO() {
      try {
         final MongoClient mongo = new MongoClient("localhost", 27017); //$NON-NLS-1$
         // creates a MongoDB if there is none
         final DB db = mongo.getDB(MARKET_DB);

         table = db.getCollection(MARKET_COLLECTION);

      } catch (final UnknownHostException e) {
         e.printStackTrace();
      }
   }

   /**
    * @param market
    */
   public void addMarket(final Market market) {
      final String marketJSON = new Gson().toJson(market);
      final DBObject dbObject = (DBObject) JSON.parse(marketJSON);
      table.insert(dbObject);
   }

   /**
    * @param market
    * @return
    */
   public JSONArray findMarket(final String market) {
      final BasicDBObject whereQuery = new BasicDBObject();
      whereQuery.put("type", market); //$NON-NLS-1$
      final DBCursor cursor = table.find(whereQuery);

      final JSONArray array = new JSONArray();
      while (cursor.hasNext()) {
         array.put(cursor.next());
      }

      return array;
   }

   /**
    * @return
    */
   public JSONArray getAllMarkets() {
      final DBCursor cursor = table.find();

      final JSONArray array = new JSONArray();
      while (cursor.hasNext()) {
         array.put(cursor.next());
      }

      return array;
   }

   /**
    * clean the market-table
    */
   public void clean() {
      table.drop();
   }
}
