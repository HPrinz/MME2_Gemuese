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

import de.bht.mme2.waswaechstwann.server.pojos.Recipe;

/**
 * The RecipeDAO organizes all access to the MongoDB-Table for the Recipes
 * 
 * @author Hanna
 * 
 */
public class RecipeDAO {

	private static final String RECIPES_COLLECTION = "recipes";
	private static final String GEMUESE_DB = "gemueseDB";

	private DBCollection table;

	/**
	 * Constructor who initializes the Database and creates the collections in
	 * case they don't exist yet.
	 */
	public RecipeDAO() {
		try {
			final MongoClient mongo = new MongoClient("localhost", 27017);
			// creates a MongoDB if there is none
			final DB db = mongo.getDB(GEMUESE_DB);

			table = db.getCollection(RECIPES_COLLECTION);

		} catch (final UnknownHostException e) {
			e.printStackTrace();
		}
	}

	/**
	 * @param recipe
	 *            the recipe that should be added to the database
	 */
	public void addRecipe(Recipe recipe) {
		final String recipeJSON = new Gson().toJson(recipe);
		final DBObject dbObject = (DBObject) JSON.parse(recipeJSON);
		table.insert(dbObject);
	}

	/**
	 * 
	 * @param fruit
	 *            the fruit that should be a ingredient of the recipe
	 * @return all recipes that have the fruit as an ingredient
	 */
	public JSONArray findRecipeHasFruit(String fruit) {
		final BasicDBObject contains = new BasicDBObject("$regex", ".*" + fruit + ".*");
		final BasicDBObject whereQuery = new BasicDBObject("vegetables", contains);
		final DBCursor cursor = table.find(whereQuery);
		
		System.out.println("WQ = " + whereQuery);

		final JSONArray array = new JSONArray();
		while (cursor.hasNext()) {
			array.put(cursor.next());
		}
		return array;
	}

	/**
	 * @return all recipes in the table
	 */
	public JSONArray getAllRecipes() {
		final DBCursor cursor = table.find();

		final JSONArray array = new JSONArray();
		while (cursor.hasNext()) {
			array.put(cursor.next());
		}

		return array;
	}

	/**
	 * cleans the recipe-table
	 */
	public void clean() {
		table.drop();
	}

}
